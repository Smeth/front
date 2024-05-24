"use client"

import { LeftArrowIcon } from '@icons/MyTVIcons'
import axios from '@lib/axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const EmailPage = ({ searchParams }: { searchParams: { callbackUrl: string } }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [message, setMessage] = useState<any>(null)

    const [email, setEmail] = useState('')
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        setMessage(null)
        e.preventDefault()

        const email = e.currentTarget.email.value
        
        try {
            const res = await axios.post('/auth/password/send/resetcode', { email })
            
            if(res.status === 200) {
                setIsLoading(false)
                toast.success("Succès!!")
                setMessage({success: res.data.Data})
                setTimeout(() => {
                    return router.push('/password/reset')
                }, 2000)
            }
        } catch (error: any) {
            // console.error(error.response.data)
            setMessage({error: error.response.data.Data})
            setIsLoading(false)
        }
    }
    return (
        <section className="w-full py-[87px]">
            <div className="mx-auto relative h-12 w-[300px] mb-6">
                <Image className="object-contain" src="/assets/logos/mytelevisionlong.png" sizes="(100vw - 2.5rem)" alt="Site Logo" fill />
            </div>
            <div className="w-full max-w-[420px] mx-auto bg-[#1c1c1e] shadow-md rounded-lg p-5">
                <div className="mt-[10px] mb-4">
                    <h1 className="text-white text-xl font-bold">Mot de passe oublié ?</h1>
                    <div className="w-12 my-1 h-1 bg-primary-900 rounded-full" />
                </div>
                {message && (
                    <div className="text-center text-sm mb-3">
                        {message.success && <p className="text-green-500">{message.success}</p>}
                        {message.error && <p className="text-red-500">{message.error}</p>}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="pt-2 flex flex-col space-y-4">
                    <div className="">
                        <input 
                            className="w-full px-4 py-3 rounded focus:outline-none focus:shadow-input bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                            type="text" 
                            name="email" 
                            id="email" 
                            required
                            placeholder="Entrez votre adresse email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="pt-2">
                        <button 
                            type={(isLoading || message?.success) ? "button" : "submit"}
                            className={`flex justify-center items-center space-x-2 uppercase text-white ${(isLoading || message?.success)? 'bg-[#49494a]' : 'bg-primary-900'} w-full py-3 p-[10px] font-medium rounded text-sm shadow-lg hover:bg-[#49494a] transition-colors duration-500`}
                        >
                            <span>Réinitialiser mon mot de passe</span>
                            {isLoading && <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-0 border-gray-900" />}
                        </button>
                    </div>
                    <div className="">
                        <Link href="/login" className="flex items-center justify-center space-x-1 pb-5 pt-1">
                            <LeftArrowIcon classes="h-5 text-white" />
                            <span className="text-grey-200 text-[14px] font-medium">Retour à la page de connexion</span>
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default EmailPage