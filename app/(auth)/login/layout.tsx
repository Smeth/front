import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login MyTelevision",
  description: "Login MyTelevision",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>{children}</div>
  );
}
