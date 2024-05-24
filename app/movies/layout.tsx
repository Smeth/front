import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Films",
  description: "Pages des films",
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
