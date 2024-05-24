import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sliders",
  description: "Pages des genres",
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
