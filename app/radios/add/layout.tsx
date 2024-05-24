import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter une radio",
  description: "Ajouter une radio",
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
