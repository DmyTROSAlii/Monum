import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MemberAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
};

export const MemberAvatar = ({
  name,
  className,
  fallbackClassName
}: MemberAvatarProps) => {
  return (
    <Avatar className={cn("size-5 transition border-neutral-300 dark:border-none rounded-md", className)}>
      <AvatarFallback className={cn(
        "bg-neutral-200 dark:bg-neutral-200 font-medium text-neutral-500 dark:text-neutral-900 dark:border-none flex items-center justify-center",
        fallbackClassName
      )}>
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};