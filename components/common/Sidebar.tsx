"use client"

import NavLinkElement from "@components/elements/sidebar/NavLinkElement"
import { NavLink } from "@/types/links"
import { navLinks } from "@data/sidebar"
import { usePathname } from "next/navigation"

const Sidebar = () => {
    const pathname = usePathname()
    if(['/login', '/password/email', '/password', '/password/reset'].includes(pathname)) {
        return null
    }
    return (
        <aside className="hidden md:block w-[250px] bg-dark-900 py-4 mt-[69px] fixed z-40" style={{ height: "calc(100vh - 69px)" }}>
            <div className="flex flex-col space-y-1 h-full overflow-y-auto">
                {
                    navLinks.length > 0 && (
                        navLinks.map((link: NavLink, index: number) =>  (
                            <NavLinkElement key={index} {...link} />
                        ))
                    )
                }
            </div>
        </aside>
    )
}

export default Sidebar