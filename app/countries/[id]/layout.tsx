import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier un pays",
  description: "Modifier un pays",
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
