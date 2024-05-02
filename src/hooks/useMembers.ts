import { useQuery } from "@tanstack/react-query";
import db from "@/utils/db";

const useMembers = (projectId: string) => {
  return useQuery({
    queryKey: ["members", { projectId }] as const,
    queryFn: async ({ queryKey }) => {
      const [_key, { projectId }] = queryKey;
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
      const members = db
        .queryAll("members", {
          query: { projectId: projectId },
          sort: [["name", "ASC"]],
        })
        .map(
          (item) =>
            ({
              id: item.id,
              name: item.name,
              projectId: item.projectId,
            } as Member)
        );
      return members;
    },
  });
};

export default useMembers;
