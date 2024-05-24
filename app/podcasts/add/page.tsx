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
import { getFieldArrayValue } from "@utils/utilities"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AddPodcastPage() {
    const [errors, setErrors] = useState<any>(null)
    const [podcast, setPodcast] = useState<any>({})
    const [languesOptions, setLanguesOptions] = useState<any[]>([])
    const [categoriesOptions, setCategoriesOptions] = useState<any[]>([])
    const [collectionOptions, setCollectionOptions] = useState<any[]>([])

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/ressources/all?resources=langues,catpodcast', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    for (const item of response.data.Data) {
                        if (item.catpodcast) {
                            setCategoriesOptions(item.catpodcast.map((cat: any) => ({ label: cat.name, value: cat.idCatPod })))
                        }
                        else if (item.langues) {
                            setLanguesOptions(item.langues.map((lang: any) => ({ label: lang.name, value: lang.idLang })))
                        }
                    }
                    fetchCollections()
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
                
            }
        }
        session?.token ? fetchData() : null
        const fetchCollections = async () => {
            try {
                const response = await axios.get('/admin/podcast/collections', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setCollectionOptions(response.data.Data.map((collection: any) => ({ label: collection.name, value: collection.idColPd })))
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    const handleFieldChange = (fieldName: string, value: string) => {
        setPodcast({
            ...podcast,
            [fieldName]: value
        })
    }

    const handleSelectSearchChange = (newValue: any, actionMeta: any) => {
        setPodcast({
            ...podcast,
            [actionMeta.name]: newValue.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { name, overview, backdrop_path, poster_path, autheur, status, streamLink, accessFree, fileLink }: any = e.currentTarget
        
        const idCollection = getFieldArrayValue(e, 'idCollection')[0]

        const data = {
            idCollection: idCollection,
            name: name.value,
            autheur: autheur.value,
            categories: getFieldArrayValue(e, 'categories'),
            overview: overview.value,
            backdrop_path: backdrop_path.value,
            poster_path: poster_path.value,
            status: status.value,
            streamLink: streamLink.value,
            fileLink: fileLink.value,
            langue: getFieldArrayValue(e, 'langue'),
            accessFree: accessFree.value
        }

        console.log('data', data)

        try {
            const res = await axios.post('/admin/podcasts/create', data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 201) {
                toast.success('Podcast ajouté avec succès!')
                return router.push('/podcasts')
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
                <Link href="/podcasts" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                {errors && errors?.global && (<div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30 mb-4">
                    <p className="text-primary-700 text-sm">{errors.global}</p>
                </div>)}
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="grid grid-cols-2 my-3 gap-4 md:gap-12">
                        <div className="">
                            <div className="flex justify-between items-center space-x-4 my-6">
                                <label htmlFor="idCollection" className="text-white text-sm font-medium">Collection*</label>
                                <div className="w-full md:w-2/3">
                                    <SelectSearch
                                        id="idCollection"
                                        name="idCollection"
                                        options={collectionOptions}
                                        isMulti={false}
                                        defaultValue={podcast?.idCollection || null}
                                        onChange={handleSelectSearchChange}
                                        label="Selectionner une collection"
                                    />
                                    {errors && errors?.idCollection && <span className="text-red-500 text-sm">{errors.idCollection}</span>}
                                </div>
                            </div>
                            <div className="">
                                <h2 className="text-lg text-white font-medium">Informations sur le podcast</h2>
                                <div className="mt-8 flex flex-col gap-4">

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="name" className="text-white text-sm font-medium">Titre du podcast*</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="name" 
                                                id="name"
                                                onChange={(e: any) => setPodcast({...podcast, name: e.target.value})}
                                                value={podcast?.name}
                                            />
                                            {errors && errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                        </div>
                                    </div>

                                    <div className="">
                                        <label htmlFor="overview" className="text-white text-sm font-medium">Description</label>
                                        <div className="w-full my-3 h-72">
                                            <TinyEditor 
                                                defaultValue={podcast?.overview || ''}
                                                id="overview"
                                                name="overview"
                                                onFieldChange={handleFieldChange}
                                            />
                                            {errors && errors?.overview && <span className="text-red-500 text-sm">{errors.overview}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="autheur" className="text-white text-sm font-medium">Auteur du podcast*</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="autheur" 
                                                id="autheur"
                                                onChange={(e: any) => setPodcast({...podcast, autheur: e.target.value})}
                                                value={podcast?.autheur}
                                            />
                                            {errors && errors?.autheur && <span className="text-red-500 text-sm">{errors.autheur}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="langue" className="text-white text-sm font-medium">Langue*</label>
                                        <div className="w-full md:w-2/3">
                                            <SelectSearch
                                                id="langue"
                                                name="langue"
                                                options={languesOptions}
                                                isMulti={false}
                                                defaultValue={podcast?.langue}
                                                onChange={handleSelectSearchChange}
                                                label="Selectionner une langue"
                                            />
                                            {errors && errors?.langue && <span className="text-red-500 text-sm">{errors.langue}</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="categories" className="text-white text-sm font-medium">Categories*</label>
                                        <div className="w-full md:w-2/3">
                                            <SelectSearch
                                                id="categories"
                                                name="categories"
                                                options={categoriesOptions}
                                                isMulti={true}
                                                defaultValue={podcast?.categories}
                                                onChange={handleSelectSearchChange}
                                                label="Selectionner une ou plusieurs categories"
                                            />
                                            {errors && errors?.categories && <span className="text-red-500 text-sm">{errors.categories}</span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="title" className="text-white text-sm font-medium">Statut</label>
                                        <select 
                                            className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="status" 
                                            id="status"
                                            value={podcast?.status || false}
                                            onChange={(e) => setPodcast({...podcast, status: e.target.value === "true"})}
                                        >
                                            <option value="true">Actif</option>
                                            <option value="false">Inactif</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="accessFree" className="text-white text-sm font-medium">Accès au podcast</label>
                                        <select 
                                            className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="accessFree" 
                                            id="accessFree"
                                            value={podcast?.accessFree || false}
                                            onChange={(e) => setPodcast({...podcast, accessFree: e.target.value === "true"})}
                                        >
                                            <option value="true">Gratuit</option>
                                            <option value="false">Payant</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:pr-12">
                            <div className="">
                                <h2 className="text-lg text-white font-medium">Poster et fichiers</h2>
                                <div className="flex flex-col gap-4 mt-4">

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="poster_path" className="text-white text-sm font-medium mt-3">Poster du podcast*</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader 
                                                id="poster_path"
                                                name="poster_path"
                                                accept="image/*"
                                                onFieldChange={handleFieldChange}
                                                fileUrl={podcast?.poster_path || ''}
                                            />
                                            {errors && errors?.poster_path && <span className="text-red-500 text-sm">{errors.poster_path}</span>}
                                            {
                                                podcast?.poster_path && podcast?.poster_path !== "" && (
                                                    <div className="h-12 mt-1 w-auto relative">
                                                        <Image
                                                            fill className="object-contain object-left"
                                                            alt={"poster_path de " + podcast?.name}
                                                            src={podcast?.poster_path}
                                                            sizes="(100vw - 2.5rem)"
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="streamLink" className="text-white text-sm font-medium">Lien de streaming*</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="streamLink" 
                                                id="streamLink"
                                                onChange={(e: any) => setPodcast({...podcast, streamLink: e.target.value})}
                                                value={podcast?.streamLink}
                                            />
                                            {errors && errors?.streamLink && <span className="text-red-500 text-sm">{errors.streamLink}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="fileLink" className="text-white text-sm font-medium mt-3">Fichier audio*</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader 
                                                id="fileLink"
                                                name="fileLink"
                                                accept="audio/*"
                                                onFieldChange={handleFieldChange}
                                                fileUrl={podcast?.fileLink || ''}
                                            />
                                            {errors && errors?.fileLink && <span className="text-red-500 text-sm">{errors.fileLink}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="backdrop_path" className="text-white text-sm font-medium mt-3">Backdrop*</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader 
                                                id="backdrop_path"
                                                name="backdrop_path"
                                                accept="image/*"
                                                onFieldChange={handleFieldChange}
                                                fileUrl={podcast?.backdrop_path || ''}
                                            />
                                            {errors && errors?.backdrop_path && <span className="text-red-500 text-sm">{errors.backdrop_path}</span>}
                                            {
                                                podcast?.backdrop_path && podcast?.backdrop_path !== "" && (
                                                    <div className="h-12 mt-1 w-auto relative">
                                                        <Image
                                                            fill className="object-contain object-left"
                                                            alt={"backdrop_path de " + podcast?.name}
                                                            src={podcast?.backdrop_path}
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
                                <button className="flex items-center space-x-2 bg-primary-900 px-4 py-2 rounded">
                                    <SaveIcon classes="h-4 text-white" />
                                    <span className="text-white text-xs font-semibold uppercase">Sauvegarder</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
