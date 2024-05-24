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

export default function EditPodcastCollectionPage({ params }: any) {
    const [errors, setErrors] = useState<any>(null)
    const [collection, setCollection] = useState<any>({})

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/podcast/collections/' + params.id, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setCollection(response.data.Data)
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
                return response
            } catch (error: any) {
                if(error.response.status === 404) {
                    toast.error('Podcast introuvable !')
                    router.push('/podcasts')
                }
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
    }, [session, params.id, router])

    const handleFieldChange = (fieldName: string, value: string) => {
        setCollection({
            ...collection,
            [fieldName]: value
        })
    }

    const handleSelectSearchChange = (newValue: any, actionMeta: any) => {
        setCollection({
            ...collection,
            [actionMeta.name]: newValue.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { name, overview, cover, status }: any = e.currentTarget
        
        const data = {
            name: name.value,
            overview: overview.value,
            cover: cover.value,
            status: status.value,
        }

        console.log('data', data)

        try {
            const res = await axios.put('/admin/podcast/collections/update/' + params.id, data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 200) {
                toast.success('Collection mis à jour avec succès!')
                return router.push('/podcasts/collections')
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
                <Link href="/podcasts/collections" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                {errors && errors?.global && (<div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30 mb-4">
                    <p className="text-primary-700 text-sm">{errors.global}</p>
                </div>)}
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="grid grid-cols-2 my-3 gap-4 md:gap-12">
                        <div className="">
                            <div className="">
                                <h2 className="text-lg text-white font-medium">Informations sur la collection</h2>
                                <div className="mt-8 flex flex-col gap-4">

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="name" className="text-white text-sm font-medium">Titre de la collection*</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="name" 
                                                id="name"
                                                onChange={(e: any) => setCollection({...collection, name: e.target.value})}
                                                value={collection?.name}
                                            />
                                            {errors && errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                        </div>
                                    </div>

                                    <div className="">
                                        <label htmlFor="overview" className="text-white text-sm font-medium">Description</label>
                                        <div className="w-full my-3 h-72">
                                            <TinyEditor 
                                                defaultValue={collection?.overview || ''}
                                                id="overview"
                                                name="overview"
                                                onFieldChange={handleFieldChange}
                                            />
                                            {errors && errors?.overview && <span className="text-red-500 text-sm">{errors.overview}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="cover" className="text-white text-sm font-medium mt-3">Poster*</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader 
                                                id="cover"
                                                name="cover"
                                                accept="image/*"
                                                onFieldChange={handleFieldChange}
                                                fileUrl={collection?.cover || ''}
                                            />
                                            {errors && errors?.cover && <span className="text-red-500 text-sm">{errors.cover}</span>}
                                            {
                                                collection?.cover && collection?.cover !== "" && (
                                                    <div className="h-12 mt-1 w-auto relative">
                                                        <Image
                                                            fill className="object-contain object-left"
                                                            alt={"cover de " + collection?.name}
                                                            src={collection?.cover}
                                                            sizes="(100vw - 2.5rem)"
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="status" className="text-white text-sm font-medium">Statut</label>
                                        <select 
                                            className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="status" 
                                            id="status"
                                            value={collection?.status || false}
                                            onChange={(e) => setCollection({...collection, status: e.target.value === "true"})}
                                        >
                                            <option value="true">Actif</option>
                                            <option value="false">Inactif</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:pr-12">
                            {/* <div className="">
                                <h2 className="text-lg text-white font-medium">Poster et fichiers</h2>
                                
                            </div> */}

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
