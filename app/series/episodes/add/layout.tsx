import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter un épisode",
  description: "Ajouter un épisode",
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
