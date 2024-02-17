"use client";

import { useRouter } from "next/navigation";
import { route } from "../nav/nav-bar-side";

const SideNavButton = (props: route) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(props.path);
      }}
      className={`w-[90%] mx-[5%] rounded-md mb-2 p-2 hover:bg-slate-600 text-sm text-left flex flex-row items-center hover:text-white ${
        props.active ? "bg-slate-600 text-white" : "bg-white text-black"
      }`}
    >
      {props.icon}
      <p className="ml-2">{props.name}</p>
    </button>
  );
};
export default SideNavButton;
