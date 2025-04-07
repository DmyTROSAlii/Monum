import { z } from "zod";
import { cn } from "@/lib/utils";
import { MoreVertical, Send, Trash } from "lucide-react";

import { useForm } from "react-hook-form";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { Comment } from "../types";
import { createTaskComment } from "../schemas";

import { useCreateComment } from "../api/use-create-comment";

import { MemberAvatar } from "@/features/members/components/member-avatar";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useDeleteComment } from "../api/use-delete-comment";

interface TaskCommentsProps {
  comments: Comment[];
  taskId: string;
  userId: string;
  workspaceId: string;
};

export const TaskComments = ({
  comments,
  taskId,
  userId,
  workspaceId,
}: TaskCommentsProps) => {
  const { mutate: createComment, isPending: isCreating } = useCreateComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

  const form = useForm<z.infer<typeof createTaskComment>>({
    defaultValues: {
      text: "",
    }
  });

  const onSubmit = (values: z.infer<typeof createTaskComment>) => {
    createComment({
      json: { ...values },
      param: { workspaceId, taskId }
    }, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  const handleDelete = (commentId: string) => {
    deleteComment(
      { param: { workspaceId, taskId, commentId } }
    );
  };

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Comments</p>
        </div>
        <div className="my-4 h-0.5 bg-gray-200">
          <Separator />
        </div>
        <div className="bg-muted p-4 border-4 border-muted rounded-lg">
          <ul className="flex flex-col gap-y-5 w-full">
            {(!comments.length ? <span className="m-auto text-muted-foreground">No comments yet</span>
              : comments.map((comment) => (
                <li key={comment.$id} className={cn("flex items-end gap-x-2.5", comment.userId === userId ? "flex-row-reverse" : "")}>
                  <MemberAvatar
                    name={comment.userName}
                    className="size-8 flex-shrink-0"
                  />
                  <div className="group flex flex-col gap-y-1 bg-white dark:bg-[#ffffff1a] p-4 rounded-lg shadow-sm w-full">
                    <div className="flex items-center justify-between">
                      <p className={cn("text-sm font-semibold text-neutral-900 dark:text-zinc-100", comment.userId === userId ? "text-blue-700 dark:text-blue-400" : "")}>
                        {comment.userName}
                      </p>
                      <span className="text-xs text-neutral-500 dark:text-zinc-400">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(comment.$updatedAt || comment.$createdAt))}
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-sm text-neutral-700 dark:text-zinc-300 break-words break-all">
                        {comment.text}
                      </p>
                      {(userId === comment.userId ?
                        <Button
                          variant="ghost"
                          className="size-8 p-0 invisible group-hover:visible text-zinc-400 hover:text-red-600"
                          onClick={() => handleDelete(comment.$id)}
                          disabled={isDeleting}
                        >
                          <Trash className="size-4" />
                        </Button>
                        : "")}
                    </div>
                  </div>
                </li>
              )))}
          </ul>
          <div className="my-4 h-0.5 bg-gray-200">
            <Separator />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex justify-between gap-x-2">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter comment"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isCreating}
                  className="flex-shrink-0"
                >
                  <Send className="dark:text-zinc-200" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};