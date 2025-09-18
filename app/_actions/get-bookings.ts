'use server'

import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../_lib/prisma"

interface GetBookingsProps {
    serviceId: string;
    date: Date
}

export const getBookings = async ({ date }: GetBookingsProps) => {
    const bookings = await prisma.booking.findMany({
        where: {
            date: {
                lte: endOfDay(date),
                gte: startOfDay(date)
            }
        }
    })

    return bookings;
}