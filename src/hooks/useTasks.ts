import { useQuery } from "@tanstack/react-query";
import db from "@/utils/db";

const useTasks = (projectId: string, status?: string, memberId?: string) => {
  return useQuery({
    queryKey: ["tasks", { projectId, status, memberId }] as const,
    queryFn: async ({ queryKey }) => {
      const [_key, { projectId, status, memberId }] = queryKey;
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
      const tasks = db
        .queryAll("tasks", {
          query: {
            projectId: projectId,
            ...(status && { status: status }),
            ...(memberId && { memberId: memberId }),
          },
          sort: [["ID", "DESC"]],
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
      return tasks;
    },
  });
};

export default useTasks;
