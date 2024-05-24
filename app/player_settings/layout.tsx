import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configs du lecteur",
  description: "Pages des Intervenants",
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
