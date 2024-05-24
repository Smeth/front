import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter une chaine",
  description: "Ajouter une chaine",
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
