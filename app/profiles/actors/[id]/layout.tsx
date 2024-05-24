import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier un acteur",
  description: "Modifier un acteur",
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
