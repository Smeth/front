"use client"

import Tooltip from "@components/common/Tooltip"
import { PlusIcon, SearchIcon } from "@icons/MyTVIcons"
import Link from "next/link"

import Popup from 'reactjs-popup'
import SeasonCard from "@components/cards/SeasonCard"
import Pagination from "@components/common/Pagination"
import FilterBox from "@components/elements/forms/FilterBox"
import CheckBox from "@components/elements/forms/CheckBox"
import DropdownButton from "@components/elements/DropdownButton"
import SelectSearch from "@components/elements/forms/SelectSearch"
import { useEffect, useState } from "react"
import axios from "@lib/axios"
import { useSession } from "next-auth/react"
import PlaceholderLargeCards from "@components/common/PlaceholderLargeCards"
import { toast } from "react-toastify"

export default function Seasons() {
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [searchWord, setSearchWord] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [languesOptions, setLanguesOptions] = useState<any[]>([])
    const [seasons, setSeaspns] = useState<any[]>([])
    const [selectedMovies, setSelectedMovies] = useState<string[]>([])
    const [genresOptions, setGenresOptions] = useState<any[]>([])
    const [series, setSeries] = useState<any[]>([])

    const [checkedSelectAll, setCheckedSelectAll] = useState<boolean>(false)

    const { data: session } = useSession()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/saisons', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setSeaspns(response.data.Data)
                    setIsLoading(false)
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        session?.token ? fetchData() : null
    }, [session])

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
                    // fetchSeries()
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
                
            }
        }
        session?.token ? fetchData() : null
        // const fetchSeries = async () => {
        //     try {
        //         const response = await axios.get('/admin/series', {
        //             headers: {
        //                 Authorization: `Bearer ${session?.token}`
        //             }
        //         })
        //         if(response.status === 200) {
        //             setSeries(response.data.Data.map((serie: any) => ({ label: serie.name, value: serie.idSerie })))
        //         }
        //         else {
        //             toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
        //         }
        //     } catch (error: any) {
                
        //     }
        // }
    }, [session])

    const handlePageChange = (page: number) => {
        setPage(page)
    }

    const handleSelectMovie = (val: string) => {
        if(!selectedMovies.includes(val)) {
            setSelectedMovies([...selectedMovies, val])
        } else {
            setSelectedMovies(selectedMovies.filter(item => item !== val))
        }
    }

    // console.log('seasons', seasons[0])
    return (
        <div className="w-full">
            <div className="w-full bg-dark-800 rounded p-5">
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
                                <Link href="/series/seasons/add" className="flex items-center space-x-2 bg-secondary-900 py-1.5 px-2 rounded">
                                    <PlusIcon classes="h-3.5 text-white" />
                                    <span className="text-white text-sm font-semibold">Ajouter une saison</span>
                                </Link>
                            )}
                            position="top center"
                            on={['hover', 'focus']}
                        >
                            <Tooltip title="Ajouter une saison" />
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
                                onChange={() => {}}
                                label="Filtrer par langue"
                            />
                        </div>

                        <div className="md:w-80">
                            <SelectSearch
                                id="genre_filters"
                                name="genre_filters"
                                options={genresOptions}
                                isMulti={false}
                                defaultValue={null}
                                onChange={() => {}}
                                label="Filtrer par genres"
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

                <div className={"grid gap-6 my-6 " + (!isLoading && seasons.length === 0 ? " grid-cols-1" : "grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6")}>
                    {!isLoading && seasons.length > 0 && seasons.map((season: any, i: number) => (
                        <SeasonCard 
                            key={i}
                            season={season.name}
                            // title={series.filter(serie => serie.idSerie === season.idSerie)[0]?.label}
                            title={season.idSerie.name}
                            id={season.idSaison}
                            active={season.status}
                            selected={false}
                            image={season.poster_path}
                        />
                    ))}
                    {!isLoading && seasons.length === 0 && (
                        <div className="w-full bg-black py-6">
                            <p className="text-white text-center font-medium p-6">
                                {"Aucune saison n'a encore été ajoutée, "}
                                <Link href="/series/seasons/add" className="font-semibold underline text-blue-500">ajoutez-en !</Link>
                            </p>
                        </div>
                    )}
                    {isLoading && <PlaceholderLargeCards nbCards={8} />}
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
