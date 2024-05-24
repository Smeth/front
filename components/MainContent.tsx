
"use client"

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { usePathname } from "next/navigation"
import Footer from "./common/Footer"

const MainContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    if(['/login', '/password/email', '/password', '/password/reset'].includes(pathname)) {
        return <>{children}</>
    }
    return (
        <div className="min-h-screen flex flex-col justify-between">
          <main className="flex flex-col items-center justify-between md:ml-[250px] pt-24 px-4 md:px-5 pb-5 main-max-w">
            {children}
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
    )
}

export default MainContent