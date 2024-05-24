"use client"

import DatePickerComponent from "@components/elements/forms/DatePicker"
import S3FileUploader from "@components/elements/forms/S3FileUploader"
import SelectSearch from "@components/elements/forms/SelectSearch"
import SwitchRadio from "@components/elements/forms/SwitchRadio"
import TinyEditor from "@components/elements/forms/TinyEditor"
import { LeftArrowIcon, SaveIcon } from "@icons/MyTVIcons"
import axios from "@lib/axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Image from 'next/image'
import { getFieldArrayValue } from "@utils/utilities"

export default function RadioPage({ params }: any) {
    const [isLoading, setIsLoading] = useState(true)
    const [radio, setRadio] = useState<any>({})
    const [errors, setErrors] = useState<any>(null)
    const [categoriesOptions, setCategoriesOptions] = useState<any[]>([])
    const [languesOptions, setLanguesOptions] = useState<any[]>([])
    const [countriesOptions, setCountriesOptions] = useState<any[]>([])

    const router = useRouter()

    const { data: session, update } = useSession()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/ressources/all?resources=cat_radio_live,langues,pays', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    for (const item of response.data.Data) {
                        if (item.cat_radio_live) {
                            setCategoriesOptions(item.cat_radio_live.map((cat: any) => ({ label: cat.name, value: cat.idcat })))
                        }
                        else if (item.langues) {
                            setLanguesOptions(item.langues.map((lang: any) => ({ label: lang.name, value: lang.idLang })))
                        }
                        else if (item.pays) {
                            setCountriesOptions(item.pays.map((country: any) => ({ label: country.name, value: country.idPays })))
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
                const response = await axios.get('/admin/radios/' + params.id, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setIsLoading(false)
                    setRadio({
                        ...response.data.Data,
                        langue: [languesOptions.find((l: any) => l.value === response.data.Data.langue[0])],
                        country: [countriesOptions.find((c: any) => c.value === response.data.Data.country[0])],
                        categories: response.data.Data.categories.map((id: number) => categoriesOptions.find((g: any) => g.value === id))
                    })
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
                return response
            } catch (error: any) {
                if(error.response.status === 404) {
                    toast.error('Radio introuvable !')
                    router.push('/radios')
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
    }, [session, params.id, router, countriesOptions, categoriesOptions, languesOptions])

    const handleFieldChange = (fieldName: string, value: string) => {
        setRadio({
            ...radio,
            [fieldName]: value
        })
    }

    const handleSelectSearchChange = (newValue: any, actionMeta: any) => {
        setRadio({
            ...radio,
            [actionMeta.name]: newValue.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { name, overview, backdrop_path, logo_path, status, streamLink, accessFree }: any = e.currentTarget
        
        const data = {
            name: name.value,
            categories: getFieldArrayValue(e, 'categories'),
            overview: overview.value,
            backdrop_path: backdrop_path.value,
            logo_path: logo_path.value,
            status: status.value,
            streamLink: streamLink.value,
            country: getFieldArrayValue(e, 'country'),
            langue: getFieldArrayValue(e, 'langue'),
            accessFree: accessFree.value
        }

        console.log('data', data)

        try {
            const res = await axios.put('/admin/radios/update/' + params.id, data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 200) {
                toast.success('Radio mis à jour avec succès!')
                return router.push('/radios')
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
                <Link href="/radios" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                {errors && errors?.global && (<div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30 mb-4">
                    <p className="text-primary-700 text-sm">{errors.global}</p>
                </div>)}
                <div className="mt-4">
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 my-3 gap-4 md:gap-12">
                        <div className="">
                            <h2 className="text-lg text-white font-medium">Informations de la chaine radio</h2>
                            <div className="mt-8 flex flex-col gap-4">
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="name" className="text-white text-sm font-medium">Nom de la chaine radio*</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="name" 
                                            id="name"
                                            onChange={(e: any) => setRadio({...radio, name: e.target.value})}
                                            value={radio?.name}
                                        />
                                        {errors && errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                    </div>
                                </div>
                                <div className="">
                                    <label htmlFor="overview" className="text-white text-sm font-medium">Description</label>
                                    <div className="w-full my-3 h-72">
                                        <TinyEditor 
                                            defaultValue={radio?.overview || ''}
                                            id="overview"
                                            name="overview"
                                            onFieldChange={handleFieldChange}
                                        />
                                        {errors && errors?.overview && <span className="text-red-500 text-sm">{errors.overview}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="accessFree" className="text-white text-sm font-medium">Accès à la chaine</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="accessFree" 
                                        id="accessFree"
                                        value={radio?.accessFree || false}
                                        onChange={(e) => setRadio({...radio, accessFree: e.target.value === "true"})}
                                    >
                                        <option value="true">Gratuit</option>
                                        <option value="false">Payant</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="langue" className="text-white text-sm font-medium">Langue*</label>
                                    <div className="w-full md:w-2/3">
                                        <SelectSearch
                                            id="langue"
                                            name="langue"
                                            options={languesOptions}
                                            isMulti={false}
                                            defaultValue={radio?.langue || null}
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
                                            defaultValue={radio?.categories || null}
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
                                        value={radio?.status || false}
                                        onChange={(e) => setRadio({...radio, status: e.target.value === "true"})}
                                    >
                                        <option value="true">Actif</option>
                                        <option value="false">Inactif</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="country" className="text-white text-sm font-medium">Pays*</label>
                                    <div className="w-full md:w-2/3">
                                        <SelectSearch
                                            id="country"
                                            name="country"
                                            options={countriesOptions}
                                            isMulti={false}
                                            defaultValue={radio?.country || null}
                                            onChange={handleSelectSearchChange}
                                            label="Selectionner un pays"
                                        />
                                        {errors && errors?.country && <span className="text-red-500 text-sm">{errors.country}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="md:pr-12">
                            <div className="py-4 flex flex-col gap-4 border-b border-dark-500">
                                <h2 className="text-lg text-white font-medium">Logo et URL</h2>
                                
                                <div className="flex justify-between space-x-4">
                                    <label htmlFor="logo_path" className="text-white text-sm font-medium mt-3">Logo de la chaine*</label>
                                    <div className="w-full md:w-2/3">
                                        <S3FileUploader 
                                            id="logo_path"
                                            name="logo_path"
                                            accept="image/*"
                                            onFieldChange={handleFieldChange}
                                            fileUrl={radio?.logo_path || ''}
                                        />
                                        {errors && errors?.logo_path && <span className="text-red-500 text-sm">{errors.logo_path}</span>}
                                        {
                                            radio?.logo_path && radio?.logo_path !== "" && (
                                                <div className="h-12 mt-1 w-auto relative">
                                                    <Image
                                                        fill className="object-contain object-left"
                                                        alt={"logo_path de " + radio?.name}
                                                        src={radio?.logo_path}
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
                                            onChange={(e: any) => setRadio({...radio, streamLink: e.target.value})}
                                            value={radio?.streamLink}
                                        />
                                        {errors && errors?.streamLink && <span className="text-red-500 text-sm">{errors.streamLink}</span>}
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
                                            fileUrl={radio?.backdrop_path || ''}
                                        />
                                        {errors && errors?.backdrop_path && <span className="text-red-500 text-sm">{errors.backdrop_path}</span>}
                                        {
                                            radio?.backdrop_path && radio?.backdrop_path !== "" && (
                                                <div className="h-12 mt-1 w-auto relative">
                                                    <Image
                                                        fill className="object-contain object-left"
                                                        alt={"backdrop_path de " + radio?.name}
                                                        src={radio?.backdrop_path}
                                                        sizes="(100vw - 2.5rem)"
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button className="flex items-center space-x-2 bg-primary-900 px-4 py-2 rounded" type="submit">
                                    <SaveIcon classes="h-4 text-white" />
                                    <span className="text-white text-xs font-semibold uppercase">Sauvegarder</span>
                                </button>
                            </div>

                            {/* <h2 className="text-lg text-white font-medium mt-4">SEO</h2>
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="title" className="text-white text-sm font-medium">Meta title</label>
                                    <input 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        type="text" 
                                        name="title" 
                                        id="title"
                                    />
                                </div>
                                <div className="flex justify-between space-x-4">
                                    <label htmlFor="metaDescription" className="text-white text-sm font-medium">Meta description</label>
                                    <textarea
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="metaDescription"
                                        id="metaDescription"
                                        rows={4}
                                    ></textarea>
                                </div>
                                <div className="flex justify-between space-x-4">
                                    <label htmlFor="keywords" className="text-white text-sm font-medium">Mots clés</label>
                                    <textarea
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="keywords"
                                        id="keywords"
                                        rows={4}
                                    ></textarea>
                                </div>
                            </div>
                             */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
