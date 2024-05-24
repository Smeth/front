import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historique de paiement",
  description: "Historique de paiement",
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
