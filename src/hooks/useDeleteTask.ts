import { useMutation, useQueryClient } from "@tanstack/react-query";
import db from "@/utils/db";

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: any) => {
      db.deleteRows("tasks", { id: values.id });
      db.commit();
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    },
    onSuccess: async (_data, variables) => {
      await queryClient.refetchQueries({
        queryKey: ["tasks", { projectId: variables.projectId }],
      });
    },
  });
};

export default useDeleteTask;
