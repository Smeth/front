"use client"

import S3FileUploader from "@components/elements/forms/S3FileUploader"
import SelectSearch from "@components/elements/forms/SelectSearch"
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
import SwitchRadio from "@components/elements/forms/SwitchRadio"

export default function EditChanel({ params }: any) {
    const [isLoading, setIsLoading] = useState(true)
    const [chanel, setChanel] = useState<any>({})
    const [errors, setErrors] = useState<any>(null)
    const [categoriesOptions, setCategoriesOptions] = useState<any[]>([])
    const [countriesOptions, setCoutriesOptions] = useState<any[]>([])
    const [languesOptions, setLanguesOptions] = useState<any[]>([])
    
    const router = useRouter()

    const { data: session } = useSession()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/ressources/all?resources=cat_radio_live,pays,langues', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    for (const item of response.data.Data) {
                        if (item.pays) {
                            setCoutriesOptions(item.pays.map((country: any) => ({ label: country.name, value: country.idPays })))
                        }
                        else if (item.cat_radio_live) {
                            setCategoriesOptions(item.cat_radio_live.map((cat: any) => ({ label: cat.name, value: cat.idcat })))
                        }
                        else if (item.langues) {
                            setLanguesOptions(item.langues.map((lang: any) => ({ label: lang.name, value: lang.idlang })))
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
                const response = await axios.get('/admin/tv/' + params.id, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setIsLoading(false)
                    setChanel({
                        ...response.data.Data,
                        idcategories: response.data.Data.idcategories.map((id: any) => categoriesOptions.find((cat: any) => cat.value === id)),
                        country: response.data.Data.country.map((id: any) => countriesOptions.find((opt: any) => opt.value === id)),
                    })
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
                return response
            } catch (error: any) {
                if(error.response.status === 404) {
                    toast.error('Chaine introuvable !')
                    router.push('/tv')
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
        setChanel({
            ...chanel,
            [fieldName]: value
        })
    }

    const handleSelectSearchChange = (newValue: any, actionMeta: any) => {
        setChanel({
            ...chanel,
            [actionMeta.name]: newValue.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { name, overview, tvLogo_path, status, tvEmbedCode, country, accessFree, svr1_url, svr2_url, svr3_url }: any = e.currentTarget
        
        const data = {
            name: name.value,
            idcategories: getFieldArrayValue(e, 'idcategories'),
            overview: overview.value,
            tvLogo_path: tvLogo_path.value,
            status: status.value,
            tvEmbedCode: tvEmbedCode.value,
            country: getFieldArrayValue(e, 'country'),
            langue: getFieldArrayValue(e, 'langue'),
            accessFree: accessFree.value,
            svr1_url: svr1_url.value,
            svr2_url: svr2_url.value,
            svr3_url: svr3_url.value
        }

        try {
            const res = await axios.put('/admin/tv/update/' + params.id, data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 200) {
                toast.success('Chaine mise à jour avec succès!')
                return router.push('/tv')
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
                <Link href="/tv" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                {errors && errors?.global && (<div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30 mb-4">
                    <p className="text-primary-700 text-sm">{errors.global}</p>
                </div>)}
                <div className="mt-4">
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 my-3 gap-4 md:gap-12">
                        <div className="">
                            <h2 className="text-lg text-white font-medium">Informations de la chaine live</h2>
                            <div className="mt-8 flex flex-col gap-4">
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="name" className="text-white text-sm font-medium">Nom de la chaine live*</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="name" 
                                            id="name"
                                            onChange={(e: any) => setChanel({...chanel, name: e.target.value})}
                                            value={chanel?.name}
                                        />
                                        {errors && errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                    </div>
                                </div>
                                <div className="">
                                    <label htmlFor="overview" className="text-white text-sm font-medium">Description</label>
                                    <div className="w-full my-3 h-72">
                                        <TinyEditor 
                                            defaultValue={chanel?.overview || ''}
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
                                        value={chanel?.accessFree || false}
                                        onChange={(e) => setChanel({...chanel, accessFree: e.target.value === "true"})}
                                    >
                                        <option value="true">Gratuit</option>
                                        <option value="false">Payant</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="idcategories" className="text-white text-sm font-medium">Categorie*</label>
                                    <div className="w-full md:w-2/3">
                                        <SelectSearch
                                            id="idcategories"
                                            name="idcategories"
                                            options={categoriesOptions}
                                            isMulti={true}
                                            defaultValue={chanel?.idcategories || null}
                                            onChange={handleSelectSearchChange}
                                            label="Selectionner une categorie"
                                        />
                                        {errors && errors?.idcategories && <span className="text-red-500 text-sm">{errors.idcategories}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between space-x-4 py-2">
                                    <div className="flex flex-col">
                                        <label htmlFor="status" className="text-white text-sm font-medium">Statut</label>
                                    </div>
                                    <div className="w-full md:w-2/3">
                                        <SwitchRadio 
                                            active={chanel?.status || false}
                                            label1="Actif"
                                            label2="Inactif"
                                            name="status"
                                            id="status"
                                            onFieldChange={handleFieldChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="country" className="text-white text-sm font-medium">Pays*</label>
                                    <div className="w-full md:w-2/3">
                                        <SelectSearch
                                            id="country"
                                            name="country"
                                            options={countriesOptions}
                                            isMulti={false}
                                            defaultValue={chanel?.country || null}
                                            onChange={handleSelectSearchChange}
                                            label="Selectionner un pays"
                                        />
                                        {errors && errors?.country && <span className="text-red-500 text-sm">{errors.country}</span>}
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
                                            defaultValue={chanel?.langue || null}
                                            onChange={handleSelectSearchChange}
                                            label="Selectionner une langue"
                                        />
                                        {errors && errors?.langue && <span className="text-red-500 text-sm">{errors.langue}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="md:pr-12">
                            <div className="py-4 flex flex-col gap-4 border-b border-dark-500">
                                <h2 className="text-lg text-white font-medium">Logo et URL</h2>
                                
                                <div className="flex justify-between space-x-4">
                                    <label htmlFor="tvLogo_path" className="text-white text-sm font-medium mt-3">Logo de la chaine*</label>
                                    <div className="w-full md:w-2/3">
                                        <S3FileUploader 
                                            id="tvLogo_path"
                                            name="tvLogo_path"
                                            accept="image/*"
                                            onFieldChange={handleFieldChange}
                                            fileUrl={chanel?.tvLogo_path || ''}
                                        />
                                        {errors && errors?.tvLogo_path && <span className="text-red-500 text-sm">{errors.tvLogo_path}</span>}
                                        {
                                            chanel?.tvLogo_path && chanel?.tvLogo_path !== "" && (
                                                <div className="h-12 mt-1 w-auto relative">
                                                    <Image
                                                        fill className="object-contain object-left"
                                                        alt={"tvLogo_path de " + chanel?.name}
                                                        src={chanel?.tvLogo_path}
                                                        sizes="(100vw - 2.5rem)"
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="svr1_url" className="text-white text-sm font-medium">Lien de streaming*</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="svr1_url" 
                                            id="svr1_url"
                                            onChange={(e: any) => setChanel({...chanel, svr1_url: e.target.value})}
                                            value={chanel?.svr1_url}
                                        />
                                        {errors && errors?.svr1_url && <span className="text-red-500 text-sm">{errors.svr1_url}</span>}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="svr2_url" className="text-white text-sm font-medium">Lien de streaming 2*</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="svr2_url" 
                                            id="svr2_url"
                                            onChange={(e: any) => setChanel({...chanel, svr2_url: e.target.value})}
                                            value={chanel?.svr2_url}
                                        />
                                        {errors && errors?.svr2_url && <span className="text-red-500 text-sm">{errors.svr2_url}</span>}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="svr3_url" className="text-white text-sm font-medium">Lien de streaming 3*</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="svr3_url" 
                                            id="svr3_url"
                                            onChange={(e: any) => setChanel({...chanel, svr3_url: e.target.value})}
                                            value={chanel?.svr3_url}
                                        />
                                        {errors && errors?.svr3_url && <span className="text-red-500 text-sm">{errors.svr3_url}</span>}
                                    </div>
                                </div>

                                <div className="flex justify-between space-x-4">
                                    <label htmlFor="tvEmbedCode" className="text-white text-sm font-medium">Code embed</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <textarea
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="tvEmbedCode"
                                            id="tvEmbedCode"
                                            value={chanel?.tvEmbedCode || ''}
                                            onChange={e => handleFieldChange(e.target.name, e.target.value)}
                                            rows={4}
                                        ></textarea>
                                        {errors && errors?.tvEmbedCode && <span className="text-red-500 text-sm">{errors.tvEmbedCode}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button className="flex items-center space-x-2 bg-primary-900 px-4 py-2 rounded" type="submit">
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
