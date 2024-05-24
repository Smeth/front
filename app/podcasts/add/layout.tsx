import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter un podcast",
  description: "Ajouter un podcast",
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
