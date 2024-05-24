import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier un film",
  description: "Modifier un film",
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
