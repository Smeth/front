import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@styles/globals.css"
import Header from "@components/common/Header"
import Sidebar from "@components/common/Sidebar"
import MainContent from "@components/MainContent"
import SessionProvider from "@components/SessionProvider"
import { getServerSession } from "next-auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard MyTelevision",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()
  return (
    <html lang="fr">
      <body className={inter.className + " bg-dark-900 overflow-x-hidden"}>
        <SessionProvider session={session}>
          <Header />
          <Sidebar />
          <MainContent>{children}</MainContent>
        </SessionProvider>
      </body>
    </html>
  );
}
