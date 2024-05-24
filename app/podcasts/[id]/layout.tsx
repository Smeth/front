import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier un podcast",
  description: "Modifier un podcast",
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
