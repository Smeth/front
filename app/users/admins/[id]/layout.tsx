import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier un administrateur",
  description: "Modifier un administrateur",
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
