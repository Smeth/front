"use client"

import Switcher from "@components/elements/forms/Switcher"
import { EditIcon, TimesIcon } from "@icons/MyTVIcons"
import { LanguageCardProps } from "@/types/cards"

import Popup from 'reactjs-popup'
import { useEffect, useState } from "react"
import Modal from "@components/common/Modal"
import Tooltip from "@components/common/Tooltip"
import Image from "next/image"
import { toast } from "react-toastify"
import axios from "@lib/axios"
import { useSession } from "next-auth/react"
import S3FileUploader from "@components/elements/forms/S3FileUploader"

const LanguageCard = ({ title, id, active, flag }: LanguageCardProps) => {
    const [langue, setLangue] = useState<any>({
        name: title,
        status: active,
    })
    
    useEffect(() => {
        setLangue((prev:any) => ({
            ...prev,
            flag
        }))
    }, [flag])
    const [errors, setErrors] = useState<any>(null)
    
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
    const [confirmIsOpen, setConfirmIsOpen] = useState<boolean>(false)
    const { data: session, update } = useSession()

    const closeEdit = () => {
        setEditIsOpen(false)
    }
    const closeConfirm = () => {
        setConfirmIsOpen(false)
    }

    const handleFieldChange = (fieldName: string, value: string) => {
        setLangue({
            ...langue,
            [fieldName]: value
        })
    }

    const handleDelete = async () => {
        const res = await axios.delete(`/admin/langs/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${session?.token}`
            }
        })

        if(res.status === 200 && res?.data) {
            closeConfirm()
            toast.success('Langue supprimé avec succès!')
            update({...session})
        }
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
            const res = await axios.put('/admin/lang/update/' + id, data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
            
            if(res.status === 200) {
                setLangue(res.data.Data)
                closeEdit()
                toast.success('Langue mis à jour avec succès!')
                update({...session})
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
        <div className="border border-dark-700 rounded-lg bg-dark-600/30 bg-plan-shape bg-no-repeat bg-bottom shadow-secondary p-4">
            <div className="pt-4 relative">
                <div className="w-16 h-16 rounded-full relative overflow-hidden opacity-50 -top-3.5 left-1/2 transform -translate-x-1/2">
                    {
                        flag && flag !== ""
                        ? (
                            <Image 
                                fill
                                className="object-cover object-center"
                                sizes="(100vw - 2.5rem)"
                                src={flag}
                                alt={"flag_file " + title}
                            />
                        )
                        : (
                            <div className="w-full h-full bg-secondary-900"></div>
                        )
                    }
                </div>
                <h2 className="text-white font-bold text-center text-2xl absolute top-4 left-0 right-0 mx-0 z-2">{title}</h2>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-3">
                    <Popup
                        trigger={open => (
                            <button className="h-7 w-7 bg-secondary-900 rounded-full flex items-center justify-center" onClick={() => setEditIsOpen(true)}>
                                <EditIcon classes="h-4 text-white" />
                            </button>
                        )}
                        position="top center"
                        on={['hover', 'focus']}
                    >
                        <Tooltip title="Modifier" />
                    </Popup>
                    <Popup
                        trigger={open => (
                            <button className="h-7 w-7 bg-primary-700 rounded-full flex items-center justify-center" type="button" onClick={() => setConfirmIsOpen(true)}>
                                <TimesIcon classes="h-6 text-white" />
                            </button>
                        )}
                        position="top center"
                        on={['hover', 'focus']}
                    >
                        <Tooltip title="Supprimer" />
                    </Popup>
                </div>
                <div className="">
                    <Switcher
                        name={id}
                        id={id}
                        checked={active}
                    />
                </div>
            </div>
            <Modal isOpen={editIsOpen} onClose={closeEdit}>
                <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-dark-800 border border-dark-700">
                    <div className="flex justify-between p-4 border-b border-dark-700">
                        <h2 className="text-white font-bold text-lg pt-1">Modifier la langue</h2>
                        <button onClick={closeEdit} type="button">
                            <TimesIcon classes="text-grey-200 h-6" />
                        </button>
                    </div>
                    <div className="p-4 flex flex-col space-y-4 border-b border-dark-700">
                        {errors && errors?.global && <div className="text-red-500 text-sm">{errors.global}</div>}
                        <div className="flex justify-between items-center space-x-4">
                            <label htmlFor="name" className="text-white text-sm font-medium">Titre de la langue</label>
                            <div className="w-full md:w-72 flex flex-col">
                                <input 
                                    className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                                    type="text" 
                                    name="name" 
                                    id="name"
                                    value={langue?.name}
                                    onChange={(e) => setLangue({...langue, name: e.target.value})}
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
                                    fileUrl={langue?.flag_file}
                                />
                                {errors && errors?.flag_file && <span className="text-red-500 text-sm">{errors.flag_file}</span>}
                                {
                                    langue?.flag_file && langue?.flag_file !== "" && (
                                        <div className="h-12 mt-1 w-auto relative">
                                            <Image
                                                fill className="object-contain object-left"
                                                alt={"drapeau " + langue?.name}
                                                src={langue?.flag_file}
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
                                value={langue?.status}
                                onChange={(e) => setLangue({...langue, status: e.target.value})}
                            >
                                <option value="true">Actif</option>
                                <option value="false">Inactif</option>
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

            <Modal isOpen={confirmIsOpen} onClose={closeConfirm}>
                <div className="w-full max-w-lg p-5 rounded-2xl bg-dark-800 border border-dark-700">
                    <div className="flex justify-center p-8">
                        <div className="h-24 w-24 rounded-full border-4 border-warning-900 flex items-center justify-center">
                            <span className="text-warning-900 text-6xl">!</span>
                        </div>
                    </div>
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">Etes-vous sûr ?</h3>
                        <p className="text-gray-100">En êtes-vous sûr ? Vous ne pourrez pas le récupérer.</p>
                    </div>
                    <div className="flex justify-center gap-6 p-4">
                        <button className="flex items-center space-x-2 bg-tertiary-900 py-2.5 px-5 rounded" onClick={handleDelete}> 
                            <span className="text-white font-semibold">Oui, Supprimer!</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-primary-800 py-2.5 px-5 rounded" onClick={closeConfirm}> 
                            <span className="text-white font-semibold">Annuler</span>
                        </button>
                    </div>
                </div>
            </Modal>        
        </div>
    )
}

export default LanguageCard