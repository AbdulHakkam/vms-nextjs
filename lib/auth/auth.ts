import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../database/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";
import dbConnect from "../database/mongooseConnect";

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(
    dbConnect().then((mon) => mon.connection.getClient()),
    {}
  ) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID
        : "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
        ? process.env.GOOGLE_CLIENT_SECRET
        : "",
    }),
  ],
  pages: {
    signIn: "/dashbord",
    signOut: "/",
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};

export { authOptions };
