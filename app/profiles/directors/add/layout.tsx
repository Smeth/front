import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Utilisateurs",
  description: "Pages des Utilisateurs",
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
