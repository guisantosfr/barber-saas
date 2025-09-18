import { prisma } from "@/app/_lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async session({ session, user}) {
            session.user = {
                ...session.user,
                id: user.id
            } as any

            return session;
        }
    }
})

export { handler as GET, handler as POST }