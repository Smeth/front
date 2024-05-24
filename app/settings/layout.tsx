import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réglages",
  description: "Page des réglages",
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
