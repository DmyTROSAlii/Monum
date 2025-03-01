import Link from "next/link";
import Image from "next/image";
import { Projects } from "./projects";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={164} height={48} className="pl-3" />
      </Link>
      <div className="px-7 h-0.5 my-4 bg-gray-200">
        <Separator />
      </div>
      <WorkspaceSwitcher />
      <div className="px-7 h-0.5 my-4 bg-gray-200">
        <Separator />
      </div>
      <Navigation />
      <div className="px-7 h-0.5 my-4 bg-gray-200">
        <Separator />
      </div>
      <Projects />
    </aside>
  );
};