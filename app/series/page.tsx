"use client"

import Tooltip from "@components/common/Tooltip"
import { PlusIcon, SearchIcon } from "@icons/MyTVIcons"
import Link from "next/link"

import Popup from 'reactjs-popup'
import SerieCard from "@components/cards/SerieCard"
import Pagination from "@components/common/Pagination"
import CheckBox from "@components/elements/forms/CheckBox"
import DropdownButton from "@components/elements/DropdownButton"
import SelectSearch from "@components/elements/forms/SelectSearch"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "@lib/axios"
import PlaceholderMediumCards from "@components/common/PlaceholderMediumCards"
import { toast } from "react-toastify"

export default function Series() {
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)
    const [searchWord, setSearchWord] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [languesOptions, setLanguesOptions] = useState<any[]>([])
    const [series, setSeries] = useState<any[]>([])
    const [selectedMovies, setSelectedMovies] = useState<string[]>([])
    const [genresOptions, setGenresOptions] = useState<any[]>([])
    const [errors, setErrors] = useState<any>(null)

    const [checkedSelectAll, setCheckedSelectAll] = useState<boolean>(false)

    const { data: session } = useSession()
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('/admin/series/all/withPaging?page='+currentPage+'&size='+pageSize+'&sort=fistName', {
                const response = await axios.get('/admin/series', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setSeries(response.data.Data)
                    setIsLoading(false)
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
                if(error.response.status === 403) {
                    toast.error("Votre token d'accès a expiré. Veuillez vous déconnecter et vous connecter à nouveau.")
                    setErrors({ ...errors, global: "Votre token d’accès a expiré. Veuillez vous déconnecter et vous connecter à nouveau." })
                }
                else if(error.code === "ERR_NETWORK") {
                    toast.error('Une erreur est survenue. Veuillez verifier votre connexion internet !')
                    setErrors({ ...errors, global: "Une erreur est survenue. Veuillez verifier votre connexion internet !" })
                } 
                else {
                    toast.error('Une erreur est survenue. Veuillez rafraichir la page ou réessayer plus tard!')
                    setErrors({ ...errors, global: "Une erreur est survenue. Veuillez rafraichir la page ou réessayer plus tard!" }) 
                }
            }
        }
        session?.token ? fetchData() : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, currentPage, pageSize])

    console.log('series', series)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/ressources/all?resources=genres,langues,acteurs,directeurs', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    for (const item of response.data.Data) {
                        if (item.langues) {
                            setLanguesOptions(item.langues.map((langue: any) => ({ label: langue.name, value: langue.idLang })))
                        } else if (item.genres) {
                            setGenresOptions(item.genres.map((genre: any) => ({ label: genre.name, value: genre.idGenre })))
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

    const handleSelectMovie = (val: string) => {
        if(!selectedMovies.includes(val)) {
            setSelectedMovies([...selectedMovies, val])
        } else {
            setSelectedMovies(selectedMovies.filter(item => item !== val))
        }
    }

    const handleSelectAll = () => {
        
    }
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
                                <Link href="/series/add" className="flex items-center space-x-2 bg-secondary-900 py-1.5 px-2 rounded">
                                    <PlusIcon classes="h-3.5 text-white" />
                                    <span className="text-white text-sm font-semibold">Ajouter une série</span>
                                </Link>
                            )}
                            position="top center"
                            on={['hover', 'focus']}
                        >
                            <Tooltip title="Ajouter une série" />
                        </Popup>
                    </div>
                </div>
                <div className="mt-3 rounded p-2.5 bg-dark-500 border text-grey-100 border-dark-600 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex space-x-20">
                        <div className="md:w-80">
                            <SelectSearch
                                id="language_filters"
                                name="language_filters"
                                options={languesOptions}
                                isMulti={false}
                                defaultValue={null}
                                label="Filtrer par langue"
                                onChange={() => {}}
                            />
                        </div>

                        <div className="md:w-80">
                            <SelectSearch
                                id="genre_filters"
                                name="genre_filters"
                                options={genresOptions}
                                isMulti={false}
                                defaultValue={null}
                                label="Filtrer par genres"
                                onChange={() => {}}
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
                <div className={"grid gap-6 my-6 " + (!isLoading && series.length === 0 ? " grid-cols-1" : "grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5")}>
                    {!isLoading && series.length > 0 && series.map((serie: any, i: number) => (
                        <SerieCard 
                            key={i}
                            title={serie.name}
                            id={serie.idSerie}
                            active={serie.status}
                            selected={false}
                            image={serie.poster_path}
                        />
                    ))}
                    {!isLoading && series.length === 0 && (
                        <div className="w-full bg-black py-6">
                            <p className="text-white text-center font-medium p-6">
                                {"Aucune série n'a encore été ajoutée, "}
                                <Link href="/series/add" className="font-semibold underline text-blue-500">ajoutez-en !</Link>
                            </p>
                        </div>
                    )}
                    {isLoading && <PlaceholderMediumCards nbCards={pageSize} />}
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
