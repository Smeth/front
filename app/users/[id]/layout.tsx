import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infos utilisateur",
  description: "Infos utilisateur",
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
