import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier une radio",
  description: "Modifier une radio",
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
