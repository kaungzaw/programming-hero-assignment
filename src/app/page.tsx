"use client";
import ProjectList from "@/components/ProjectList";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const getUsername = useAuthStore((state) => state.getUsername);
  if (!getUsername()) {
    router.push("/sign-in");
  }

  return <ProjectList />;
};

export default HomePage;
