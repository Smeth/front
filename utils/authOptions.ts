import axios from "@lib/axios"
import CredentialsProvider from "next-auth/providers/credentials"

type Credentials = {
    username: string | undefined
    password: string | undefined
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {},
                password: {}
            },
            async authorize(credentials: Credentials | undefined, req) {
                if (!credentials) {
                    return null
                }
                const { username, password } = credentials;
                try {
                    const response = await axios.post("/auth/login", { username, password }, { withCredentials: true })
                    
                    if (response.data && response.status === 200) {
                        return { ...response.data.Data }
                    }
                } catch (error: any) {
                    console.error(error.response.data)
                    return Promise.reject(new Error(error.response.data.Data))
                }

                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt' as const
    },
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user, account }: { token: any; user: any; account: any }) {
            
            if (user && account) {
                return { ...token, ...user }
            }
            return token
        },
        async session({ session, token }: { session: any; token: any }) {
            return { ...session.user, ...token }
        }
    }
}