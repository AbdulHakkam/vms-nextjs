"use client";

import { signOut } from "next-auth/react";
import { SignOut } from "@phosphor-icons/react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="flex flex-row items-center w-full justify-between"
    >
      <p>Sign out</p>
      <SignOut />
    </button>
  );
};

export default SignOutButton;
