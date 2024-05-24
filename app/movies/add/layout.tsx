import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter un film",
  description: "Page d'ajout d'un film",
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
