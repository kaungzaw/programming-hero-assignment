import { useQuery } from "@tanstack/react-query";
import db from "@/utils/db";

const useProject = (id: string) => {
  return useQuery({
    queryKey: ["projects", id] as const,
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
      const projects = db.queryAll("projects", { query: { id: id } }).map(
        (item) =>
          ({
            id: item.id,
            name: item.name,
            description: item.description,
          } as Project)
      );
      if (projects.length === 0) {
        throw new Error("Project not found");
      }
      return projects[0];
    },
  });
};

export default useProject;
