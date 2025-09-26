'use server'

import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

interface CreateBookingParams {
    serviceId: string;
    date: Date;
    userId?: string;
}

export const createBooking = async (params: CreateBookingParams) => {
    const user = await getServerSession(authOptions);

    if(!user){
        throw new Error("Usuário não autenticado")
    }


    await prisma.booking.create({
        data: {...params, userId: (user.user as any).id }
    })

    revalidatePath('barbershops/[id]');
    revalidatePath('/bookings');
}