import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter une série",
  description: "Ajouter une série",
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
