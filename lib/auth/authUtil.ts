import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
const getUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  } else {
    return session.user;
  }
};

export { getUser };
