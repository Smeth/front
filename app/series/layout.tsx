import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Séries",
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
