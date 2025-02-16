"use client";

import Link from "next/link";
import { useRouter } from "next/navigation.js";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useJoinWorkspace } from "../api/use-join-workspace.ts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
};

export const JoinWorkspaceForm = ({
  initialValues,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate({
      param: { workspaceId },
      json: { code: inviteCode }
    }, {
      onSuccess: ({ data }) => {
        router.push(`/workspaces/${data.$id}`);
      }
    });
  };

  return (
    <div>
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="p-7">
          <CardTitle className="text-xl font-bold">
            Join workspace
          </CardTitle>
          <CardDescription>
            You have neeb invited to join <strong>{initialValues.name}</strong> workspace.
          </CardDescription>
        </CardHeader>
        <div className="px-7">
          <div className="my-8 h-0.5 bg-gray-200">
            <Separator />
          </div>
          <CardContent className="p-7">
            <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
              <Button
                variant="secondary"
                type="button"
                asChild
                size="lg"
                className="w-full lg:w-fit"
                disabled={isPending}
              >
                <Link href="/">
                  Cancel
                </Link>
              </Button>
              <Button
                type="button"
                size="lg"
                className="w-full lg:w-fit"
                onClick={onSubmit}
                disabled={isPending}
              >
                Join Workspace
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};