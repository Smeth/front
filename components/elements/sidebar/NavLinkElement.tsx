import { NavLink } from "@/types/links"
import Link from "next/link"
import GroupNavLinks from "./GroupNavLinks"

import { usePathname } from "next/navigation"

const NavLinkElement = ({ title, link, depth, children, icon }: NavLink) => {
    const pathname = usePathname()
    const isCurrent = pathname === link || pathname.includes(link + "/add")

    if (children && children.length > 0) {
        return (
            <GroupNavLinks {...{title, link, depth, children, icon}} />
        )
    }
    else {
        return (
            <Link 
                href={link || "#"} 
                className={
                    (isCurrent && depth === 1 ? "border-l-4 border-white bg-primary-900 current-navlink" : "hover:text-primary-900 " + 
                    (depth === 1 ? "bg-dark-800" : "bg-dark-900 ")) + 
                    (isCurrent && depth === 2 ? " text-primary-900 " : " text-white") +
                    " flex w-full items-center space-x-3 py-2.5 px-4 group transtion-colors duration-600"}
                >
                {icon}
                <span className={
                    (isCurrent && depth === 1 ? "" : "group-hover:text-primary-900") +
                    " text-sm font-medium transition-colors duration-600"}
                >
                    {title}
                </span>    
            </Link>
        )
    }
}

export default NavLinkElement