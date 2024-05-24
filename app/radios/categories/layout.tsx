import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gatégories de chaines",
  description: "Gatégories de chaines",
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
