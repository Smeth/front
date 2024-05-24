import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter une collection",
  description: "Ajouter une collection",
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
