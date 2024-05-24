"use client"

import DatePickerComponent from "@components/elements/forms/DatePicker"
import S3FileUploader from "@components/elements/forms/S3FileUploader"
import { LeftArrowIcon, SaveIcon } from "@icons/MyTVIcons"
import axios from "@lib/axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export default function AddUserPage() {
    const [user, setUser] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>({})

    const router = useRouter()
    const { data: session } = useSession()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setErrors({})
        setIsLoading(true)
        e.preventDefault()
        return router.push('/banner_ads')

        const { username, email, phone, password, imageUrl }: any = e.currentTarget
        
        const data = {
            username: username.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            imageUrl: imageUrl.value,
        }

        try {
            const res = await axios.post('/auth/abonne-register', data)
    
            if(res.status === 201) {
                toast.success('Utilisateur ajouté avec succès!')
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
                <Link href="/banner_ads" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                <form onSubmit={handleSubmit} className="mt-4 mb-8">
                    <div className="md:pr-20">
                        {errors && errors?.global && <div className="text-red-500 text-sm">{errors.global}</div>}
                        <div className="">
                            <div className="mt-8 flex flex-col gap-4">
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="name" className="text-white text-sm font-medium">Titre de la bannière</label>
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
                                    <label htmlFor="link" className="text-white text-sm font-medium">Lien de rédirection</label>
                                    <input 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        type="text" 
                                        name="link" 
                                        id="link"
                                        onChange={(e: any) => setUser({ ...user, link: e.target.value })}
                                        value={user?.link || ''}
                                    />
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="imageUrl" className="text-white text-sm font-medium">Image</label>
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
