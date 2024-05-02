import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import db from "@/utils/db";

const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: any) => {
      db.insert("tasks", {
        id: uuidv4(),
        name: values.name,
        projectId: values.projectId,
        memberId: values.member,
        description: values.description,
        status: "to-do",
        deadline: values.deadline,
      });
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

export default useCreateTask;
