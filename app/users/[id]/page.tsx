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

export default function AddUserPage({ params }: any) {
    const [user, setUser] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>({})

    const router = useRouter()

    const { data: session } = useSession()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/users/' + params.id, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setUser(response.data.Data)
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
                setIsLoading(false)
            }
        }
        session?.token ? fetchData() : null
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
            imageUrl: imageUrl.value,
        }

        try {
            const res = await axios.post('/admin/users/update/' + params.id, data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 200) {
                toast.success('Utilisateur Modifié avec succès!')
                return router.push('/users')
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
        setUser({
            ...user,
            [fieldName]: value
        })
    }
    return (
        <div className="w-full">
            <div className="w-full bg-dark-800 rounded p-5">
                <Link href="/users" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                <form onSubmit={handleSubmit} className="mt-4 mb-8">
                    <div className="md:pr-20">
                        {errors && errors?.global && <div className="text-red-500 text-sm">{errors.global}</div>}
                        <div className="">
                            <div className="mt-8 flex flex-col gap-4">
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="name" className="text-white text-sm font-medium">Nom</label>
                                    <input 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        type="text" 
                                        name="name" 
                                        id="name"
                                        onChange={(e: any) => setUser({ ...user, name: e.target.value })}
                                        value={user?.name || ''}
                                    />
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="fname" className="text-white text-sm font-medium">Prénom</label>
                                    <input 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        type="text" 
                                        name="fname" 
                                        id="fname"
                                        onChange={(e: any) => setUser({ ...user, fname: e.target.value })}
                                        value={user?.fname || ''}
                                    />
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
                                            onChange={(e: any) => setUser({ ...user, username: e.target.value })}
                                            value={user?.username || ''}
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
                                            onChange={(e: any) => setUser({ ...user, email: e.target.value })}
                                            value={user?.email || ''}
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
                                            onChange={(e: any) => setUser({ ...user, password: e.target.value })}
                                            value={user?.password || ''}
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
                                            onChange={(e: any) => setUser({ ...user, phone: e.target.value })}
                                            value={user?.phone || ''}
                                        />
                                        {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                <label htmlFor="address" className="text-white text-sm font-medium">Adresse</label>
                                    <input 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        type="text" 
                                        name="address" 
                                        id="address"
                                        onChange={(e: any) => setUser({ ...user, address: e.target.value })}
                                        value={user?.address || ''}
                                    />
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="imageUrl" className="text-white text-sm font-medium">Avatar</label>
                                    <div className="w-full md:w-2/3">
                                        <S3FileUploader 
                                            name="imageUrl" 
                                            id="imageUrl" 
                                            accept="image/*"
                                            onFieldChange={handleFieldChange}
                                            fileUrl={user?.imageUrl || ''}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="access" className="text-white text-sm font-medium">{"Plan d'abonnement"}</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="access" 
                                        id="access"
                                        onChange={(e: any) => setUser({ ...user, access: e.target.value })}
                                    >
                                        <option value="paid">Payant</option>
                                        <option value="free">Gratuit</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="status" className="text-white text-sm font-medium">Statut</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="status" 
                                        id="status"
                                        onChange={(e: any) => setUser({ ...user, status: e.target.value })}
                                    >
                                        <option value="active">Actif</option>
                                        <option value="inactive">Inactif</option>
                                    </select>
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
