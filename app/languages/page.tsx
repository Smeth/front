"use client"

import LanguageCard from "@components/cards/LanguageCard"
import Modal from "@components/common/Modal"
import Pagination from "@components/common/Pagination"
import Tooltip from "@components/common/Tooltip"
import S3FileUploader from "@components/elements/forms/S3FileUploader"
import { PlusIcon, TimesIcon } from "@icons/MyTVIcons"
import axios from "@lib/axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Image from 'next/image'

import Popup from 'reactjs-popup'
import PlaceholderShortCards from "@components/common/PlaceholderShortCards"

export default function Languages() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [open, setOpen] = useState<boolean>(false)
    const [langues, setLangues] = useState<any[]>([])
    const [currentLang, setCurrentLang] = useState<any>({})
    const [errors, setErrors] = useState<any>(null)

    const [currentPage, setCurrentPage] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(12)
    const [totalPages, setTotalPages] = useState<number>(0)

    const closeModal = () => {
        setOpen(false)
        setCurrentLang({})
    }

    const { data: session, update } = useSession()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/langs/all/?page='+currentPage+'&size='+pageSize+'&sort=name', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setIsLoading(false)
                    setLangues(response.data.Data.content)
                    setTotalPages(response.data.Data.totalPages)
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
                return response
            } catch (error: any) {
                if(error.response.status === 409) {
                    setErrors({ ...errors, global: error.response.data.Data })
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
        session?.token ? fetchData() : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, currentPage, pageSize])

    const handleFieldChange = (fieldName: string, value: string) => {
        setCurrentLang({
            ...currentLang,
            [fieldName]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { name, flag_file, status }: any = e.currentTarget
        
        const data = {
            name: name.value,
            slug: name.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            flag_file: flag_file.value,
            status: status.value
        }

        try {
            const res = await axios.post('/admin/lang/create', data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
            
            if(res.status === 201) {
                closeModal()
                toast.success('Genre ajouté avec succès!')
                update({...session, status: 'success'})
            }
        } catch (error: any) {
            if(error.response.status === 409) {
                setErrors({ ...errors, global: error.response.data.Data })
            }
            else if (error.response.status === 400) {
                setErrors({ ...errors, ...error.response.data.Data })
            } 
            else if(error.response.status === 403) {
                toast.error("Votre token d'accès a expiré. Veuillez vous déconnecter et vous connecter à nouveau.")
                setErrors({ ...errors, global: "Votre token d’accès a expiré. Veuillez vous déconnecter et vous connecter à nouveau." })
            }
            else {
                setErrors({ ...errors, global: "Oops, quelque chose s'est mal passé. Veuillez rafraichir la page et réessayer" })
                toast.error("Oops, quelque chose s'est mal passé. Veuillez rafraichir la page et reessayer")
            }
        }

        
    }

    return (
        <div className="w-full  ">
            <div className="w-full bg-dark-800 rounded p-6">
                {errors && errors?.global && (<div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30 mb-4">
                    <p className="text-primary-700 text-sm">{errors.global}</p>
                </div>)}
                <div className="">
                    <Popup
                        trigger={open => (
                            <button className="flex items-center space-x-2 bg-secondary-900 py-1.5 px-2 rounded" onClick={() => setOpen(true)}>
                                <PlusIcon classes="h-3.5 text-white" />
                                <span className="text-white text-sm font-semibold">Ajouter une langue</span>
                            </button>
                        )}
                        position="top center"
                        on={['hover', 'focus']}
                    >
                        <Tooltip title="Ajouter une langue" />
                    </Popup>

                    <Modal isOpen={open} onClose={closeModal}>
                        <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-dark-800 border border-dark-700">
                            <div className="flex justify-between p-4 border-b border-dark-700">
                                <h2 className="text-white font-bold text-lg pt-1">Ajouter une langue</h2>
                                <button onClick={closeModal} type="button">
                                    <TimesIcon classes="text-grey-200 h-6" />
                                </button>
                            </div>
                            <div className="p-4 flex flex-col space-y-4 border-b border-dark-700">
                                {errors && errors?.global && <div className="text-red-500 text-sm">{errors.global}</div>}
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="name" className="text-white text-sm font-medium">Nom</label>
                                    <div className="w-full md:w-72 flex flex-col">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                                            type="text" 
                                            name="name" 
                                            id="name"
                                        />
                                        {errors && errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="flag_file" className="text-white text-sm font-medium">Drapeau</label>
                                    <div className="w-full md:w-72">
                                        <S3FileUploader 
                                            name="flag_file" 
                                            id="flag_file" 
                                            accept="image/*"
                                            onFieldChange={handleFieldChange}
                                        />
                                        {errors && errors?.flag_file && <span className="text-red-500 text-sm">{errors.flag_file}</span>}
                                        {
                                            currentLang?.flag_file && currentLang?.flag_file !== "" && (
                                                <div className="h-12 mt-1 w-auto relative">
                                                    <Image
                                                        fill className="object-contain object-left"
                                                        alt={"drapeau " + currentLang?.name}
                                                        src={currentLang?.flag_file}
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
                                        className="w-full md:w-72 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                                        name="status" 
                                        id="status"
                                        value={currentLang?.status}
                                        onChange={(e) => setCurrentLang({...currentLang, status: e.target.value === "true"})}
                                    >
                                        <option value="false">Inactif</option>
                                        <option value="true">Actif</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end p-4">
                                <button className="flex items-center space-x-2 bg-primary-900 py-1.5 px-2 rounded" type="submit"> 
                                    <span className="text-white text-sm font-semibold">Enregistrer</span>
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className={"grid gap-6 my-6 " + (!isLoading && langues.length === 0 ? " grid-cols-1" : "grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6")}>
                    {!isLoading && langues.length > 0 && langues?.map((langue: any, i: number) => (
                        <LanguageCard
                            key={i}
                            title={langue?.name}
                            flag={langue?.flag_file}
                            active={langue?.status}
                            id={langue?.idLang}
                        />
                    ))}
                    {!isLoading && langues.length === 0 && (
                        <div className="w-full bg-black py-6">
                            <p className="text-white text-center font-medium p-6">
                                {"Aucune langue n'a encore été ajoutée, "}
                                <button className="" onClick={() => setOpen(true)}>
                                    <span className="font-semibold underline text-blue-500">ajoutez-en !</span>
                                </button>
                            </p>
                        </div>
                    )}
                    {isLoading && <PlaceholderShortCards nbCards={pageSize} />}
                </div>

                {!isLoading && totalPages > 1 && 
                <Pagination 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />}
            
            </div>
        </div>
    )
}
