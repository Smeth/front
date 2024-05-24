import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter une live",
  description: "Ajouter une live",
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
