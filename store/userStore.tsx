import { Role } from "@/lib/database/models/User";
import { create } from "zustand";
export interface userState {
  uuid: string;
  role: Role;
  intialise: (id: string, role: Role) => void;
}

export const useUserStore = create<userState>()((set) => ({
  uuid: "",
  role: Role.USER,
  intialise: (id, role) => set({ uuid: id, role: role }),
}));
