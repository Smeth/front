import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tous les podcasts",
  description: "Tous les podcasts",
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
