"use client";
import { usePathname } from "next/navigation";
import SideNavButton from "../button/side-nav-button";
import { House, File, Gear } from "@phosphor-icons/react/dist/ssr";
export type route = {
  name: string;
  path: string;
  icon?: React.ReactNode;
  active?: boolean;
};

const NavbarSide = () => {
  const routes: route[] = [
    {
      name: "Home",
      path: "/dashboard",
      icon: <House />,
    },
    {
      name: "Reports",
      path: "/path",
      icon: <File />,
    },
    {
      name: "Settings",
      path: "/path",
      icon: <Gear />,
    },
  ];
  const pathname = usePathname();
  return (
    <div className=" h-[80vh] w-[200px] rounded-md bg-white flex flex-col p-2 pt-4 mt-4">
      {routes.map((route, index) => (
        <SideNavButton
          key={index}
          path={route.path}
          name={route.name}
          icon={route.icon}
          active={pathname === route.path}
        />
      ))}
    </div>
  );
};
export default NavbarSide;
