import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radios",
  description: "Radios",
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