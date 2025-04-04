import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.auth.profile)[":profileId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.auth.profile)[":profileId"]["$delete"]
>;

export const useDeleteProfile = () => {
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.auth.profile[":profileId"]["$delete"]({
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to clear profile`s data");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Profile`s data cleared");
    },
    onError: () => {
      toast.error("Failed to clear profile`s data");
    },
  });

  return mutation;
};
