import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bannières publicitaires",
  description: "Bannières publicitaires",
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
