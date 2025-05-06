import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { TaskPriority, TaskStatus } from "@/features/tasks/types"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        [TaskStatus.TODO]:
          "border-transparent bg-red-400 dark:bg-red-400 text-primary hover:bg-red-400/80",
        [TaskStatus.IN_PROGRESS]:
          "border-transparent bg-yellow-400 text-primary hover:bg-yellow-400/80",
        [TaskStatus.IN_REVIEW]:
          "border-transparent bg-blue-400 text-primary hover:bg-blue-400/80",
        [TaskStatus.DONE]:
          "border-transparent bg-emerald-400 text-primary hover:bg-emerald-400/80",
        [TaskStatus.BACKLOG]:
          "border-transparent bg-pink-400 text-primary hover:bg-pink-400/80",
        [TaskPriority.LOWEST]:
          "border-transparent bg-gray-300 dark:bg-gray-500 text-gray-800 hover:bg-gray-400/80",
        [TaskPriority.LOW]:
          "border-transparent bg-teal-300 dark:bg-teal-500 text-teal-900 hover:bg-teal-400/80",
        [TaskPriority.MEDIUM]:
          "border-transparent bg-indigo-300 dark:bg-indigo-500 text-indigo-900 hover:bg-indigo-400/80",
        [TaskPriority.HIGH]:
          "border-transparent bg-orange-300 dark:bg-orange-500 text-orange-900 hover:bg-orange-400/80",
        [TaskPriority.HIGHEST]:
          "border-transparent bg-purple-300 dark:bg-purple-500 text-purple-900 hover:bg-purple-400/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
