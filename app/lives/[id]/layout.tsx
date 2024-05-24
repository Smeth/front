import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier une chaine",
  description: "Modifier une chaine",
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
