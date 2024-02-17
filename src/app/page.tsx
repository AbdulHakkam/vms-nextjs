import BaseButton from "@/components/button/base-button";
import { headers } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";
import { getTeams, Team } from "@/network/teamRequests";
import ClickableRow from "@/components/button/clickable-row";
import { CreateTeamDialog } from "@/components/dialog/create-team-dialog";
import { getUser } from "@/lib/auth/authUtil";
export default async function Home() {
  const user = await getUser();
  let teams: Team[] = [];
  if (user) {
    teams = await getTeams(headers());
  }
  return (
    <main>
      <div className="flex mt-4 flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          {!user ? (
            <div className="mx-auto my-auto text-2xl font-[600]">
              Not logged in
            </div>
          ) : (
            <>
              <CreateTeamDialog />
              <Table className="bg-white rounded-md w-[100%] mt-4">
                <TableCaption>
                  {teams.length > 0
                    ? "A list of teams you are in "
                    : "Not in any teams, Please create team to start analyzing"}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[90%]">Team name</TableHead>
                    <TableHead>Reports</TableHead>
                    <TableHead>Members</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team, index) => (
                    <ClickableRow
                      key={index}
                      link={`/dashboard/?team=${team._id}`}
                    >
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>{team.members?.length}</TableCell>
                    </ClickableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </Suspense>
      </div>
    </main>
  );
}
