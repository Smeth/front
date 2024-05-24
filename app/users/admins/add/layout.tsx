import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter un administrateur",
  description: "Ajouter un administrateur",
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
