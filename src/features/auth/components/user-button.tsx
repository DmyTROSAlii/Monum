"use client";

import Link from "next/link";

import { Loader, LogOut, SettingsIcon } from "lucide-react";

import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import ThemeSwitcher from "@/components/theme-switcher";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const UserButton = () => {
    const { mutate: logout } = useLogout();
    const { data: user, isLoading } = useCurrent();

    if (isLoading) {
        return (
            <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
                <Loader className="size-4 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const { name, email } = user;

    const avatarFallback = name
        ? name.charAt(0).toUpperCase()
        : email.charAt(0).toUpperCase() ?? "U";

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
                    <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 dark:text-zinc-900 flex items-center justify-center">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-60 dark:bg-zinc-900" sideOffset={10}>
                <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                    <Avatar className="size-[52px] border border-neutral-300">
                        <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 dark:text-zinc-900 flex items-center justify-center">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                            {name || "User"}
                        </p>
                        <p className="text-xs text-neutral-500">{email}</p>
                    </div>
                </div>
                <div className="px-7 h-0.5 bg-gray-200">
                    <Separator />
                </div>
                <DropdownMenuItem className="h-10 flex justify-center items-center cursor-pointer">
                    <Link key="Profile Settings" href={`/profile/${user.$id}`}>
                        <div className="flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500">
                            <SettingsIcon className="size-5 text-neutral-500" />
                            Settings
                        </div>
                    </Link>
                </DropdownMenuItem>
                <div className="px-7 h-0.5 bg-gray-200">
                    <Separator />
                </div>
                <DropdownMenuItem className="h-10 flex justify-center items-center cursor-pointer">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500">
                        <ThemeSwitcher />
                        Theme Mode
                    </div>
                </DropdownMenuItem>
                <div className="px-7 h-0.5 bg-gray-200">
                    <Separator />
                </div>
                <DropdownMenuItem
                    onClick={() => logout()}
                    className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
                >
                    <LogOut className="size-4 mr-2" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}