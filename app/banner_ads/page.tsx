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
import NoTableData from "@components/common/NoTableData"
import { useSession } from "next-auth/react"
import PlaceholderTableRows from "@components/common/PlaceholderTableRows"
import Image from "next/image"
import { smartTrim } from "@utils/utilities"

type TableRowProps = { 
    id: string,
    name: string, 
    image: string, 
    link: string, 
    status: boolean,
    actions?: string[]
    head?: any[]
}

const Banners = () => {
    const tableHead: TableHeadEl[] = [
        {
            accessorKey: "name",
            header: "Titre de la bannière",
            colSpan: "col-span-3"
        },
        {
            accessorKey: "image",
            header: "Image",
            colSpan: "col-span-2"
        },
        {
            accessorKey: "link",
            header: "Lien",
            colSpan: "col-span-3"
        },
        {
            accessorKey: "status",
            header: "Statut",
            colSpan: "col-span-2"
        },
        {
            accessorKey: "actions",
            header: "Action",
            colSpan: "col-span-2"
        }
    ]

    const [tableRows, setTableRows] = useState<TableRowProps[]>([])
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(8)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [plan, setPlan] = useState<string>("")
    const [searchWord, setSearchWord] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { data: session } = useSession()
    useEffect(() => {
        const fetchData = async () => {
            setTableRows([
                {
                    id: "1",
                    name: "Première bannière",
                    image: "/assets/images/2ZNFu0hkSVtAI6LRWGIlCPNd1Tj.jpg",
                    link: "https://google.com/leinversunepremrièrepub",
                    status: true
                },
                {
                    id: "2",
                    name: "Seconde bannière",
                    image: "/assets/images/2ZNFu0hkSVtAI6LRWGIlCPNd1Tj.jpg",
                    link: "https://google.com/leinversunepremrièrepub",
                    status: false
                }
            ])
            setIsLoading(false)
            // try {
            //     const response = await axios.get('/admin/banner_ads/all', {
            //         headers: {
            //             Authorization: `Bearer ${session?.token}`
            //         }
            //     })
            //     if(response.status === 200) {
            //         setTableRows(response.data.Data.filter((user: any) => user.role !== 'ADMIN'))
            //         setIsLoading(false)
            //     }
            //     else {
            //         toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
            //     }
            // } catch (error) {
            //     setIsLoading(false)
            //     console.error(error)
            // }
        }
        session?.token ? fetchData() : null
    }, [session])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await axios.get('http://localhost:3000/api/banner_ads?page='+page+'&pageSize='+pageSize+'&plan='+plan+'&searchWord='+searchWord)
    //         if(res.status === 200) {
    //             setTableRows(res.data.users)
    //             setTotalPages(res.data.totalPage)
    //             setIsLoading(false)
    //         }
    //     }
    //     fetchData()
    // }, [page, pageSize, plan, searchWord])

    // const handlePageChange = (page: number) => {
    //     setPage(page)
    // }
    return (
        <div className="w-full">
            <div className="w-full bg-dark-800 rounded p-5 pb-8">
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
                                    <Link href="/banner_ads/add" className="flex items-center space-x-2 bg-secondary-900 py-1.5 px-2 rounded">
                                        <PlusIcon classes="h-3.5 text-white" />
                                        <span className="text-white text-sm font-semibold">Ajouter une bannière</span>
                                    </Link>
                                )}
                                position="top center"
                                on={['hover', 'focus']}
                            >
                                <Tooltip title="Ajouter une bannière" />
                            </Popup>
                        </div>
                    </div>
                    <div className="">
                        <ExcelExport 
                            dataToExport={tableRows}
                            fileName="users"
                            label="Exporter les bannières"
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
                                        id={item.id}
                                        name={item.name}
                                        image={item.image}
                                        link={item.link}
                                        status={item.status}
                                        actions={["edit", "delete"]}
                                        head={tableHead}
                                    />
                                ))
                            )
                        }
                        {!isLoading && tableRows.length === 0 && (
                            <div className="w-full bg-black py-6">
                                <p className="text-white text-center font-medium p-6">
                                    {"Aucun utilisateur n'a encore été ajouté, "}
                                    <Link href="/banner_ads/add" className="font-semibold underline text-blue-500">ajoutez-en !</Link>
                                </p>
                            </div>
                        )}
                        {isLoading && ( <PlaceholderTableRows nbRows={5} /> )}
                    </div>
                </div>

                <Pagination
                    totalPages={0}
                    page={0}
                    onPageChange={() => {}}
                />
            </div>
        </div>
    )
}

const TableRow = ({ id, name, image, link, status, actions, head }: TableRowProps) => {
    const [confirmIsOpen, setConfirmIsOpen] = useState<boolean>(false)
    const { data: session } = useSession()

    const closeConfirm = () => {
        setConfirmIsOpen(false)
    }

    const handleDeletion = async () => {
        try {
            const res = await axios.delete('/admin/user/deleteAcountById/'+id, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
            if(res.status === 200) {
                setConfirmIsOpen(false)
                toast.success('Utilisateur supprimé avec succès')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderStatus = () => {
        if(status) {
            return (
                <span className="text-white text-sm font-medium bg-secondary-900 rounded px-2 py-0.5">Actif</span>
            )
        } else {
            return (
                <span className="text-white text-sm font-medium bg-primary-900 rounded px-2 py-0.5">Inactif</span>
            )
        }
    }

    const renderImage = (imageUrl: string, classes?: string) => {
        return (
            <div className={(classes ? classes : "h-12 w-full overflow-hidden") + " relative"}>
                <Image fill alt="image" src={imageUrl} className="object-left object-contain" />
            </div>
        )
    }

    const renderLInk = (link: string) => {
        return (
            <Link href={link} target="_blank" className="text-blue-500 underline text-sm font-medium">
                {smartTrim(link, 38)}
            </Link>
        )
    }

    if(head) {
        return (
            <div className="w-full border border-t-0 divide-x divide-dark-600 border-dark-600 grid grid-cols-12">
                <div className={"h-full " + head.find(item => item.accessorKey === 'name')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full">
                        <span className="text-white text-sm font-medium">{name}</span>
                    </div>
                </div>
                <div className={"h-full " + head.find(item => item.accessorKey === 'image')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full">
                        {renderImage(image)}
                    </div>
                </div>
                <div className={"h-full " + head.find(item => item.accessorKey === 'link')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full">
                        {renderLInk(link)}
                    </div>
                </div>
                <div className={"h-full " + head.find(item => item.accessorKey === 'status')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full">
                        <span className="text-white text-sm font-medium">{renderStatus()}</span>
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
                                        <Link key={i} href={`/banner_ads/${id}/history`} className="text-white text-sm font-medium bg-primary-900 rounded px-2 py-1">
                                            <EyeIcon classes="text-white h-6" />
                                        </Link>
                                    )
                                }
                                else if(action === "edit") {
                                    return (
                                        <Link key={i} href={`/banner_ads/${id}`} className="text-white text-sm font-medium bg-secondary-900 rounded px-2.5 py-1.5">
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

export default Banners