import { getUser } from "@/lib/auth/authUtil";
import SignInButton from "../button/sign-in-button";
import SignOutButton from "../button/sign-out-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-shadcn/drop-down";

const Navbar = async () => {
  const user = await getUser();
  return (
    <div className=" bg-white w-[98%] mx-[1%] flex mt-[20px] rounded-md p-2">
      <p className="ml-2 font-bold">OpenVMS</p>
      <DropdownMenu>
        <div className="ml-auto mr-[20px]">
          {user ? (
            <DropdownMenuTrigger className=" focus:outline-0">
              Account
            </DropdownMenuTrigger>
          ) : (
            <SignInButton />
          )}
        </div>
        <DropdownMenuContent className="mt-2 mr-1">
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
