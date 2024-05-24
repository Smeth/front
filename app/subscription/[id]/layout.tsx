import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier un plan d'abonnement",
  description: "Modifier un plan d'abonnement",
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
