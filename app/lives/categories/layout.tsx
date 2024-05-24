import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gatégories lives",
  description: "Gatégories lives",
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
