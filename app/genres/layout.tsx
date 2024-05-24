import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tous les genres",
  description: "Tous les genres",
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
