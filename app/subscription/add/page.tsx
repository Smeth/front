"use client"

import SwitchRadio from "@components/elements/forms/SwitchRadio"
import TinyEditor from "@components/elements/forms/TinyEditor"
import { LeftArrowIcon, SaveIcon } from "@icons/MyTVIcons"
import axios from "@lib/axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export default function AddSubscriptionPage() {
    const [plan, setPlan] = useState<any>({})
    const [errors, setErrors] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleFieldChange = (fieldName: string, value: string) => {
        setPlan({
            ...plan,
            [fieldName]: value
        })
    }

    const router = useRouter()
    const { data: session } = useSession()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { name, price, deviceLimit, nbMonth, ads, status }: any = e.currentTarget
        
        const data = {
            name: name.value,
            price: price.value,
            deviceLimit: deviceLimit.value,
            nbMonth: nbMonth.value,
            status: status.value,
            ads: ads.value
        }

        try {
            const res = await axios.post('/admin/subscriptionTypes/create', data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 201) {
                toast.success("Plan d'abonnement ajouté avec succès!")
                return router.push('/subscription')
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
                <Link href="/subscription" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                {errors && errors?.global && (<div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30 mb-4">
                    <p className="text-primary-700 text-sm">{errors.global}</p>
                </div>)}
                <div className="mt-4 mb-8">
                    <div className="md:pr-20">
                        <form onSubmit={handleSubmit} className="">
                            <div className="mt-8 flex flex-col gap-4">
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="name" className="text-white text-sm font-medium">Nom du plan</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="name" 
                                            id="name"
                                            onChange={(e: any) => setPlan({...plan, name: e.target.value})}
                                            value={plan?.name}
                                        />
                                        {errors && errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="nbMonth" className="text-white text-sm font-medium">Durée</label>
                                    <div className="flex w-full md:w-2/3 space-x-1">
                                        <input 
                                            className="flex-1 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="number" 
                                            name="nbMonth" 
                                            id="nbMonth"
                                            placeholder="1"
                                            value={plan?.nbMonth || ''}
                                            onChange={(e) => setPlan({...plan, nbMonth: e.target.value})}
                                        />
                                        <div className="w-16 text-sm text-gray-100 flex items-center justify-center rounded bg-dark-700">
                                            Mois
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="price" className="text-white text-sm font-medium">Prix*</label>
                                    <div className="flex w-full md:w-2/3 space-x-1">
                                        <input 
                                            className="flex-1 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="number" 
                                            name="price" 
                                            id="price"
                                            placeholder="100"
                                            value={plan?.price || ''}
                                            onChange={(e) => setPlan({...plan, price: e.target.value})}
                                        />
                                        <div className="w-16 text-gray-100 flex items-center justify-center rounded bg-dark-700">
                                            $
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="deviceLimit" className="text-white text-sm font-medium">{"Limite d'appareil"}</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                                        name="deviceLimit" 
                                        id="deviceLimit"
                                        value={plan?.deviceLimit || 4}
                                        onChange={(e) => setPlan({...plan, deviceLimit: e.target.value})}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="status" className="text-white text-sm font-medium">Statut</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                                        name="status" 
                                        id="status"
                                        value={plan?.status}
                                        onChange={(e) => setPlan({...plan, status: e.target.value === "true"})}
                                    >
                                        <option value="true">Actif</option>
                                        <option value="false">Inactif</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="ads" className="text-white text-sm font-medium">Publicités ?</label>
                                    <div className="w-full md:w-2/3">
                                        <SwitchRadio 
                                            active={plan?.ads || true}
                                            label1="Oui"
                                            label2="Non"
                                            name="ads"
                                            id="ads"
                                            onFieldChange={handleFieldChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
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
        </div>
    )
}
