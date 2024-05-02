"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "antd";
import useAuthStore from "@/stores/useAuthStore";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const router = useRouter();
  const isLoading = useAuthStore((state) => state.isLoading);
  const signOut = useAuthStore((state) => state.signOut);

  const onClick = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <div className="main-container">
      {pathName !== "/sign-in" && (
        <div style={{ textAlign: "right", paddingBottom: 20 }}>
          <Button loading={isLoading} disabled={isLoading} onClick={onClick}>
            Sign Out
          </Button>
        </div>
      )}
      {children}
    </div>
  );
};

export default MainLayout;
