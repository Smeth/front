import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acteurs",
  description: "Pages des acteurs",
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
