"use client"

import { usePathname } from "next/navigation"

const Footer = () => {
    const pathname = usePathname()
    if(['/login', '/password/email', '/password/reset', '/password'].includes(pathname)) {
        return null
    }
    return (
        <section className="w-full main-max-w border-t mt-2 border-gray-700 md:ml-[250px] flex items-center justify-center p-6">
            <p className="text-sm text-grey-100">© 2022 MyTelevision. All rights reserved.</p>
        </section>
    )
}

export default Footer