import { TrashIcon } from "@icons/MyTVIcons"
import { useClickOutside } from "@utils/utilities"
import Link from "next/link"
import { useRef, useState } from "react"



const DropdownButton = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useClickOutside(ref, () => {
        setOpen(false)
    })
    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)} 
                type="button" className="relative pl-3 pr-8 py-1.5 bg-tertiary-800 rounded text-sm font-medium text-white angle-down-after after:right-0.5"
            >
                Actions
            </button>
            {open && (<div className="absolute w-40 right-0 z-10 bg-white rounded mt-0.5 flex flex-col space-y-1 py-1.5">
                <Link href="#" className="flex items-center space-x-2 px-4 py-1.5 hover:bg-gray-100">
                    <TrashIcon classes="h-5 text-gray-500" />
                    <span className="text-sm">Supprimer</span>
                </Link>
            </div>)}
        </div>
    )
}

export default DropdownButton