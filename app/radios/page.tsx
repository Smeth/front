"use client"

import Tooltip from "@components/common/Tooltip"
import { PlusIcon, SearchIcon } from "@icons/MyTVIcons"
import Link from "next/link"

import Popup from 'reactjs-popup'
import Pagination from "@components/common/Pagination"
import CheckBox from "@components/elements/forms/CheckBox"
import DropdownButton from "@components/elements/DropdownButton"
import SelectSearch from "@components/elements/forms/SelectSearch"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "@lib/axios"
import PlaceholderMediumCards from "@components/common/PlaceholderMediumCards"
import RadioCard from "@components/cards/RadioCard"
import { toast } from "react-toastify"

export default function RadiosPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [radios, setRadios] = useState<any[]>([])
    const [categoriesOptions, setCategoriesOptions] = useState<any[]>([])
    const [errors, setErrors] = useState<any>(null)

    const [currentPage, setCurrentPage] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(12)
    const [totalPages, setTotalPages] = useState<number>(0)

    const { data: session, update } = useSession()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/ressources/all?resources=cat_radio_live', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    for (const item of response.data.Data) {
                        if (item.cat_radio_live) {
                            setCategoriesOptions(item.cat_radio_live.map((cat: any) => ({ label: cat.name, value: cat.idcat })))
                        }
                    }
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
                
            }
        }
        session?.token ? fetchData() : null
    }, [session])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/radios/all/?page='+currentPage+'&size='+pageSize+'&sort=name', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setIsLoading(false)
                    setRadios(response.data.Data.content)
                    setTotalPages(response.data.Data.totalPages)
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
                return response
            } catch (error: any) {
                if(error.response.status === 403) {
                    toast.error("Votre token d'accès a expiré. Veuillez vous déconnecter et vous connecter à nouveau.")
                    setErrors({ ...errors, global: "Votre token d’accès a expiré. Veuillez vous déconnecter et vous connecter à nouveau." })
                }
                if(error.code === "ERR_NETWORK") {
                    toast.error('Une erreur est survenue. Veuillez verifier votre connexion internet !')
                    setErrors({ ...errors, global: "Une erreur est survenue. Veuillez verifier votre connexion internet !" })
                } 
            }
        }
        session?.token ? fetchData() : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, currentPage, pageSize])
    return (
        <div className="w-full  ">
            <div className="w-full bg-dark-800 rounded p-5">
                {errors && errors?.global && (<div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30 mb-4">
                    <p className="text-primary-700 text-sm">{errors.global}</p>
                </div>)}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Rechercher" 
                            className="md:w-72 py-3 px-6 bg-dark-700 border-2 text-grey-100 border-dark-600 rounded-full focus:outline-none text-sm font-bold"
                        />
                        <button className="absolute right-4 top-3.5">
                            <SearchIcon classes="text-white h-5" />
                        </button>
                    </div>
                    <div className="">
                        <Popup
                            trigger={open => (
                                <Link href="/radios/add" className="flex items-center space-x-2 bg-secondary-900 py-1.5 px-2 rounded">
                                    <PlusIcon classes="h-3.5 text-white" />
                                    <span className="text-white text-sm font-semibold">Ajouter une radio</span>
                                </Link>
                            )}
                            position="top center"
                            on={['hover', 'focus']}
                        >
                            <Tooltip title="Ajouter une radio" />
                        </Popup>
                    </div>
                </div>
                <div className="mt-3 rounded p-2.5 bg-dark-500 border text-grey-100 border-dark-600 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex space-x-20">
                        <div className="md:w-80">
                            <SelectSearch
                                id="cat_filters"
                                name="cat_filters"
                                options={categoriesOptions}
                                isMulti={false}
                                defaultValue={null}
                                onChange={() => {}}
                                label="Filtrer par catégorie"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <CheckBox
                            name=""
                            id=""
                            checked={false}
                            onChange={() => {}}
                            label="Tout selectionner"
                        />
                        <DropdownButton />
                    </div>
                </div>
                <div className={"grid gap-6 my-6 " + (!isLoading && radios.length === 0 ? " grid-cols-1" : "grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6")}>
                    {!isLoading && radios.length > 0 && radios.map((radio: any, i: number) => (
                        <RadioCard 
                            key={i}
                            title={radio.name}
                            id={radio.idRadio}
                            active={radio.status}
                            selected={false}
                            image={radio.logo_path}
                        />
                    ))}
                    {!isLoading && radios.length === 0 && (
                        <div className="w-full bg-black py-6">
                            <p className="text-white text-center font-medium p-6">
                                {"Aucune radio n'a encore été ajoutée, "}
                                <Link href="/radios/add" className="font-semibold underline text-blue-500">ajoutez-en !</Link>
                            </p>
                        </div>
                    )}
                    {isLoading && <PlaceholderMediumCards nbCards={8} />}
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
