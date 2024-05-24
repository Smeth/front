import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Utilisateurs archivés",
  description: "Pages des Administrateurs",
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
