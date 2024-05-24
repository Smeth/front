import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier une série",
  description: "Modifier une série",
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
