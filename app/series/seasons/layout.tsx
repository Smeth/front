import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toutes les saisons",
  description: "Pages des séries",
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
