"use client"

import { useEffect, useRef, useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

const Header = () => {
    const pathname = usePathname()
    const { data: session } = useSession()

    const [metaTitle, setmetaTitle] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setmetaTitle(document.title)
        }, 1000);
        return () => clearInterval(interval);
    }, [])
    
    if(['/login', '/password/email', '/password', '/password/reset'].includes(pathname)) {
        return null
    }
    return (
        <header className="w-full left-0 top-0 fixed md:border-t-2 border-primary-900 shadow-primary z-50 py-4 bg-dark-900 md:py-0">
            <div className="flex w-full relative">
                <div className="hidden md:flex w-[250px] h-[69px] items-center justify-center bg-dark-900">
                    <Link href={"/"} className="relative h-10 w-[200px]">
                        <Image src="/assets/logos/mytelevisionlong.png" sizes="(100vw - 2.5rem)" alt="Site Logo" fill />
                    </Link>
                </div>
                <div className="flex-1 md:border-l border-primary-900 bg-dark-900 px-5 flex justify-between items-center">
                    <span className="text-white text-lg font-bold uppercase">{metaTitle}</span>
                    <div className="flex items-center justify-center space-x-6">
                        <Link href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[30px] text-white" viewBox="-0.5 0 32 32">
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Icon-Set" transform="translate(-568.000000, -463.000000)" fill="currentColor">
                                        <path d="M597,481 L570,481 L570,467 C570,465.896 570.896,465 572,465 L595,465 C596.104,465 597,465.896 597,467 L597,481 L597,481 Z M597,485 C597,486.104 596.104,487 595,487 L572,487 C570.896,487 570,486.104 570,485 L570,483 L597,483 L597,485 L597,485 Z M582,489 L586,489 L586,493 L582,493 L582,489 Z M595,463 L572,463 C569.791,463 568,464.791 568,467 L568,485 C568,487.209 569.791,489 572,489 L580,489 L580,493 L578,493 C577.447,493 577,493.448 577,494 C577,494.553 577.447,495 578,495 L590,495 C590.553,495 591,494.553 591,494 C591,493.448 590.553,493 590,493 L588,493 L588,489 L595,489 C597.209,489 599,487.209 599,485 L599,467 C599,464.791 597.209,463 595,463 L595,463 Z" id="desktop" />
                                    </g>
                                </g>
                            </svg>
                        </Link>
                        <button className="w-[36px] h-[36px] rounded-full overflow-hidden relative" onClick={() => setIsOpen(!isOpen)}>
                            <Image 
                                fill
                                src="/assets/images/avatar-10.jpg"
                                sizes="(100vw - 2.5rem)"
                                alt="User Avatar"
                            />
                        </button>
                    </div>
                </div>
                {isOpen && (<div className="absolute right-0 w-40 bg-white rounded-sm -bottom-20 mr-4 flex flex-col space-y-1 py-1.5" ref={ref}>
                    <Link href="/profile" className="flex items-center space-x-2 px-4 py-1.5 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm">Profile</span>
                    </Link>
                    <button onClick={() => signOut()} className="flex items-center space-x-2 px-4 py-1.5 hover:bg-gray-100">
                        <svg className="h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M12 3V12M18.3611 5.64001C19.6195 6.8988 20.4764 8.50246 20.8234 10.2482C21.1704 11.994 20.992 13.8034 20.3107 15.4478C19.6295 17.0921 18.4759 18.4976 16.9959 19.4864C15.5159 20.4752 13.776 21.0029 11.9961 21.0029C10.2162 21.0029 8.47625 20.4752 6.99627 19.4864C5.51629 18.4976 4.36274 17.0921 3.68146 15.4478C3.00019 13.8034 2.82179 11.994 3.16882 10.2482C3.51584 8.50246 4.37272 6.8988 5.6311 5.64001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm">Déconnexion</span>
                    </button>
                </div>)}
            </div>
        </header>
    )
}

export default Header