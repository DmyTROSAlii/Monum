import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";
import { useQueryClient, useMutation } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.auth.profile)[":profileId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.auth.profile)[":profileId"]["$patch"]
>;

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }): Promise<ResponseType> => {
      const response = await client.api.auth.profile[":profileId"]["$patch"]({
        form,
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const json = await response.json();
      return json as ResponseType;
    },
    onSuccess: () => {
      toast.success("Profile updated");

      queryClient.invalidateQueries({ queryKey: ["profileId"] });
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  return mutation;
};
