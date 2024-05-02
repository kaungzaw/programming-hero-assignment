import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import "antd/dist/reset.css";
import "./globals.css";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assignment",
  description: "Assignment for Programming Hero",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={inter.className}>
      <AntdRegistry>
        <ReactQueryClientProvider>
          <MainLayout>{children}</MainLayout>
        </ReactQueryClientProvider>
      </AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
