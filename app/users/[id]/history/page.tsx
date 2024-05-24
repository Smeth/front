"use client"

import Pagination from "@components/common/Pagination"
import { LeftArrowIcon } from "@icons/MyTVIcons"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "@lib/axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

const UserHistory = ({ params }: any) => {
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
    return (
        <div className="w-full">
            <div className="w-full grid grid-cols-3 gap-5">
                <div className="w-full bg-dark-800 rounded p-5 col-span-2">
                    <div className="">
                        <Link href="/users" className="inline-flex items-center space-x-1">
                            <LeftArrowIcon classes="h-6 text-primary-900" />
                            <span className="text-primary-900 font-bold">Retour</span>
                        </Link>
                    </div>
                    <div className="flex mt-2 gap-6">
                        <div className="h-32 w-32 bg-white rounded relative overflow-hidden">
                            <Image 
                                fill
                                src={user?.imageUrl || "/assets/images/avatar-10.jpg"}
                                sizes="(100vw - 2.5rem)"
                                alt="User Avatar"
                            />
                        </div>
                        <div className="">
                            <h1 className="text-lg text-white font-bold">AHMED SEYAM ({user?.username})</h1>
                            <p className="my-1 text-grey-100 font-medium">Email: {user?.email || 'Aucun email'}</p>
                            <p className="my-1 text-grey-100 font-medium">Téléphone: {user?.phone || 'Aucun numéro'}</p>
                            <p className="my-1 text-grey-100 font-medium">Adresse: {user?.address || 'Aucune adresse'}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-dark-800 rounded p-5 col-span-1">
                    <h2 className="text-lg text-white font-medium">Abonnement</h2>
                    <div className="rounded divide-y divide-grey-100/50 mt-6 overflow-hidden">
                        <div className="px-4 py-3 bg-dark-400 hover:bg-dark-500 cursor-pointer flex items-center space-x-3">
                            <span className="h-3 w-3 rounded-full bg-primary-900"></span>
                            <div className="">
                                <span className="block text-white text-sm font-medium">Basique</span>
                                <span className="block text-grey-100 text-xs font-medium">100$</span>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-dark-400 hover:bg-dark-500 cursor-pointer flex items-center space-x-3">
                            <span className="h-3 w-3 rounded-full bg-secondary-900"></span>
                            <div className="">
                                <span className="block text-white text-sm font-medium">{"L'abonnement expire le:"}</span>
                                <span className="block text-grey-100 text-xs font-medium">10 Octobre 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-dark-800 rounded p-5 pb-8 mt-5">
                <div className="pb-4">
                    <h2 className="text-lg text-white font-medium">Historique de paiment</h2>
                </div>
                <div className="my-4">
                    <div className="w-full border divide-x divide-dark-600 border-dark-600 grid grid-cols-12">
                        <div className="h-full col-span-2">
                            <div className="px-4 py-3">
                                <span className="text-white text-sm font-medium">Email</span>
                            </div>
                        </div>
                        <div className="h-full border-dark-600 col-span-1">
                            <div className="px-4 py-3">
                                <span className="text-white text-sm font-medium">Plan</span>
                            </div>
                        </div>
                        <div className="h-full border-dark-600 col-span-1">
                            <div className="px-4 py-3">
                                <span className="text-white text-sm font-medium">Montant</span>
                            </div>
                        </div>
                        <div className="h-full border-dark-600 col-span-3">
                            <div className="px-4 py-3">
                                <span className="text-white text-sm font-medium">Methode de paiement</span>
                            </div>
                        </div>
                        <div className="h-full border-dark-600 col-span-2">
                            <div className="px-4 py-3">
                                <span className="text-white text-sm font-medium">Payment ID</span>
                            </div>
                        </div>
                        <div className="h-full border-dark-600 col-span-2">
                            <div className="px-4 py-3">
                                <span className="text-white text-sm font-medium">Date de paiement</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-dark-600">
                        <TableRow />
                        <TableRow />
                    </div>
                </div>

                <Pagination
                    page={1}
                    totalPages={1}
                    onPageChange={() => {}}
                />
            </div>
        </div>
    )
}

const TableRow = () => {
    return (
        <div className="w-full border border-t-0 divide-x divide-dark-600 border-dark-600 grid grid-cols-12">
            <div className="h-full col-span-2">
                <div className="px-4 py-3 flex items-center h-full">
                    <span className="text-white text-sm font-medium">js****@gmail.com</span>
                </div>
            </div>
            <div className="h-full border-dark-600 col-span-1">
                <div className="px-4 py-3 flex items-center h-full">
                    <span className="text-white text-sm font-medium">Basique</span>
                </div>
            </div>
            <div className="h-full border-dark-600 col-span-1">
                <div className="px-4 py-3 flex items-center h-full">
                    <span className="text-white text-sm font-medium">100$</span>
                </div>
            </div>
            <div className="h-full border-dark-600 col-span-3">
                <div className="px-4 py-3 flex items-center h-full">
                    <span className="text-white text-sm font-medium">PayPal</span>
                </div>
            </div>
            <div className="h-full border-dark-600 col-span-2">
                <div className="px-4 py-3 flex items-center h-full">
                    <span className="text-white text-sm font-medium">00000000252</span>
                </div>
            </div>
            <div className="h-full border-dark-600 col-span-2">
                <div className="px-4 py-3 flex items-center h-full">
                    <span className="text-white text-sm font-medium">10 Janvier, 2024</span>
                </div>
            </div>
        </div>
    )
}

export default UserHistory