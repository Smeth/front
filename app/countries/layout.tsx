import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tous les pays",
  description: "Tous les pays",
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
