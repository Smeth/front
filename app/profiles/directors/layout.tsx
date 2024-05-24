import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directeurs",
  description: "Pages des Directeurs",
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
