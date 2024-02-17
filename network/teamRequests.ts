import { baseUrl } from "@/lib/constants/network";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export type Team = {
  _id: string;
  name: string;
  members?: string[];
  owner?: string[];
  admins?: string[];
};

const getTeams = async (headers: ReadonlyHeaders) => {
  const data = await fetch(`${baseUrl}/api/team`, { headers: headers });
  const teams = await data.json();
  return teams as Team[];
};

const createTeam = async (name: string) => {
  if (name.length === 0) return;

  const data = await fetch(`${baseUrl}/api/team`, {
    method: "POST",
    body: JSON.stringify({ team_name: name }),
  });
  const teams = await data.json();
  console.log(teams);
};

export { getTeams, createTeam };
