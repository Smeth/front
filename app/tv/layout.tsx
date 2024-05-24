import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chaines TV",
  description: "Chaines TV",
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
