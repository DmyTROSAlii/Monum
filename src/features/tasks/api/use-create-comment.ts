import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.tasks)["tasks"][":taskId"]["comments"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)["tasks"][":taskId"]["comments"]["$post"]
>;

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.tasks["tasks"][":taskId"]["comments"]["$post"]({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to sent comment");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Comment sent");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Failed to sent comment");
    },
  });

  return mutation;
};
