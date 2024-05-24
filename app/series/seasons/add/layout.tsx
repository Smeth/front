import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter une saison",
  description: "Ajouter une saison",
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
