import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter une bannière",
  description: "Ajouter une bannière",
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
