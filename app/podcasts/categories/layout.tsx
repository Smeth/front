import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gatégories podcasts",
  description: "Gatégories podcasts",
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
