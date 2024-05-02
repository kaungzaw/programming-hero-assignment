import { useQuery } from "@tanstack/react-query";
import db from "@/utils/db";

const useTask = (id: string) => {
  return useQuery({
    queryKey: ["tasks", id] as const,
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
      const tasks = db
        .queryAll("tasks", {
          query: { id: id },
        })
        .map(
          (item) =>
            ({
              id: item.id,
              name: item.name,
              projectId: item.projectId,
              memberId: item.memberId,
              description: item.description,
              status: item.status,
              deadline: item.deadline,
            } as Task)
        );
      if (tasks.length === 0) {
        throw new Error("Task not found");
      }
      return tasks[0];
    },
  });
};

export default useTask;
