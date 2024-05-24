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
import { dateToInputDate, getFieldArrayValue } from "@utils/utilities"
import SwitchRadio from "@components/elements/forms/SwitchRadio"
import DatePickerComponent from "@components/elements/forms/DatePicker"

export default function AddLive() {
    const [live, setLive] = useState<any>({})
    const [errors, setErrors] = useState<any>(null)
    const [categoriesOptions, setCategoriesOptions] = useState<any[]>([])
    
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/ressources/all?resources=categlives', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    for (const item of response.data.Data) {
                        if (item.categlives) {
                            setCategoriesOptions(item.categlives.map((cat: any) => ({ label: cat.name, value: cat.id })))
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

    const handleFieldChange = (fieldName: string, value: string) => {
        setLive({
            ...live,
            [fieldName]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { 
            name, 
            overview, 
            lieu, 
            posterUrl, 
            dateDebut, 
            dateFin, 
            heureDebut, 
            heureFin, 
            liveUrl, 
            accessFree, 
            status 
        }: any = e.currentTarget
        
        const data = {
            name: name.value,
            idCats: getFieldArrayValue(e, 'idCats'),
            overview: overview.value,
            lieu: lieu.value,
            dateDebut: dateDebut.value,
            dateFin: dateFin.value,
            heureDebut: heureDebut.value,
            heureFin: heureFin.value,
            posterUrl: posterUrl.value,
            liveUrl: liveUrl.value,
            accessFree: accessFree.value,
            status: status.value,
        }

        console.log('data', data)

        try {
            const res = await axios.post('/admin/lives/create', data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 201) {
                toast.success('Live ajouté avec succès!')
                return router.push('/lives')
            }
        } catch (error: any) {
            if(error?.response?.status === 400) {
                setErrors({ ...errors, ...error.response.data.Data })
            }
            else if (error?.response?.status === 409) {
                setErrors({ ...errors, global: error.response.data.Data })
            } 
            else {
                setErrors({ ...errors, global: "Oops, quelque chose s'est mal passé. Veuillez rafraichir la page et réessayer" })
                toast.error("Oops, quelque chose s'est mal passé. Veuillez rafraichir la page et reessayer")
            }
        }
    }

    const handleSelectSearchChange = (newValue: any, actionMeta: any) => {
        setLive({
            ...live,
            [actionMeta.name]: newValue.value
        })
    }

    return (
        <div className="w-full">
            <div className="w-full bg-dark-800 rounded p-5">
                <Link href="/lives" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                {errors && errors?.global && (<div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30 mb-4">
                    <p className="text-primary-700 text-sm">{errors.global}</p>
                </div>)}
                <div className="mt-4">
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 my-3 gap-4 md:gap-12">
                        <div className="">
                            <h2 className="text-lg text-white font-medium">Informations du live</h2>
                            <div className="mt-8 flex flex-col gap-4">
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="name" className="text-white text-sm font-medium">Nom du live*</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="name" 
                                            id="name"
                                            placeholder="Nom du live"
                                            required
                                            onChange={e => handleFieldChange(e.target.name, e.target.value)}
                                            value={live?.name || ''}
                                        />  
                                        {errors && errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between space-x-4">
                                    <label htmlFor="posterUrl" className="text-white text-sm font-medium mt-3">Poster du live*</label>
                                    <div className="w-full md:w-2/3">
                                        <S3FileUploader 
                                            id="posterUrl"
                                            name="posterUrl"
                                            accept="image/*"
                                            onFieldChange={handleFieldChange}
                                            fileUrl={live?.posterUrl || ''}
                                        />
                                        {errors && errors?.posterUrl && <span className="text-red-500 text-sm">{errors.posterUrl}</span>}
                                        {
                                            live?.posterUrl && live?.posterUrl !== "" && (
                                                <div className="h-12 mt-1 w-auto relative">
                                                    <Image
                                                        fill className="object-contain object-left"
                                                        alt={"posterUrl de " + live?.name}
                                                        src={live?.posterUrl}
                                                        sizes="(100vw - 2.5rem)"
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="flex justify-between space-x-4">
                                    <label htmlFor="overview" className="text-white text-sm font-medium">Description</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <textarea
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="overview"
                                            id="overview"
                                            value={live?.overview || ''}
                                            onChange={e => handleFieldChange(e.target.name, e.target.value)}
                                            rows={4}
                                        ></textarea>
                                        {errors && errors?.overview && <span className="text-red-500 text-sm">{errors.overview}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="idCats" className="text-white text-sm font-medium">Categorie*</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <SelectSearch
                                            id="idCats"
                                            name="idCats"
                                            options={categoriesOptions}
                                            isMulti={true}
                                            defaultValue={live?.idCats || null}
                                            onChange={handleSelectSearchChange}
                                            label="Selectionner une categorie"
                                        /> 
                                        {errors && errors?.idCats && <span className="text-red-500 text-sm">{errors.idCats}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="access_free" className="text-white text-sm font-medium">Accès au film</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="access_free" 
                                        id="access_free"
                                        value={live?.access_free}
                                        onChange={(e: any) => setLive({...live, access_free: e.target.value === "true"})}
                                    >
                                        <option value="false">Payant</option>
                                        <option value="true">Gratuit</option>
                                    </select>
                                </div>
                                <div className="flex justify-between space-x-4 py-2">
                                    <div className="flex flex-col">
                                        <label htmlFor="status" className="text-white text-sm font-medium">Statut</label>
                                    </div>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <SwitchRadio 
                                            active={live?.status || false}
                                            label1="Actif"
                                            label2="Inactif"
                                            name="status"
                                            id="status"
                                            onFieldChange={handleFieldChange}
                                        />
                                        {errors && errors?.status && <span className="text-red-500 text-sm">{errors.status}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="liveUrl" className="text-white text-sm font-medium">URL du live*</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="liveUrl" 
                                            id="liveUrl"
                                            placeholder="ex: https://liveking.com/m3u"
                                            required
                                            onChange={e => handleFieldChange(e.target.name, e.target.value)}
                                            value={live?.liveUrl || ''}
                                        />
                                        {errors && errors?.liveUrl && <span className="text-red-500 text-sm">{errors.liveUrl}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="lieu" className="text-white text-sm font-medium">Lieu</label>
                                    <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="text" 
                                            name="lieu" 
                                            id="lieu"
                                            placeholder="ex: "
                                            onChange={e => handleFieldChange(e.target.name, e.target.value)}
                                            value={live?.lieu || ''}
                                        />
                                        {errors && errors?.lieu && <span className="text-red-500 text-sm">{errors.lieu}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="dateDebut" className="text-white text-sm font-medium">Date de début</label>
                                    <div className="w-full md:w-2/3">
                                        <DatePickerComponent
                                            defaultValue={live.dateDebut !== "" ? live.dateDebut : null}
                                            onFieldChange={handleFieldChange}
                                            name="dateDebut"
                                            id="dateDebut"
                                        />
                                        {errors && errors?.dateDebut && <span className="text-red-500 text-sm">{errors.dateDebut}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="heureDebut" className="text-white text-sm font-medium">Date de début</label>
                                    <div className="w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="time"
                                            name="heureDebut"
                                            id="heureDebut"
                                            required
                                            onChange={e => handleFieldChange(e.target.name, e.target.value)}
                                            value={live?.heureDebut || ''}
                                        />
                                        {errors && errors?.heureDebut && <span className="text-red-500 text-sm">{errors.heureDebut}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="dateFin" className="text-white text-sm font-medium">Date de fin</label>
                                    <div className="w-full md:w-2/3">
                                        <DatePickerComponent
                                            defaultValue={live.dateFin !== "" ? live.dateFin : null}
                                            onFieldChange={handleFieldChange}
                                            name="dateFin"
                                            id="dateFin"
                                        />
                                        {errors && errors?.dateFin && <span className="text-red-500 text-sm">{errors.dateFin}</span>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="heureFin" className="text-white text-sm font-medium">Date de fin</label>
                                    <div className="w-full md:w-2/3">
                                        <input 
                                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            type="time"
                                            name="heureFin"
                                            id="heureFin"
                                            required
                                            onChange={e => handleFieldChange(e.target.name, e.target.value)}
                                            value={live?.heureFin || ''}
                                        />
                                        {errors && errors?.heureFin && <span className="text-red-500 text-sm">{errors.dateFin}</span>}
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
