import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tous les plans d'abonnements",
  description: "Tous les plans d'abonnements",
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
