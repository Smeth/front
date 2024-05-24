import Tooltip from "@components/common/Tooltip"
import Switcher from "@components/elements/forms/Switcher"
import { EditIcon, TimesIcon } from "@icons/MyTVIcons"
import Popup from "reactjs-popup"
import Image from 'next/image'
import { SeasonCardProps } from "@/types/cards"
import Link from "next/link"
import Modal from "@components/common/Modal"
import { useState } from "react"
import CheckBox from "@components/elements/forms/CheckBox"
import { toast } from "react-toastify"
import axios from "@lib/axios"
import { useSession } from "next-auth/react"

const SeasonCard = ({ season, title, id, active, image, selected }: SeasonCardProps) => {
    const [isSelected, setIsSelected] = useState<boolean>(selected)
    const [confirmIsOpen, setConfirmIsOpen] = useState<boolean>(false)

    const hnadleCheck = () => {
        setIsSelected(!isSelected)
    }
    const closeConfirm = () => {
        setConfirmIsOpen(false)
    }

    const { data: session, update } = useSession()
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/admin/saisons/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
            if(res.status === 200) {
                closeConfirm()
                toast.success('Saison supprimé avec succès!')
                update({...session})
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="rounded-xl overflow-hidden bg-dark-800 shadow-secondary border border-dark-700">
            <div className="bg-black h-80 w-full relative">
                <Image 
                    className="object-cover object-top"
                    src={image}
                    alt={title}
                    fill
                />
                <div className="absolute bg-gradient-to-tl from-transparent via-transparent to-blue-900/50 w-full h-full"></div>
                <div className="absolute top-4 left-4">
                    <CheckBox
                        name="active"
                        id="active"
                        checked={isSelected}
                        onChange={hnadleCheck}
                    />
                </div>
            </div>
            <div className="p-3">
                <div className="mb-3">
                    <h2 className="text-white font-bold text-lg whitespace-nowrap text-ellipsis overflow-hidden">{season}</h2>
                    <p className="text-gray-100 text-sm">{title}</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                        <Popup
                            trigger={open => (
                                <Link href={"/series/seasons/" + id} className="h-7 w-7 bg-secondary-900 rounded-full flex items-center justify-center">
                                    <EditIcon classes="h-4 text-white" />
                                </Link>
                            )}
                            position="top center"
                            on={['hover', 'focus']}
                        >
                            <Tooltip title="Modifier" />
                        </Popup>
                        <Popup
                            trigger={open => (
                                <button className="h-7 w-7 bg-primary-700 rounded-full flex items-center justify-center" onClick={() => setConfirmIsOpen(true)}>
                                    <TimesIcon classes="h-6 text-white" />
                                </button>
                            )}
                            position="top center"
                            on={['hover', 'focus']}
                        >
                            <Tooltip title="Supprimer" />
                        </Popup>
                    </div>
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
                    <div className="">
                        <Switcher
                            name={id}
                            id={id}
                            checked={active}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeasonCard