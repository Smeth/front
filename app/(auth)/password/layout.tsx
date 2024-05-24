import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mot de passe",
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
