import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toutes les langues",
  description: "Toutes les langues",
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
