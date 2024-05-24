import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier une saison",
  description: "Modifier une saison",
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
