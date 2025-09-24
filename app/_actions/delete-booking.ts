'use server'

import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export const deleteBooking = async (bookingId: string) => {
    const user = await getServerSession(authOptions);

    if(!user){
        throw new Error("Usuário não autenticado")
    }


    await prisma.booking.delete({
        where: {
            id: bookingId
        }
    })

    revalidatePath('/bookings');
}