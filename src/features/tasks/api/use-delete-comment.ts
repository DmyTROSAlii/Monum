import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":workspaceId"]["tasks"][":taskId"]["comments"][":commentId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)[":workspaceId"]["tasks"][":taskId"]["comments"][":commentId"]["$delete"]
>;

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.tasks[":workspaceId"]["tasks"][":taskId"]["comments"][":commentId"]["$delete"]({ param });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Comment deleted");

      queryClient.invalidateQueries({ queryKey: ["tasks", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete comment");
    },
  });

  return mutation;
};
