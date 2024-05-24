import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter un pays",
  description: "Ajouter un pays",
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
