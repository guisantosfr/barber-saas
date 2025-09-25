'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { prisma } from "../_lib/prisma";

export const getConfirmedBookings = async () => {
    const session = await getServerSession(authOptions);

    if(!session?.user) return []

    return prisma.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: new Date()
            }
          },
          include: {
            service: {
              include: {
                barbershop: true
              }
            }
          },
          orderBy: {
            date: 'asc'
          }
        })
}