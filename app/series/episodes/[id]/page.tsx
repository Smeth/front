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

export default function EpisodePage({ params }: any) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [episode, setEpisode] = useState<any>({})
    const [languesOptions, setLanguesOptions] = useState<any>([])
    const [genresOptions, setGenresOptions] = useState<any>([])
    const [actorsOptions, setActorsOptions] = useState<any>([])
    const [directorsOptions, setDirectorsOptions] = useState<any>([])
    const [seriesOptions, setSeriesOptions] = useState<any>([])
    const [series, setSeries] = useState<any>({})
    const [seasonsOptions, setSeasonsOptions] = useState<any>(null)

    const handleFieldChange = (fieldName: string, value: string) => {
        setEpisode({
            ...episode,
            [fieldName]: value
        })
    }

    const handleSelectSearchChange = (newValue: any, actionMeta: any) => {
        setEpisode({
            ...episode,
            [actionMeta.name]: newValue.value
        })
        if("idSerie" === actionMeta.name) {
            const currentSerie = series.find((serie: any) => serie.idSerie === newValue.value)
            if(currentSerie.idSaison.length > 0) {
                setSeasonsOptions(currentSerie.idSaison.map((serie: any) => ({ label: serie.name, value: serie.idSaison })))
            } else {
                setSeasonsOptions(null)
            }
        }
    }

    const [errors, setErrors] = useState<any>({})
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/episodes/' + params.id, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setIsLoading(false)
                    const serie = series.find((l: any) => l.idSerie === response.data.Data.idSaison.idSerie.idSerie)
                    const sOptions = serie.idSaison.map((season: any) => ({ label: season.name, value: season.idSaison }))
                    setEpisode({
                        ...response.data.Data,
                        idSerie: [seriesOptions.find((s: any) => s.value === response.data.Data.idSaison.idSerie.idSerie)],
                        idSaison: [sOptions.find((s: any) => s.value === response.data.Data.idSaison.idSaison)]
                    })
                    setSeasonsOptions(sOptions)
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
                if(error?.response?.status === 404) {
                    toast.error('Episode introuvable !')
                    router.push('/series/episodes')
                }
            }
        }
        session?.token ? fetchData() : null
    }, [session, params.id, router, genresOptions, actorsOptions, languesOptions, directorsOptions, series, seriesOptions])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/ressources/all?resources=genres,langues,acteurs,directeurs,series', {
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
                        } else if (item.acteurs) {
                            setActorsOptions(item.acteurs.map((acteur: any) => ({ label: acteur.fistName + ' ' + acteur.lastName, value: acteur.idActor })))
                        } else if (item.directeurs) {
                            setDirectorsOptions(item.directeurs.map((directeur: any) => ({ label: directeur.fistName + ' ' + directeur.lastName, value: directeur.idDirector })))
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
                    setSeries(response.data.Data)
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
            realeaseDate,
            accessFree,
            posterUrl,
            videoFile,
            videoFile480pUrl,
            videoFile720pUrl,
            videoFile1080pUrl,
            trailer,
            download,
            downloadURL,
            numero,
            duration
        }: any = e.currentTarget

        const idSerie = {"idSerie": getFieldArrayValue(e, "idSerie")[0]}
        const idSaison = {"idSaison": getFieldArrayValue(e, "idSaison")[0]}
        
        const data = {
            name: name.value,
            overview: overview.value,
            idSerie: idSerie,
            idSaison: idSaison,
            realeaseDate: realeaseDate.value,
            numero: numero.value,
            duration: duration.value,
            status: status.value,
            accessFree: accessFree.value,
            backdrop_path: backdrop_path.value,
            posterUrl: posterUrl.value,
            trailer: trailer.value,
            videoFile: videoFile.value,
            videoFile480pUrl: videoFile480pUrl.value,
            videoFile720pUrl: videoFile720pUrl.value,
            videoFile1080pUrl: videoFile1080pUrl.value,
            download: download.value,
            downloadURL: downloadURL.value,
        }

        console.log('data', data)

        try {
            const res = await axios.put('/admin/episodes/update/' + params.id, data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 200) {
                toast.success('Episode mis à jour avec succès!')
                return router.push('/series/episodes')
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
                <Link href="/series/episodes" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                <div className="mt-4">
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 my-3 gap-4 md:gap-12">
                        <div className="">
                            <div className="">
                                <div className="my-8 flex flex-col gap-4">
                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="idSerie" className="text-white text-sm font-medium">Serie*</label>
                                        <div className="w-full md:w-2/3">
                                            <SelectSearch
                                                id="idSerie"
                                                name="idSerie"
                                                options={seriesOptions}
                                                isMulti={false}
                                                label="Selectionner une série"
                                                defaultValue={episode?.idSerie}
                                                onChange={handleSelectSearchChange}
                                            />
                                            {errors && errors?.idSerie && <span className="text-red-500 text-sm">{errors.idSerie}</span>}
                                        </div>
                                    </div>
                                    {
                                        seasonsOptions && (
                                            <div className="flex justify-between items-center space-x-4">
                                                <label htmlFor="idSaison" className="text-white text-sm font-medium">Saison*</label>
                                                <div className="w-full md:w-2/3">
                                                    <SelectSearch
                                                        id="idSaison"
                                                        name="idSaison"
                                                        options={seasonsOptions}
                                                        isMulti={false}
                                                        label="Selectionner une saison"
                                                        defaultValue={episode?.idSaison}
                                                        onChange={handleSelectSearchChange}
                                                    />
                                                    {errors && errors?.idSaison && <span className="text-red-500 text-sm">{errors.idSaison}</span>}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <h2 className="text-lg text-white font-medium">{"Informations sur l'épisode"}</h2>
                                <div className="mt-8 flex flex-col gap-4">

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="name" className="text-white text-sm font-medium">Titre*</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="name" 
                                                id="name"
                                                onChange={(e: any) => setEpisode({...episode, name: e.target.value})}
                                                value={episode?.name}
                                            />
                                            {errors && errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="overview" className="text-white text-sm font-medium">Description</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <textarea
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                name="overview"
                                                id="overview"
                                                value={episode?.overview}
                                                onChange={(e: any) => handleFieldChange('overview', e.target.value)}
                                                rows={4}
                                            ></textarea>
                                            {errors && errors?.overview && <span className="text-red-500 text-sm">{errors.overview}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="realeaseDate" className="text-white text-sm font-medium">Date de sortie</label>
                                        <div className="w-full md:w-2/3">
                                            <DatePickerComponent
                                                defaultValue={episode.realeaseDate !== "" ? episode.realeaseDate : null}
                                                onFieldChange={handleFieldChange}
                                                name="realeaseDate"
                                                id="realeaseDate"
                                            />
                                            {errors && errors?.realeaseDate && <span className="text-red-500 text-sm">{errors.realeaseDate}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="numero" className="text-white text-sm font-medium">Numero</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="numero" 
                                                id="numero"
                                                onChange={(e: any) => setEpisode({...episode, numero: e.target.value})}
                                                value={episode?.numero}
                                            />
                                            {errors && errors?.numero && <span className="text-red-500 text-sm">{errors.numero}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="accessFree" className="text-white text-sm font-medium">Accès au film</label>
                                        <select 
                                            className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="accessFree" 
                                            id="accessFree"
                                            value={episode?.accessFree}
                                            onChange={(e: any) => setEpisode({...episode, accessFree: e.target.value === "true"})}
                                        >
                                            <option value="false">Payant</option>
                                            <option value="true">Gratuit</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="duration" className="text-white text-sm font-medium">Durée</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="duration" 
                                                id="duration"
                                                onChange={(e: any) => setEpisode({...episode, duration: e.target.value})}
                                                value={episode?.duration}
                                            />
                                            {errors && errors?.duration && <span className="text-red-500 text-sm">{errors.duration}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4 py-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="status" className="text-white text-sm font-medium">Statut</label>
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <SwitchRadio 
                                                active={episode?.status}
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
                                        <label htmlFor="trailer" className="text-white text-sm font-medium">Trailer Url</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="trailer" 
                                                id="trailer"
                                                onChange={(e: any) => setEpisode({...episode, trailer: e.target.value})}
                                                value={episode?.trailer}
                                            />
                                            {errors && errors?.trailer && <span className="text-red-500 text-sm">{errors.trailer}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4 py-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="download" className="text-white text-sm font-medium">Téléchargeable ?</label>
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <SwitchRadio 
                                                active={episode?.download}
                                                label1="Oui"
                                                label2="Non"
                                                name="download"
                                                id="download"
                                                onFieldChange={handleFieldChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="downloadURL" className="text-white text-sm font-medium">Lien de téléchargement</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="downloadURL" 
                                                id="downloadURL"
                                                onChange={(e: any) => setEpisode({...episode, downloadURL: e.target.value})}
                                                value={episode?.downloadURL}
                                            />
                                            {errors && errors?.downloadURL && <span className="text-red-500 text-sm">{errors.downloadURL}</span>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="md:pr-12">
                            <div className="">
                                <h2 className="text-lg text-white font-medium">Poster et couverture</h2>
                                <div className="flex flex-col gap-4 mt-4">
                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="posterUrl" className="text-white text-sm font-medium mt-3">Poster*</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader 
                                                name="posterUrl" 
                                                id="posterUrl" 
                                                accept="image/*"
                                                helper="(Recommended resolution : 270X390)"
                                                onFieldChange={handleFieldChange}
                                                fileUrl={episode?.posterUrl}
                                            />
                                            {errors && errors?.posterUrl && <span className="text-red-500 text-sm">{errors.posterUrl}</span>}
                                            {
                                                episode.posterUrl && episode.posterUrl !== "" && (
                                                    <div className="h-28 mt-1 w-auto relative">
                                                        <Image
                                                            fill className="object-contain object-left"
                                                            alt={"poster de " + episode.name}
                                                            src={episode.posterUrl}
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
                                                fileUrl={episode?.backdrop_path}
                                            />
                                            {errors && errors?.backdrop_path && <span className="text-red-500 text-sm">{errors.backdrop_path}</span>}
                                            {
                                                episode.backdrop_path && episode.backdrop_path !== "" && (
                                                    <div className="h-28 mt-1 w-auto relative">
                                                        <Image
                                                            fill className="object-contain object-left"
                                                            alt={"Couverture de " + episode.name}
                                                            src={episode.backdrop_path}
                                                            sizes="(100vw - 2.5rem)"
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-dark-500 mt-4 pt-4">
                                <h2 className="text-lg text-white font-medium">Fichiers et liens vidéos</h2>
                                <div className="flex flex-col gap-4 mt-4">

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="videoFile" className="text-white text-sm font-medium mt-3">Fichier vidéo*</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader 
                                                name="videoFile" 
                                                id="videoFile" 
                                                accept="video/*"
                                                onFieldChange={handleFieldChange}
                                                fileUrl={episode?.videoFile}
                                            />
                                            {errors && errors?.videoFile && <span className="text-red-500 text-sm">{errors.videoFile}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="videoFile480pUrl" className="text-white text-sm font-medium">URL Vidéo 480p</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="videoFile480pUrl" 
                                                id="videoFile480pUrl"
                                                onChange={(e: any) => setEpisode({...episode, videoFile480pUrl: e.target.value})}
                                                value={episode?.videoFile480pUrl}
                                            />
                                            {errors && errors?.videoFile480pUrl && <span className="text-red-500 text-sm">{errors.videoFile480pUrl}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="videoFile720pUrl" className="text-white text-sm font-medium">URL Vidéo 720p</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="videoFile720pUrl" 
                                                id="videoFile720pUrl"
                                                onChange={(e: any) => setEpisode({...episode, videoFile720pUrl: e.target.value})}
                                                value={episode?.videoFile720pUrl}
                                            />
                                            {errors && errors?.videoFile720pUrl && <span className="text-red-500 text-sm">{errors.videoFile720pUrl}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="videoFile1080pUrl" className="text-white text-sm font-medium">URL Vidéo 1080p</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="videoFile1080pUrl" 
                                                id="videoFile1080pUrl"
                                                onChange={(e: any) => setEpisode({...episode, videoFile1080pUrl: e.target.value})}
                                                value={episode?.videoFile1080pUrl}
                                            />
                                            {errors && errors?.videoFile1080pUrl && <span className="text-red-500 text-sm">{errors.videoFile1080pUrl}</span>}
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
