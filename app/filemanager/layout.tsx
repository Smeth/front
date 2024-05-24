import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "File manager",
  description: "File manager",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
