"use client"

import ExcelExport from "@components/common/ExcelExport"
import Modal from "@components/common/Modal"
import Pagination from "@components/common/Pagination"
import Tooltip from "@components/common/Tooltip"
import { EditIcon, EyeIcon, PlusIcon, RestoreIcon, SearchIcon, TimesIcon } from "@icons/MyTVIcons"
import axios from "@lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Popup from "reactjs-popup"
import { toast } from 'react-toastify'
import NoTableData from "@components/common/NoTableData"
import { useSession } from "next-auth/react"
import PlaceholderTableRows from "@components/common/PlaceholderTableRows"

type TableRowProps = { 
    id: string,
    username: string, 
    email: string, 
    phone: string, 
    valide: boolean,
    actions?: string[]
    head?: any[]
}

const AdminsPage = () => {
    const tableHead: TableHeadEl[] = [
        {
            accessorKey: "username",
            header: "Nom d'utilisateur",
            colSpan: "col-span-3"
        },
        {
            accessorKey: "email",
            header: "Email",
            colSpan: "col-span-4"
        },
        {
            accessorKey: "phone",
            header: "Telephone",
            colSpan: "col-span-2"
        },
        {
            accessorKey: "status",
            header: "Statut",
            colSpan: "col-span-1"
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
            try {
                const response = await axios.get('/admin/users/all', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    setTableRows(response.data.Data.filter((user: any) => user.valide === false))
                    setIsLoading(false)
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        session?.token ? fetchData() : null
    }, [session])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await axios.get('http://localhost:3000/api/users?page='+page+'&pageSize='+pageSize+'&plan='+plan+'&searchWord='+searchWord)
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
                    </div>
                    <div className="">
                        <ExcelExport 
                            dataToExport={tableRows}
                            fileName="archived_users"
                            label="Exporter les utilisateurs archivés"
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
                                        username={item.username}
                                        email={item.email}
                                        phone={item.phone}
                                        valide={item.valide}
                                        actions={["view", "delete"]}
                                        head={tableHead}
                                    />
                                ))
                            )
                        }
                        {!isLoading && tableRows.length === 0 && (
                            <div className="w-full bg-black py-6">
                                <p className="text-white text-center font-medium p-6">
                                    {"Il n'y a aucun utilisateur archivé pour le moment"}
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

const TableRow = ({ id, username, email, phone, valide, actions, head }: TableRowProps) => {
    const [confirmIsOpen, setConfirmIsOpen] = useState<boolean>(false)
    const { data: session } = useSession()

    const closeConfirm = () => {
        setConfirmIsOpen(false)
    }

    const renderStatus = () => {
        if(valide) {
            return (
                <span className="text-white text-sm font-medium bg-secondary-900 rounded px-2 py-0.5">Actif</span>
            )
        } else {
            return (
                <span className="text-white text-sm font-medium bg-primary-900 rounded px-2 py-0.5">Inactif</span>
            )
        }
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

    if(head) {
        return (
            <div className="w-full border border-t-0 divide-x divide-dark-600 border-dark-600 grid grid-cols-12">
                <div className={"h-full " + head.find(item => item.accessorKey === 'username')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full">
                        <span className="text-white text-sm font-medium">{username}</span>
                    </div>
                </div>
                <div className={"h-full " + head.find(item => item.accessorKey === 'email')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full">
                        <span className="text-white text-sm font-medium">{email}</span>
                    </div>
                </div>
                <div className={"h-full " + head.find(item => item.accessorKey === 'phone')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full">
                        <span className="text-white text-sm font-medium">{phone}</span>
                    </div>
                </div>
                <div className={"h-full " + head.find(item => item.accessorKey === 'valide')?.colSpan}>
                    <div className="px-4 py-3 flex items-center h-full">
                        {renderStatus()}
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
                                        <Popup
                                            key={i}
                                            trigger={open => (
                                                <Link key={i} href={`/users/${id}/history`} className="text-white text-sm font-medium bg-secondary-900 rounded px-2 py-1">
                                                    <RestoreIcon classes="text-white h-6" />
                                                </Link>
                                            )}
                                            position="top center"
                                            on={['hover', 'focus']}
                                        >
                                            <Tooltip title="Restaurer l'utilisateur" />
                                        </Popup>
                                    )
                                }
                                else if(action === "delete") {
                                    return (
                                        <Popup
                                            key={i}
                                            trigger={open => (
                                                <button key={i} onClick={() => setConfirmIsOpen(true)} className="text-white text-sm font-medium bg-primary-900 rounded px-2 py-1">
                                                    <TimesIcon classes="text-white h-6" />
                                                </button>
                                            )}
                                            position="top center"
                                            on={['hover', 'focus']}
                                        >
                                            <Tooltip title="Supprimer définitivement" />
                                        </Popup>
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

export default AdminsPage