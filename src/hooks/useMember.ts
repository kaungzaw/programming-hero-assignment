import { useQuery } from "@tanstack/react-query";
import db from "@/utils/db";

const useMember = (id: string) => {
  return useQuery({
    queryKey: ["members", id] as const,
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
      const members = db
        .queryAll("members", {
          query: { id: id },
        })
        .map(
          (item) =>
            ({
              id: item.id,
              name: item.name,
              projectId: item.projectId,
            } as Member)
        );
      if (members.length === 0) {
        throw new Error("Member not found");
      }
      return members[0];
    },
  });
};

export default useMember;
