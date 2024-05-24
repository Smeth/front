import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier un épisode",
  description: "Modifier un épisode",
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
