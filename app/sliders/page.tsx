"use client"

import SliderCard from "@components/cards/SliderCard"
import Modal from "@components/common/Modal"
import Pagination from "@components/common/Pagination"
import Tooltip from "@components/common/Tooltip"
import { PlusIcon, TimesIcon } from "@icons/MyTVIcons"
import Link from "next/link"
import { useState } from "react"

import Popup from 'reactjs-popup'

export default function Genres() {
    const [open, setOpen] = useState<boolean>(false)
    const closeModal = () => {
        setOpen(false)
    }
    return (
        <div className="w-full  ">
            <div className="w-full bg-dark-800 rounded p-6">
                <div className="">
                    <Popup
                        trigger={open => (
                            <Link href="/sliders/add" className="inline-flex items-center space-x-2 bg-secondary-900 py-1.5 px-2 rounded">
                                <PlusIcon classes="h-3.5 text-white" />
                                <span className="text-white text-sm font-semibold">Ajouter un slider</span>
                            </Link>
                        )}
                        position="top center"
                        on={['hover', 'focus']}
                    >
                        <Tooltip title="Ajouter un slider" />
                    </Popup>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-8 gap-6 my-6">
                    <SliderCard
                        title="Aspirants"
                        active={false}
                        id="aventure"
                        image="/assets/images/4524df59b8e408fc35106fce1ddbc496fad69e47ac2f5110d4d61508c753c29e.jpg"
                    />
                    <SliderCard
                        title="Sony Six"
                        active={true}
                        id="comedie"
                        image="/assets/images/Sony_Entertainment_Television.jpg"
                    />
                    <SliderCard
                        title="Jawan"
                        active={true}
                        id="crime-policier"
                        image="/assets/images/Jawan.jpg"
                    />
                    <SliderCard
                        title="Stranger Things"
                        active={true}
                        id="aventure"
                        image="/assets/images/stranger-things-netflix.jpg"
                    />
                </div>

                {!isLoading && totalPages > 1 && 
                <Pagination 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />}
            
            </div>
        </div>
    )
}
