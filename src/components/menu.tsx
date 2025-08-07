import React from "react";
import { CurrentUserAvatar } from "./current-user-avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User } from "lucide-react";
import { LogoutButton } from "./logout-button";

const Menu = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hover:cursor-pointer">
          <p className="">
            <CurrentUserAvatar />
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit m-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/mypage">
              <DropdownMenuItem className="flex gap-3 p-2 ">
                <User />
                My Page
              </DropdownMenuItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuItem className="flex gap-3 p-2">
                <Settings />
                Settings
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Menu;
