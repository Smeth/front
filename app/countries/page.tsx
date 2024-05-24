"use client"

import ExcelExport from "@components/common/ExcelExport"
import Modal from "@components/common/Modal"
import Pagination from "@components/common/Pagination"
import Tooltip from "@components/common/Tooltip"
import { EditIcon, EyeIcon, PlusIcon, SearchIcon, TimesIcon } from "@icons/MyTVIcons"
import axios from "@lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Popup from "reactjs-popup"
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useSession } from "next-auth/react"
import PlaceholderTableRows from "@components/common/PlaceholderTableRows"

type TableRowProps = { 
    idPays: string,
    name: string, 
    countryFlag: string, 
    isoCode: string, 
    countryCode: string,
    actions?: string[]
    head?: any[]
}

const Countries = () => {
    const tableHead: TableHeadEl[] = [
        {
            accessorKey: "countryFlag",
            header: "Drapeau",
            colSpan: "col-span-1"
        },
        {
            accessorKey: "name",
            header: "Nom du pays",
            colSpan: "col-span-4"
        },
        {
            accessorKey: "isoCode",
            header: "Code ISO",
            colSpan: "col-span-2"
        },
        {
            accessorKey: "countryCode",
            header: "Indicatif",
            colSpan: "col-span-2"
        },
        {
            accessorKey: "actions",
            header: "Action",
            colSpan: "col-span-3"
        }
    ]

    const [tableRows, setTableRows] = useState<TableRowProps[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(12)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [searchWord, setSearchWord] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errors, setErrors] = useState<any>({})

    const { data: session } = useSession()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/pays/all/?page='+currentPage+'&size='+pageSize+'&sort=name', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setTableRows(response.data.Data.content)
                    setTotalPages(response.data.Data.totalPages)
                    setIsLoading(false)
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
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
    }, [session, pageSize, currentPage])
    return (
        <div className="w-full">
            <div className="w-full bg-dark-800 rounded p-5 pb-8">
                {errors && errors?.global && (<div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30 mb-4">
                    <p className="text-primary-700 text-sm">{errors.global}</p>
                </div>)}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col md:flex-row items-center space-x-4">
                        <div className="relative">
                            <input
                                onChange={(e: any) => setSearchWord(e.target.value)} 
                                type="text" 
                                placeholder="Rechercher" 
                                className="md:w-72 py-3 focus:shadow-input px-6 bg-dark-700 border-2 text-white border-dark-600 rounded-full focus:outline-none text-sm font-bold"
                            />
                            <button className="absolute right-4 top-3.5">
                                <SearchIcon classes="text-white h-5" />
                            </button>
                        </div>
                        <div className="">
                            <Popup
                                trigger={open => (
                                    <Link href="/countries/add" className="flex items-center space-x-2 bg-secondary-900 py-1.5 px-2 rounded">
                                        <PlusIcon classes="h-3.5 text-white" />
                                        <span className="text-white text-sm font-semibold">Ajouter un pays</span>
                                    </Link>
                                )}
                                position="top center"
                                on={['hover', 'focus']}
                            >
                                <Tooltip title="Ajouter un pays" />
                            </Popup>
                        </div>
                    </div>
                    <div className="">
                        <ExcelExport 
                            dataToExport={tableRows}
                            fileName="coutries"
                            label="Exporter les pays"
                        />
                    </div>
                </div>
                <div className="my-4">
                    <div className="w-full border divide-x divide-dark-600 border-dark-600 grid grid-cols-12">
                        {
                            tableHead && tableHead.length > 0 && (
                                tableHead.map((item: TableHeadEl, index: number) => (
                                    <div key={index} className={"h-full border-dark-600 " + (item.colSpan || "col-span-2") }>
                                        <div className="px-4 py-3">
                                            <span className="text-white text-sm font-medium">{item.header}</span>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                    <div className="border-t border-dark-600">
                        {!isLoading && tableRows && tableRows.length > 0 && (
                                tableRows.map((item: TableRowProps, index: number) => (
                                    <TableRow
                                        key={index}
                                        idPays={item.idPays}
                                        countryCode={item.countryCode}
                                        name={item.name}
                                        countryFlag={item.countryFlag}
                                        isoCode={item.isoCode}
                                        actions={["edit", "delete"]}
                                        head={tableHead}
                                    />
                                ))
                            )
                        }
                        {!isLoading && tableRows.length === 0 && (
                            <div className="w-full bg-black py-6">
                                <p className="text-white text-center font-medium p-6">
                                    {"Aucun pays n'a encore été ajouté, "}
                                    <Link href="/countries/add" className="font-semibold underline text-blue-500">ajoutez-en !</Link>
                                </p>
                            </div>
                        )}
                        {isLoading && ( <PlaceholderTableRows nbRows={5} /> )}
                    </div>
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

const TableRow = ({ idPays, name, countryFlag, isoCode, countryCode, actions, head }: TableRowProps) => {
    const [confirmIsOpen, setConfirmIsOpen] = useState<boolean>(false)
    const { data: session, update } = useSession()

    const closeConfirm = () => {
        setConfirmIsOpen(false)
    }

    const handleDeletion = async () => {
        try {
            const res = await axios.delete('/admin/pays/delete/'+idPays, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
            if(res.status === 200) {
                setConfirmIsOpen(false)
                update({...session})
                toast.success('Pays supprimé avec succès')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const renderFlag = (flagUrl: string) => {
        return (
            <div className="h-8 w-12 relative mx-auto">
                <Image className="object-contain" src={flagUrl} alt="flag" fill />
            </div>
        )
    }

    if(head) {
        return (
            <div className="w-full border border-t-0 divide-x divide-dark-600 border-dark-600 grid grid-cols-12">
                <div className={"h-full " + head.find(item => item.accessorKey === 'countryFlag')?.colSpan}>
                    <div className="px-4 py-1 flex items-center h-full">
                        {renderFlag(countryFlag)}
                    </div>
                </div>
                <div className={"h-full " + head.find(item => item.accessorKey === 'name')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full">
                        <span className="text-white text-sm font-medium">{name}</span>
                    </div>
                </div>
                <div className={"h-full " + head.find(item => item.accessorKey === 'isoCode')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full">
                        <span className="text-white text-sm font-medium">{isoCode}</span>
                    </div>
                </div>
                <div className={"h-full " + head.find(item => item.accessorKey === 'countryCode')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full">
                        <span className="text-white text-sm font-medium">{countryCode}</span>
                    </div>
                </div>
                <div className={"h-full " + head.find(item => item.accessorKey === 'actions')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full gap-2">
                        {
                            actions &&
                            actions.length > 0 &&
                            actions.map((action: string, i: number) => {
                                if(action === "view") {
                                    return (
                                        <Link key={i} href={`/countries/${idPays}/history`} className="text-white text-sm font-medium bg-primary-900 rounded px-2 py-1">
                                            <EyeIcon classes="text-white h-6" />
                                        </Link>
                                    )
                                }
                                else if(action === "edit") {
                                    return (
                                        <Link key={i} href={`/countries/${idPays}`} className="text-white text-sm font-medium bg-secondary-900 rounded px-2.5 py-1.5">
                                            <EditIcon classes="text-white h-5" />
                                        </Link>
                                    )
                                }
                                else if(action === "delete") {
                                    return (
                                        <button key={i} onClick={() => setConfirmIsOpen(true)} className="text-white text-sm font-medium bg-primary-700 rounded px-2 py-1">
                                            <TimesIcon classes="text-white h-6" />
                                        </button>
                                    )
                                }
                            })
                        }
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
                                    <button className="flex items-center space-x-2 bg-tertiary-900 py-2.5 px-5 rounded" onClick={handleDeletion}> 
                                        <span className="text-white font-semibold">Oui, Supprimer!</span>
                                    </button>
                                    <button className="flex items-center space-x-2 bg-primary-800 py-2.5 px-5 rounded" onClick={closeConfirm}> 
                                        <span className="text-white font-semibold">Annuler</span>
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

export default Countries