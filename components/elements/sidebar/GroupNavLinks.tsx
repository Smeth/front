"use client"

import { useEffect, useState } from 'react'

import { NavLink } from "@/types/links"
import NavLinkElement from "./NavLinkElement"
import { usePathname } from 'next/navigation'

const GroupNavLinks = ({ title, link, children, icon }: NavLink ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const pathname = usePathname()
    const isCurrent = pathname === link || pathname.includes(link + "/")
    useEffect(() => {
        setIsOpen(isCurrent)
    }, [isCurrent])
    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className={(isCurrent ? "border-l-4 border-white bg-primary-900" : "bg-dark-800 hover:text-primary-900") + " flex items-center justify-between w-full py-2.5 px-4 group text-white transtion-colors duration-600"}>
                <div className="flex items-center space-x-3">
                    {icon}
                    <span className={(isCurrent ? "" : "group-hover:text-primary-900") + " text-white text-sm font-medium"}>{title}</span>
                </div>  
                <span className="">
                    <svg className={(isOpen ? "rotate-0" : "-rotate-90") + " h-4 transform transition duration-300"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.414L3.29297 8.70697L4.70697 7.29297L12 14.586L19.293 7.29297L20.707 8.70697L12 17.414Z" fill="currentColor"></path>
                    </svg>    
                </span>  
            </button>
            {
                isOpen && children && (
                    <div className="pl-8 pt-1 bg-dark-900">
                        {
                            children.map((link: NavLink, index: number) => {
                                return (
                                    <NavLinkElement key={index} {...link} />
                                )
                            })
                        }
                    </div>
                )
            }
        </>
    )
}

export default GroupNavLinks