"use client"

import DatePickerComponent from "@components/elements/forms/DatePicker"
import S3FileUploader from "@components/elements/forms/S3FileUploader"
import SelectSearch from "@components/elements/forms/SelectSearch"
import SwitchRadio from "@components/elements/forms/SwitchRadio"
import TinyEditor from "@components/elements/forms/TinyEditor"
import { LeftArrowIcon, SaveIcon } from "@icons/MyTVIcons"
import axios from "@lib/axios"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { dateToInputDate, getFieldArrayValue } from "@utils/utilities"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

export default function SeasonPage({ params }: any) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [season, setSeason] = useState<any>({})
    const [languesOptions, setLanguesOptions] = useState<any>([])
    const [seriesOptions, setSeriesOptions] = useState<any>([])

    const handleFieldChange = (fieldName: string, value: string) => {
        setSeason({
            ...season,
            [fieldName]: value
        })
    }

    const handleSelectSearchChange = (newValue: any, actionMeta: any) => {
        setSeason({
            ...season,
            [actionMeta.name]: newValue.value
        })
    }

    const [errors, setErrors] = useState<any>({})
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/saisons/' + params.id, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setIsLoading(false)
                    setSeason({
                        ...response.data.Data,
                        langue: [languesOptions.find((l: any) => l.value === response.data.Data.langue[0])],
                        idSerie: [seriesOptions.find((l: any) => l.value === response.data.Data.idSerie.idSerie)],
                    })
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
                if(error.response.status === 404) {
                    toast.error('Saison introuvable !')
                    router.push('/series/seasons')
                }
            }
        }
        session?.token ? fetchData() : null
    }, [session, params.id, router, languesOptions, seriesOptions])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/ressources/all?resources=langues', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    for (const item of response.data.Data) {
                        if (item.langues) {
                            setLanguesOptions(item.langues.map((langue: any) => ({ label: langue.name, value: langue.idLang })))
                        }
                    }
                    fetchSeries()
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
                
            }
        }
        session?.token ? fetchData() : null
        const fetchSeries = async () => {
            try {
                const response = await axios.get('/admin/series', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setSeriesOptions(response.data.Data.map((serie: any) => ({ label: serie.name, value: serie.idSerie })))
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
                
            }
        }
    }, [session])
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { 
            name,
            overview,
            status,
            backdrop_path,
            releaseDate,
            accessFree,
            poster_path,
            trailerURL,
            langue
        }: any = e.currentTarget

        const idSerie = {"idSerie": getFieldArrayValue(e, "idSerie")[0]}
        
        const data = {
            name: name.value,
            overview: overview.value,
            idSerie: idSerie,
            releaseDate: releaseDate.value,
            status: status.value,
            accessFree: accessFree.value,
            backdrop_path: backdrop_path.value,
            poster_path: poster_path.value,
            trailerURL: trailerURL.value,
            langue: getFieldArrayValue(e, "langue"),
        }

        console.log('data', data)

        try {
            const res = await axios.put('/admin/saisons/update/' + params.id, data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 200) {
                toast.success('Saison mis à jour avec succès!')
                return router.push('/series/seasons')
            }
        } catch (error: any) {
            if(error.response.status === 409) {
                setErrors({ ...errors, global: error.response.data.Data })
            }
            else if (error.response.status === 400) {
                setErrors({ ...errors, ...error.response.data.Data })
            } 
            else {
                 setErrors({ ...errors, global: "Oops, quelque chose s'est mal passé. Veuillez rafraichir la page et réessayer" })
                toast.error("Oops, quelque chose s'est mal passé. Veuillez rafraichir la page et reessayer")
            }
        }
    }

    return (
        <div className="w-full">
            <div className="w-full bg-dark-800 rounded p-5">
                <Link href="/series/seasons" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                <div className="mt-4">
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 my-3 gap-4 md:gap-12">
                        <div className="">
                            <div className="">
                                <h2 className="text-lg text-white font-medium">Informations sur la saison</h2>
                                <div className="mt-8 flex flex-col gap-4">

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="idSerie" className="text-white text-sm font-medium">Serie*</label>
                                        <div className="w-full md:w-2/3">
                                            <SelectSearch
                                                id="idSerie"
                                                name="idSerie"
                                                options={seriesOptions}
                                                isMulti={false}
                                                label="Selectionner une série"
                                                defaultValue={season?.idSerie}
                                                onChange={handleSelectSearchChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="name" className="text-white text-sm font-medium">Titre*</label>
                                        <input 
                                            className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="name" 
                                            id="name"
                                            onChange={(e: any) => setSeason({...season, name: e.target.value})}
                                            value={season.name}
                                        />
                                    </div>

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="overview" className="text-white text-sm font-medium">Description</label>
                                        <textarea
                                            className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="overview"
                                            id="overview"
                                            value={season?.overview}
                                            onChange={(e: any) => handleFieldChange('overview', e.target.value)}
                                            rows={4}
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="langue" className="text-white text-sm font-medium">Langue*</label>
                                        <div className="w-full md:w-2/3">
                                            <SelectSearch
                                                id="langue"
                                                name="langue"
                                                options={languesOptions}
                                                isMulti={false}
                                                label="Selectionner une langue"
                                                defaultValue={season?.langue}
                                                onChange={handleSelectSearchChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="releaseDate" className="text-white text-sm font-medium">Date de sortie</label>
                                        <div className="w-full md:w-2/3">
                                            <DatePickerComponent
                                                defaultValue={season.releaseDate !== "" ? season.releaseDate : null}
                                                onFieldChange={handleFieldChange}
                                                name="releaseDate"
                                                id="releaseDate"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="accessFree" className="text-white text-sm font-medium">Accès à la saison</label>
                                        <select 
                                            className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="accessFree" 
                                            id="accessFree"
                                            value={season?.accessFree}
                                            onChange={(e: any) => setSeason({...season, accessFree: e.target.value === "true"})}
                                        >
                                            <option value="false">Payant</option>
                                            <option value="true">Gratuit</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-between space-x-4 py-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="status" className="text-white text-sm font-medium">Statut</label>
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <SwitchRadio 
                                                active={season?.status}
                                                label1="Actif"
                                                label2="Inactif"
                                                name="status"
                                                id="status"
                                                onFieldChange={handleFieldChange}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="border-t border-dark-500 mt-4 pt-4">
                                <h2 className="text-lg text-white font-medium">Autres</h2>
                                <div className="flex flex-col gap-4 mt-4">

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="trailerURL" className="text-white text-sm font-medium">Trailer Url</label>
                                        <input 
                                            className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="trailerURL" 
                                            id="trailerURL"
                                            onChange={(e: any) => setSeason({...season, trailerURL: e.target.value})}
                                            value={season.trailerURL}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="md:pr-12">
                            <div className="">
                                <h2 className="text-lg text-white font-medium">Poster et couverture</h2>
                                <div className="flex flex-col gap-4 mt-4">
                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="poster_path" className="text-white text-sm font-medium mt-3">Poster*</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader 
                                                name="poster_path" 
                                                id="poster_path" 
                                                accept="image/*"
                                                helper="(Recommended resolution : 270X390)"
                                                onFieldChange={handleFieldChange}
                                                fileUrl={season?.poster_path}
                                            />
                                            {
                                                season.poster_path && season.poster_path !== "" && (
                                                    <div className="h-28 mt-1 w-auto relative">
                                                        <Image
                                                            fill className="object-contain object-left"
                                                            alt={"poster de " + season.name}
                                                            src={season.poster_path}
                                                            sizes="(100vw - 2.5rem)"
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="backdrop_path" className="text-white text-sm font-medium mt-3">Couverture</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader 
                                                name="backdrop_path" 
                                                id="backdrop_path" 
                                                accept="image/*"
                                                helper="(Recommended resolution : 270X390)"
                                                onFieldChange={handleFieldChange}
                                                fileUrl={season?.backdrop_path}
                                            />
                                            {
                                                season.backdrop_path && season.backdrop_path !== "" && (
                                                    <div className="h-28 mt-1 w-auto relative">
                                                        <Image
                                                            fill className="object-contain object-left"
                                                            alt={"Couverture de " + season.name}
                                                            src={season.backdrop_path}
                                                            sizes="(100vw - 2.5rem)"
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button type="submit" className="flex items-center space-x-2 bg-primary-900 px-4 py-2 rounded">
                                    <SaveIcon classes="h-4 text-white" />
                                    <span className="text-white text-xs font-semibold uppercase">Sauvegarder</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
