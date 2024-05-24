import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier une bannière",
  description: "Modifier une bannière",
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
