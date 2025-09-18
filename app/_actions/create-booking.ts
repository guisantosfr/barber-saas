'use server'

import { prisma } from "../_lib/prisma"

interface CreateBookingParams {
    userId: string;
    serviceId: string;
    date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
    await prisma.booking.create({
        data: params
    })
}