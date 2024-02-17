import { getUser } from "@/lib/auth/authUtil";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  return <div className="min-h-screen"></div>;
};

export default page;
