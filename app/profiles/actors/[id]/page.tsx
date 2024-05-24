"use client"

import DatePickerComponent from "@components/elements/forms/DatePicker"
import S3FileUploader from "@components/elements/forms/S3FileUploader"
import SelectSearch from "@components/elements/forms/SelectSearch"
import { LeftArrowIcon, SaveIcon } from "@icons/MyTVIcons"
import axios from "@lib/axios"
import { dateToInputDate, formatDate, getFieldArrayValue } from "@utils/utilities"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Image from 'next/image'

export default function EditActorPage({ params }: any) {
    const [actor, setActor] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>({})

    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/acteurs/' + params.id, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setActor({ ...response.data.Data, dob: formatDate(response.data.Data.dob) })
                    // console.log(formatDate(response.data.Data.dob))
                    setIsLoading(false)
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
                if(error.response.status === 404) {
                    toast.error('Acteur introuvable !')
                    router.push('/profiles/actors')
                }
                else if(error.response.status === 403) {
                    toast.error("Votre token d'accès a expiré. Veuillez vous déconnecter et vous connecter à nouveau.")
                    setErrors({ ...errors, global: "Votre token d’accès a expiré. Veuillez vous déconnecter et vous connecter à nouveau." })
                }
                else if(error.code === "ERR_NETWORK") {
                    toast.error('Une erreur est survenue. Veuillez verifier votre connexion internet !')
                    setErrors({ ...errors, global: "Une erreur est survenue. Veuillez verifier votre connexion internet !" })
                } 
            }
        }
        session?.token ? fetchData() : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, params.id, router])

    console.log('actor', actor)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setErrors({})
        setIsLoading(true)
        e.preventDefault()

        const { fistName, lastName, dob, biography, imageUrl }: any = e.currentTarget
        
        const data = {
            fistName: fistName.value,
            lastName: lastName.value,
            dob: dob.value,
            biography: biography.value,
            imageUrl: imageUrl.value,
            pays: getFieldArrayValue(e, 'pays'),
        }


        try {
            const res = await axios.put('/admin/acteurs/update/' + params.id, data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 200) {
                toast.success('Acteur mis à jour avec succès!')
                return router.push('/profiles/actors')
            }
        } catch (error: any) {
            setIsLoading(false)
            if(error.response.status === 409) {
                setErrors({ ...errors, global: error.response.data.Data })
            }
            else if (error.response.status === 400) {
                setErrors({ ...errors, ...error.response.data.Data })
            }
        }
    }

    const handleFieldChange = (fieldName: string, value: string) => {
        setActor({
            ...actor,
            [fieldName]: value
        })
    }

    const handleSelectSearchChange = (newValue: any, actionMeta: any) => {
        setActor({
            ...actor,
            [actionMeta.name]: newValue.value
        })
    }

    return (
        <div className="w-full">
            <div className="w-full bg-dark-800 rounded p-5">
                <Link href="/profiles/actors" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                <div className="h-40 w-40 border-4 bg-dark-700 rounded relative overflow-hidden mt-2">
                    {actor?.imageUrl && (<Image 
                        fill className="object-cover"
                        src={actor.imageUrl}
                        sizes="(100vw - 2.5rem)"
                        alt="User Avatar"
                    />)}
                </div>
                {errors && errors?.global && (<div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30 mb-4">
                    <p className="text-primary-700 text-sm">{errors.global}</p>
                </div>)}
                <form onSubmit={handleSubmit} className="mt-4 mb-8">
                    <div className="md:pr-20">
                        {errors && errors?.global && <div className="text-red-500 text-sm">{errors.global}</div>}
                        <div className="">
                            <div className="mt-8 flex flex-col gap-4">
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="lastName" className="text-white text-sm font-medium">Nom</label>
                                    <input 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        type="text" 
                                        name="lastName" 
                                        id="lastName"
                                        onChange={(e: any) => setActor({ ...actor, lastName: e.target.value })}
                                        value={actor?.lastName || ''}
                                    />
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="fistName" className="text-white text-sm font-medium">Prénom</label>
                                    <input 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        type="text" 
                                        name="fistName" 
                                        id="fistName"
                                        onChange={(e: any) => setActor({ ...actor, fistName: e.target.value })}
                                        value={actor?.fistName || ''}
                                    />
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="imageUrl" className="text-white text-sm font-medium">Photo</label>
                                    <div className="w-full md:w-2/3">
                                        <S3FileUploader 
                                            name="imageUrl" 
                                            id="imageUrl" 
                                            accept="image/*"
                                            onFieldChange={handleFieldChange}
                                            fileUrl={actor?.imageUrl || ''}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="pays" className="text-white text-sm font-medium">Pays</label>
                                    <div className="w-full md:w-2/3">
                                        <SelectSearch
                                            id="pays"
                                            name="pays"
                                            options={[
                                                {
                                                    label: 'Congo-Brazzaville',
                                                    value: 1,
                                                },
                                                {
                                                    label: 'France',
                                                    value: 2
                                                },
                                                {
                                                    label: 'Etat-Unis',
                                                    value: 3
                                                }
                                            ]}
                                            isMulti={false}
                                            defaultValue={actor?.pays || null}
                                            onChange={handleSelectSearchChange}
                                            label="Selectionner un pays"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="dob" className="text-white text-sm font-medium">DOB</label>
                                    <div className="flex flex-col w-full md:w-2/3">
                                        <DatePickerComponent
                                            defaultValue={actor?.dob}
                                            onFieldChange={handleFieldChange}
                                            name="dob"
                                            id="dob"
                                        />
                                        {errors.dob && <span className="text-red-500 text-sm mt-1">{errors.dob}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="biography" className="text-white text-sm font-medium">Biographie</label>
                                    <div className="flex flex-col w-full md:w-2/3">
                                        <textarea
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="biography"
                                            id="biography"
                                            rows={4}
                                            onChange={(e: any) => setActor({ ...actor, biography: e.target.value })}
                                            value={actor?.biography || ''}
                                        ></textarea>
                                        {errors.biography && <span className="text-red-500 text-sm mt-1">{errors.biography}</span>}
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button type="submit" className="flex items-center space-x-2 bg-primary-900 px-4 py-2 rounded">
                                        <SaveIcon classes="h-4 text-white" />
                                        <span className="text-white text-xs font-semibold uppercase">Sauvegarder</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
