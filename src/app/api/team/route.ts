import { authOptions } from "@/lib/auth/auth";
import { getUser } from "@/lib/auth/authUtil";
import { unauthorized } from "@/lib/auth/error";
import Team from "@/lib/database/models/Team";
import User, { Role } from "@/lib/database/models/User";
import dbConnect from "@/lib/database/mongooseConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

// Get the teams of the user
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorized();
  await dbConnect();
  const teams = await Team.aggregate([
    { $match: { members: new ObjectId(session.user.id) } },
    {
      $project: {
        _id: 1,
        name: 1,
        members: 1,
      },
    },
  ]);
  return new Response(JSON.stringify(teams), {
    headers: { "content-type": "application/json" },
  });
}

// Create a new team. Whoever created it is assigned owner
export async function POST(request: Request) {
  await dbConnect();
  const user = await getUser();
  if (!user) return unauthorized();
  const { team_name } = await request.json();
  console.log(team_name);
  const team = await Team.create({
    name: team_name,
    members: [user.id],
    owner: user.id,
  });

  await User.findByIdAndUpdate(user.id, {
    $addToSet: {
      teams: team.id,
    },
  }).exec();

  return new Response("SUCCESS", {
    headers: { "content-type": "text/plain" },
    status: 201,
  });
}

//Patch team
// ADD - Add a member to the team
// REMOVE - Remove a member from the team
// UPDATE - Update the role of a member. Pass is_admin as true to make the user an admin
export async function PATCH(request: Request) {
  await dbConnect();
  const user = await getUser();
  if (!user) return unauthorized();
  const { team_id, action, user_id, is_admin } = await request.json();

  const team = await Team.findById(team_id).exec();
  if (!team) return new Response("Team not found", { status: 404 });

  if (team.owner.toString() !== user.id.toString())
    return new Response("You are not the owner of this team", {
      status: 403,
    });

  if (action === "ADD") {
    await Team.findByIdAndUpdate(team_id, {
      $addToSet: {
        members: user_id,
      },
    }).exec();

    await User.findByIdAndUpdate(user_id, {
      $addToSet: {
        teams: team_id,
      },
    }).exec();
  } else if (action === "REMOVE") {
    await Team.findByIdAndUpdate(team_id, {
      $pull: {
        members: user_id,
        admins: user_id,
      },
    }).exec();

    await User.findByIdAndUpdate(user_id, {
      $pull: {
        teams: team_id,
      },
    }).exec();
  } else if (action === "UPDATE") {
    if (is_admin) {
      await Team.findByIdAndUpdate(team_id, {
        $addToSet: {
          admins: user_id,
        },
      }).exec();
    } else {
      await Team.findByIdAndUpdate(team_id, {
        $pull: {
          admins: user_id,
        },
      }).exec();
    }
  }

  return new Response("SUCCESS", {
    headers: { "content-type": "text/plain" },
    status: 200,
  });
}
