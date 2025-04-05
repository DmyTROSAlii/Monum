import { Separator } from "@radix-ui/react-dropdown-menu";

import { Send } from "lucide-react"

import { MemberAvatar } from "@/features/members/components/member-avatar";

import { Button } from "@/components/ui/button";

import { Comment } from "../types";
import { createTaskComment } from "../schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateComment } from "../api/use-create-comment";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TaskCommentsProps {
  comments: Comment[];
  taskId: string;
};

export const TaskComments = ({
  comments,
  taskId
}: TaskCommentsProps) => {
  const { mutate, isPending } = useCreateComment();

  const form = useForm<z.infer<typeof createTaskComment>>({
    defaultValues: {
      comment: "",
    }
  });

  const onSubmit = (values: z.infer<typeof createTaskComment>) => {
    mutate({
      json: { ...values },
      param: { taskId }
    }, {
      onSuccess: () => {
        form.reset();
      }
    });
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
          <ul className="flex flex-col gap-y-4 gap-x-2 w-full">
            {(!comments.length ? <span className="m-auto text-muted-foreground">No comments yet</span>
              : comments.map((comment) => (
                <li key={comment.$id} className="flex items-start gap-x-3">
                  <MemberAvatar
                    name={comment.userName}
                    className="size-8 flex-shrink-0"
                  />
                  <div className="flex flex-col gap-y-1 bg-white dark:bg-[#ffffff1a] p-4 rounded-lg shadow-sm w-full">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {comment.userName}
                      </p>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(comment.$updatedAt || comment.$createdAt))}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      {comment.text}
                    </p>
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
                  name="comment"
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
                  disabled={isPending}
                  className="flex-shrink-0"
                >
                  <Send className="dark:text-neutral-200" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};