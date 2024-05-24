"use client"

import { LeftArrowIcon } from '@icons/MyTVIcons'
import axios from '@lib/axios'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const PassResetPage = ({ params }: { params: any }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        console.log('params', params)
    }, [params])

    const [code, setCode] = useState<number|null>(null)
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        setMessage(null)
        e.preventDefault()

        const code = e.currentTarget.code.value
        const password = e.currentTarget.password.value
        const password2 = e.currentTarget.password2.value
        
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
        if(!regex.test(password)) {
            setMessage({error: 'Le mot de passe doit contenir au moins 8 caractères et doit contenir au Moins une lettre Majuscule, un chiffre et un caractère spécial'})
            setIsLoading(false)
        } 
        else if(password !== password2) {
            setMessage({error: 'Les mots de passe ne sont pas identiques'})
            setIsLoading(false)
        }
        else {
            try {
                const res = await axios.post('/auth/password/reset/' + code, { mdp: password })
                console.log('res', res)
                if(res.status === 200) {
                    setIsLoading(false)
                    toast.success('Mot de passe mis à jour')
                    setTimeout(() => {
                        return router.push('/login')
                    }, 2000)
                }
            } catch (error: any) {
                setIsLoading(false)
                // setMessage({error: error.response.data.Data})
                if(error.response.status === 409 || error.response.status === 400) {
                    setMessage({error: error.response.data.Data})
                }
                if(error.code === "ERR_NETWORK") {
                    setMessage({error: 'Une erreur est survenue. Veuillez reessayer plus tard'})
                }
            }
        }
    }
    console.log('code', code)
    return (
        <section className="w-full py-[87px]">
            <div className="mx-auto relative h-12 w-[300px] mb-6">
                <Image className="object-contain" src="/assets/logos/mytelevisionlong.png" sizes="(100vw - 2.5rem)" alt="Site Logo" fill />
            </div>
            <div className="w-full max-w-[420px] mx-auto bg-[#1c1c1e] shadow-md rounded-lg p-5">
                <div className="mt-[10px] mb-4">
                    <h1 className="text-white text-xl font-bold">Réinitialiser mon mot de passe</h1>
                    <div className="w-12 my-1 h-1 bg-primary-900 rounded-full" />
                </div>
                {message && (
                    <div className="text-center text-sm mb-3">
                        {message.success && <p className="text-green-500">{message.success}</p>}
                        {message.error && <p className="text-red-500">{message.error}</p>}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="pt-2 flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-grey-200 font-medium">Saisissez le code qui vous a été envoyé par email</label>
                        <input 
                            className="w-full px-4 py-3 rounded focus:outline-none focus:shadow-input bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                            type="nulmber" 
                            name="code" 
                            id="code" 
                            placeholder="ex: 246536" 
                            value={code || ''}
                            onChange={e => setCode((e.target.value as unknown) as number)}
                        />
                        {/* {Array(6).fill(0).map((_, i) => (
                            <input 
                                key={i}
                                className="w-12 px-4 py-3 rounded focus:outline-none focus:shadow-input bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                                type="number" 
                                maxLength={1}
                                onKeyDown={e => {
                                    if(!/[0-9]/.test(e.key) && e.key !== 'Backspace') e.preventDefault()
                                    if(/[0-9]/.test(e.key)) {
                                        const inputs = document.querySelectorAll('input[type="number"]')
                                        inputs[i + 1]?.focus()
                                    }
                                }}
                                onChange={e => {
                                    const value = [...[code]]
                                    value[i] = e.target.value
                                    setCode(value.join(''))
                                }}
                                value={code?.[i] || ''}
                            />
                        ))} */}
                    </div>
                    <div className="h-0.5 w-full bg-dark-400" />
                    <div className="">
                        <input 
                            className="w-full px-4 py-3 rounded focus:outline-none focus:shadow-input bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Nouveau mot de passe" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <input 
                            className="w-full px-4 py-3 rounded focus:outline-none focus:shadow-input bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                            type="password" 
                            name="password2" 
                            id="password2" 
                            placeholder="Confirmez le mot de passe" 
                            value={password2}
                            onChange={e => setPassword2(e.target.value)}
                        />
                    </div>
                    <div className="pt-2 pb-4">
                        <button 
                            type={isLoading ? "button" : "submit"}
                            className={`flex justify-center items-center space-x-2 uppercase text-white ${!isLoading ? 'bg-primary-900' : 'bg-[#49494a]'} w-full py-3 p-[10px] font-medium rounded text-sm shadow-lg hover:bg-[#49494a] transition-colors duration-500`}
                        >
                            <span>Changer le mot de passe</span>
                            {isLoading && <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-0 border-gray-900" />}
                        </button>
                    </div>
                    <div className="">
                        <Link href="/password/email" className="flex items-center justify-center space-x-1 pb-2">
                            <LeftArrowIcon classes="h-5 text-white" />
                            <span className="text-grey-200 text-[14px] font-medium">Retour à la page précédente</span>
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default PassResetPage