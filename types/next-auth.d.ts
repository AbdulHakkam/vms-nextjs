import mongoose from "mongoose";
import NextAuth from "next-auth";

declare module "next-auth" {
  export interface Session {
    user: {
      address: string;
      id: string;
      email: string;
      image: string;
      name: string;
      teams: mongoose.Schema.Types.ObjectId[];
    };
  }
  interface User extends DefaultUser {
    _id: string;
  }
}
