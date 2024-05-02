import { useQuery } from "@tanstack/react-query";
import db from "@/utils/db";

const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
      const projects = db.queryAll("projects", { sort: [["ID", "DESC"]] }).map(
        (item) =>
          ({
            id: item.id,
            name: item.name,
            description: item.description,
          } as Project)
      );
      return projects;
    },
  });
};

export default useProjects;
