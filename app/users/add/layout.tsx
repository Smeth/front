import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter un utilisateur",
  description: "Ajouter un utilisateur",
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
