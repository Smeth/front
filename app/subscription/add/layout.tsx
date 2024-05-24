import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter un plan d'abonnement",
  description: "Ajouter un plan d'abonnement",
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
