"use client"

import Modal from "@components/common/Modal"
import { useDropzone } from 'react-dropzone'
import { useEffect, useState } from "react"
import { formatFileSize, getPresignedUrl, smartTrim, uploadImageToR2, uploadImageToS3 } from "@utils/utilities"
import { FileExclamationIcon, TimesIcon, TrashIcon, UploadIcon } from "@icons/MyTVIcons"
import Image from "next/image"
import CheckBox from "./CheckBox"
import { useSession } from "next-auth/react"
import axios from "@lib/axios"

const S3FileUploader = ({ onFieldChange, name, id, helper, accept, fileUrl }: { onFieldChange: (name: string, value: string) => void, name: string, id: string, fileUrl?: string, helper?: string, accept?: string }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [currentFile, setCurrentFile] = useState<any>(null)

    const handleClose = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        currentFile && onFieldChange(name, currentFile.urlPresign)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFile])

    return (
        <div className="w-full">
            <div className="flex items-center justify-between w-full pl-4 overflow-hidden rounded bg-dark-700 text-sm text-grey-200 font-medium shadow-lg">
                <p  className="overflow-hidden text-nowrap text-ellipsis mr-3">{currentFile ? smartTrim(currentFile.fileName, 40) : smartTrim(fileUrl as string, 40)}</p>
                {/* <p className="whitespace-nowrap overflow-hidden text-ellipsis">{currentFile && currentFile.name}</p> */}
                <button
                    type="button"
                    className="bg-dark-400 py-3.5 text-sm px-4"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Select...
                </button>
            </div>
            <span className="text-[11px] text-grey-100">{helper}</span>

            <input type="hidden" name={name} id={id} value={currentFile ? currentFile.urlPresign : fileUrl} />

            <Modal
                isOpen={isOpen}
                onClose={handleClose}
            >
                <R2FilesManager
                    setCurrentFile={setCurrentFile}
                    currentFile={currentFile}
                    onClose={handleClose}
                />
            </Modal>
        </div>
    )
}

const R2FilesManager = ({ setCurrentFile, currentFile, onClose }: { setCurrentFile: any, currentFile: any, onClose: any }) => {
    const [selectedProgress, setSelectedProgress] = useState<number>(0)

    const [r2Files, setR2Files] = useState<any[]>([])
    const [selectedFile, setSelectedFile] = useState<any>({})
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            setSelectedFile(acceptedFiles[0])
            for (const file of acceptedFiles) {
                const newFile = await handleFileUpload(file)
                setR2Files((prevR2Files: any) => [...prevR2Files, newFile])
            }
        }
    })

    const { data: session, update } = useSession()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/admin/r2/findall', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(res.status === 200) {
                    setR2Files(res.data.Data.filter((r2File: any) => r2File.format.startsWith('image')))
                    setCurrentFile(null)
                }
            } catch (error) {
                console.error(error)
            }
        }
        session?.token && fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    async function handleFileUpload(file: File) {
        const res: any = await uploadImageToR2(session?.token || '', file, (event: ProgressEvent) => {
            if (event.lengthComputable) {
                let progress = (event.loaded / event.total) * 100
                setSelectedProgress(progress)
            }
        })

        if(res && res.Status === 200) {
            setCurrentFile(res.Data)
            return res.Data
        }
    }

    const handleDeleteR2File = async () => {
        try {
            const res = await axios.delete(`/admin/deleteFile/${currentFile?.id}`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
            if(res.status === 204) {
                update({...session})
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
      <div className="w-full max-w-5xl bg-white rounded-lg p-6">
        <input {...getInputProps()} accept="image/*,video/*" />
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="col-span-1 border p-4 flex flex-col justify-between space-y-2">
            <div className="w-full bg-gray-400 flex-1 flex items-center justify-center relative">
                {currentFile && (
                    <Image 
                        src={currentFile.urlPresign}
                        alt={currentFile.fileName}
                        sizes="(100vw - 2.5rem)"
                        fill className="object-contain"
                    />
                )}
            </div>
            <div className="flex space-x-4">
                <button type="button" onClick={onClose} className="bg-secondary-900 text-white p-3 rounded text-sm flex-1">Insérer ce fichier</button>
                <button onClick={handleDeleteR2File} className="focus:outline-none" type="button" title="Supprimer le fichier">
                    <TrashIcon classes="h-7 text-primary-900" />
                </button>
            </div>
          </div>
          <div className="col-span-2">
            <div className="border h-80 overflow-y-auto">
                <div className="grid grid-cols-4 gap-2 p-4">
                    {
                        r2Files && r2Files.length > 0 && (
                            r2Files.map((file: any, i: number) => (
                                <ImageCard 
                                    file={file} 
                                    key={i} 
                                    setCurrentFile={setCurrentFile} 
                                    currentFile={currentFile}
                                />
                            ))
                        )
                    }
                </div>
            </div>
            <div className="w-full h-52 border-2 border-dashed rounded-lg mt-4 flex justify-center items-center">
                {
                    Object.values(selectedFile).length > 0 
                    ? (
                        (() => {
                            const isProgressComplete = selectedProgress === 100
                            if (isProgressComplete) {
                                setTimeout(() => {
                                    
                                }, 1000);
                            }
                            return (
                                <div className="border border-dashed w-11/12 flex rounded pb-1">
                                    <div className="h-16 w-16 flex items-center justify-center p-1">
                                        <FileExclamationIcon />
                                    </div>
                                    <div className="flex-1 flex flex-col p-1 w-10/12">
                                        <p>{smartTrim(selectedFile.name, 50)}</p> 
                                        <span className="text-xs">{formatFileSize(selectedFile.size)} / {selectedProgress.toFixed(0)}%</span>
                                        <div className="w-full bg-gray-100 rounded-full overflow-hidden mt-1">
                                            <div
                                                className="bg-primary-900 h-2 rounded-full"
                                                style={{
                                                    width: `${selectedProgress || 0}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-end p-1">
                                        <button type="button" title="Annuler le téléversement" onClick={() => setSelectedFile({})}>
                                            <TimesIcon classes="h-7" />
                                        </button>
                                        <button type="button" title="Supprimer le fichier">
                                            <TrashIcon classes="h-7 text-primary-900" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })()
                    )
                    : (
                        <div className="w-full h-full flex justify-center items-center" {...getRootProps()}>
                            <div className="flex flex-col justify-center items-center space-y-1">
                                <UploadIcon classes="h-14" />
                                <p>Glissez-Déposez un fichier ici</p>
                                <p>ou</p>
                                <button type="button" className="rounded-full py-2 px-6 bg-primary-900 text-sm text-white">Séléctionnez un fichier</button>
                            </div>
                        </div>
                    )
                }
            </div>
          </div>
        </div>
      </div>
    )
}

const ImageCard = ({ file, setCurrentFile, currentFile }: { file: any, setCurrentFile: any, currentFile: any }) => {
    const handleCheck = () => {
        setCurrentFile(file)
    }
    return (
        <div className="h-28 border relative rounded overflow-hidden">
            <Image
                className="object-cover"
                src={file.urlPresign} alt={file.fileName} fill
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-transparent via-transparent to-black/80 p-2">
                <CheckBox
                    checked={currentFile === file}
                    id={file.id}
                    name={file.id}
                    onChange={handleCheck}
                />
            </div>
        </div>
    )
}

export default S3FileUploader