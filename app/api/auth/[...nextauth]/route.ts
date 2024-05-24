import NextAuth from "next-auth"
import { authOptions } from "@utils/authOptions"



const authHandler = NextAuth(authOptions)

// export default async function handler(...params: any) {
//     await authHandler(...params)
// }

export { authHandler as GET, authHandler as POST }