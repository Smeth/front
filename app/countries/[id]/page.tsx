"use client"

import S3FileUploader from "@components/elements/forms/S3FileUploader"
import SelectSearch from "@components/elements/forms/SelectSearch"
import TinyEditor from "@components/elements/forms/TinyEditor"
import { LeftArrowIcon, SaveIcon } from "@icons/MyTVIcons"
import axios from "@lib/axios"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function CountryPage({ params }: any) {
    const [errors, setErrors] = useState<any>(null)
    const [country, setCountry] = useState<any>({})

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/pays/' + params.id, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setCountry(response.data.Data)
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
                return response
            } catch (error: any) {
                if(error.response.status === 404) {
                    toast.error('Pays introuvable !')
                    router.push('/pays')
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
        setCountry({
            ...country,
            [fieldName]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { name, isoCode, countryFlag, countryCode }: any = e.currentTarget
        
        const data = {
            name: name.value,
            isoCode: isoCode.value,
            countryFlag: countryFlag.value,
            countryCode: countryCode.value
        }

        try {
            const res = await axios.put('/admin/pays/update/' + params.id, data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 200) {
                toast.success('Pays mis à jour avec succès!')
                return router.push('/countries')
            }
        } catch (error: any) {
            if(error.response.status === 409) {
                setErrors({ ...errors, global: error.response.data.Data })
                toast.error(error.response.data.Data)
            }
            else if (error.response.status === 400) {
                setErrors({ ...errors, ...error.response.data.Data })
            } 
            else if(error.response.status === 403) {
                toast.error("Votre token d'accès a expiré. Veuillez vous déconnecter et vous connecter à nouveau.")
                setErrors({ ...errors, global: "Votre token d’accès a expiré. Veuillez vous déconnecter et vous connecter à nouveau." })
            }
            else if(error.code === "ERR_NETWORK") {
                toast.error('Une erreur est survenue. Veuillez verifier votre connexion internet !')
                setErrors({ ...errors, global: "Une erreur est survenue. Veuillez verifier votre connexion internet !" })
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
                <Link href="/countries" className="inline-flex items-center space-x-1">
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
                                <h2 className="text-lg text-white font-medium">Informations sur le pays</h2>
                                <div className="mt-8 flex flex-col gap-4">

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="name" className="text-white text-sm font-medium">Nom du pays*</label>
                                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="name" 
                                                id="name"
                                                onChange={(e: any) => setCountry({...country, name: e.target.value})}
                                                value={country?.name}
                                            />
                                            {errors && errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="isoCode" className="text-white text-sm font-medium">Code ISO</label>
                                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="isoCode" 
                                                id="isoCode"
                                                onChange={(e: any) => setCountry({...country, isoCode: e.target.value})}
                                                value={country?.isoCode}
                                            />
                                            {errors && errors?.isoCode && <span className="text-red-500 text-sm">{errors.isoCode}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="countryCode" className="text-white text-sm font-medium">Indicatif</label>
                                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="countryCode" 
                                                id="countryCode"
                                                onChange={(e: any) => setCountry({...country, countryCode: e.target.value})}
                                                value={country?.countryCode}
                                            />
                                            {errors && errors?.countryCode && <span className="text-red-500 text-sm">{errors.countryCode}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="countryFlag" className="text-white text-sm font-medium mt-3">Drapeau*</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader 
                                                id="countryFlag"
                                                name="countryFlag"
                                                accept="image/*"
                                                onFieldChange={handleFieldChange}
                                                fileUrl={country?.countryFlag || ''}
                                            />
                                            {errors && errors?.countryFlag && <span className="text-red-500 text-sm">{errors.countryFlag}</span>}
                                            {
                                                country?.countryFlag && country?.countryFlag !== "" && (
                                                    <div className="h-12 mt-1 w-auto relative">
                                                        <Image
                                                            fill className="object-contain object-left"
                                                            alt={"countryFlag de " + country?.name}
                                                            src={country?.countryFlag}
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
