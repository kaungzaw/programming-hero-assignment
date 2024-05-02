import { useMutation, useQueryClient } from "@tanstack/react-query";
import db from "@/utils/db";

const useEditTask = (id: string, projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: any) => {
      db.update("tasks", { id: id }, (row) => {
        row.name = values.name;
        row.memberId = values.member;
        row.description = values.description;
        row.status = values.status;
        row.deadline = values.deadline;
        return row;
      });
      db.commit();
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["tasks", id],
        }),
        queryClient.refetchQueries({
          queryKey: ["tasks", { projectId: projectId }],
        }),
      ]);
    },
  });
};

export default useEditTask;
