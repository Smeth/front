"use client"

import DatePickerComponent from "@components/elements/forms/DatePicker"
import S3FileUploader from "@components/elements/forms/S3FileUploader"
import { LeftArrowIcon, SaveIcon } from "@icons/MyTVIcons"
import axios from "@lib/axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Image from 'next/image'

export default function AdminProfile({ params }: any) {
    const [profile, setProfile] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>({})

    const router = useRouter()

    const { data: session } = useSession()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/profil/info', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    console.log(response.data)
                    setProfile(response.data.Data)
                    setIsLoading(false)
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
                if(error.response.status === 404) {
                    toast.error('Utilisateur introuvable !')
                    router.push('/users')
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setErrors({})
        setIsLoading(true)
        e.preventDefault()

        const { username, email, phone, password, imageUrl }: any = e.currentTarget
        
        const data = {
            username: username.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            // imageUrl: imageUrl.value,
        }

        try {
            const res = await axios.post('/admin/profil/update', data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 200) {
                toast.success('Infos modifié avec succès!')
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
        setProfile({
            ...profile,
            [fieldName]: value
        })
    }
    return (
        <div className="w-full">
            <div className="w-full bg-dark-800 rounded p-5">
                <div className="h-40 w-40 border-4 bg-dark-700 rounded relative overflow-hidden">
                    {profile?.imageUrl && (<Image 
                        fill
                        src={profile.imageUrl}
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
                                    <label htmlFor="name" className="text-white text-sm font-medium">Nom</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="name" 
                                            id="name"
                                            onChange={(e: any) => setProfile({...profile, name: e.target.value})}
                                            value={profile?.name}
                                        />
                                        {errors && errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="fname" className="text-white text-sm font-medium">Prénom</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="fname" 
                                            id="fname"
                                            onChange={(e: any) => setProfile({...profile, fname: e.target.value})}
                                            value={profile?.fname}
                                        />
                                        {errors && errors?.fname && <span className="text-red-500 text-sm">{errors.fname}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="username" className="text-white text-sm font-medium">{"Nom d'utilisateur"}</label>
                                    <div className="flex flex-col w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="username" 
                                            id="username"
                                            required
                                            onChange={(e: any) => setProfile({ ...profile, username: e.target.value })}
                                            value={profile?.username || ''}
                                        />
                                        {errors.username && <span className="text-red-500 text-sm mt-1">{errors.username}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="email" className="text-white text-sm font-medium">Email</label>
                                    <div className="flex flex-col w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="email" 
                                            name="email" 
                                            id="email"
                                            required
                                            onChange={(e: any) => setProfile({ ...profile, email: e.target.value })}
                                            value={profile?.email || ''}
                                        />
                                        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="password" className="text-white text-sm font-medium">Nouveau mot de passe</label>
                                    <div className="flex flex-col w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="password" 
                                            name="password" 
                                            id="password"
                                            onChange={(e: any) => setProfile({ ...profile, password: e.target.value })}
                                            value={profile?.password || ''}
                                        />
                                        {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="phone" className="text-white text-sm font-medium">Téléphone</label>
                                    <div className="flex flex-col w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="number" 
                                            name="phone" 
                                            id="phone"
                                            required
                                            onChange={(e: any) => setProfile({ ...profile, phone: e.target.value })}
                                            value={profile?.phone || ''}
                                        />
                                        {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="imageUrl" className="text-white text-sm font-medium">Avatar</label>
                                    <div className="w-full md:w-2/3">
                                        <S3FileUploader 
                                            name="imageUrl" 
                                            id="imageUrl" 
                                            accept="image/*"
                                            onFieldChange={handleFieldChange}
                                            fileUrl={profile?.imageUrl || ''}
                                        />
                                        {errors.imageUrl && <span className="text-red-500 text-sm mt-1">{errors.imageUrl}</span>}
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
