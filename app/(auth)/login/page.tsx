"use client"

import axios from '@lib/axios'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const LoginPage = ({ searchParams }: { searchParams: { callbackUrl: string } }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    // Save the "remember me" information in the browser's local storage
    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setRememberMe(isChecked);
        if (isChecked) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
    };

    // Retrieve the "remember me" information from local storage on page load
    useEffect(() => {
        const rememberMeValue = localStorage.getItem('rememberMe');
        if (rememberMeValue === 'true') {
            setRememberMe(true);
        }
    }, [])

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post("/auth/admin-register", 
                {
                    "username": "userJohn",
                    "password": "password",
                    "email": "user.john@doe.com",
                    "roleList": [
                        "USER"
                    ]
                }
            )
            
            console.log('response', response)
        } catch (error: any) {
            console.error(error.response.data)
        }
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage(null)

        const username = e.currentTarget.username.value
        const password = e.currentTarget.password.value
      
        const result = await signIn("credentials", {
            username: username, 
            password: password,
            redirect: false,
        })

        if(result) {
            setIsLoading(false)
            setErrorMessage(null)
            console.log(result)
        }
        
        if(result && result.ok) {
            toast.success('Connexion reussie')
            return router.push(searchParams.callbackUrl || "/")
        } else {
            if(result?.status === 401) {
                setErrorMessage(result.error)   
            }
        }
    }
    return (
        <section className="w-full py-[87px]">
            <div className="mx-auto relative h-12 w-[300px] mb-6">
                <Image className="object-contain" src="/assets/logos/mytelevisionlong.png" sizes="(100vw - 2.5rem)" alt="Site Logo" fill />
            </div>
            <div className="w-full max-w-[420px] mx-auto bg-[#1c1c1e] shadow-md rounded-lg p-5">
                <h1 className="text-center text-white text-2xl font-bold uppercase my-[10px]">Se connecter</h1>
                {
                    errorMessage && (
                        <div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30 my-6">
                            <p className="text-primary-700 text-sm text-center">{errorMessage}</p>
                        </div>
                    )
                }
                {/* <form onSubmit={handleRegister} className="pt-2 flex flex-col space-y-4"> */}
                <form onSubmit={handleSubmit} className="pt-2 flex flex-col space-y-4">
                    <div className="">
                        <input 
                            required
                            className="w-full px-4 py-3 rounded focus:outline-none focus:shadow-input bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Nom d'utilisateur" 
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <input 
                            required
                            className="w-full px-4 py-3 rounded focus:outline-none focus:shadow-input bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg"
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Mot de passe" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="remember" className="text-white text-sm flex items-center">
                            <input 
                                className="h-4 rounded-md" 
                                type="checkbox" 
                                name="remember" 
                                id="remember" 
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                            />
                            <span className="ml-2">Se souvenir de moi</span>
                        </label>
                    </div>
                    <div className="pt-2">
                        <button 
                            type={isLoading ? "button" : "submit"}
                            className={`flex justify-center items-center space-x-2 uppercase text-white ${!isLoading ? 'bg-primary-900' : 'bg-[#49494a]'} w-full py-3 p-[10px] font-medium rounded text-sm shadow-lg hover:bg-[#49494a] transition-colors duration-500`}
                        >
                            <span>Se connecter</span>
                            {isLoading && <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-0 border-gray-900" />}
                        </button>
                    </div>
                    <Link href="/password/email" className="flex items-center justify-center space-x-1 pb-5 pt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-[14px] text-gray-400" fill="currentColor" version="1.1" id="Layer_1" viewBox="0 0 491.52 491.52">
                            <g>
                                <path d="M399.4,203.578h-19.801h-0.005v-69.744C379.593,60.039,319.556,0,245.759,0c-73.793,0-133.832,60.039-133.832,133.835    v69.744H92.122c-15.656,0-28.35,12.692-28.35,28.349v17.246v196.751v17.245c0,15.658,12.693,28.35,28.35,28.35H245.76H399.4    c15.656,0,28.348-12.692,28.348-28.35v-17.245V249.174v-17.246C427.748,216.27,415.056,203.578,399.4,203.578z M275.935,406.648    h-60.349l10.801-51.467c-10.101-6.428-16.848-17.652-16.848-30.512c0-20.003,16.218-36.219,36.221-36.219    c20.004,0,36.219,16.216,36.219,36.219c0,12.86-6.745,24.084-16.845,30.51L275.935,406.648z M331.84,203.578h-86.08h-86.075    h-0.005v-69.744c0-47.469,38.613-86.081,86.08-86.081c47.469,0,86.08,38.613,86.08,86.081V203.578z"/>
                            </g>
                        </svg>
                        <span className="text-grey-200 text-[14px] font-medium">Mot de passe oublié ?</span>
                    </Link>
                </form>
            </div>
        </section>
    )
}

export default LoginPage