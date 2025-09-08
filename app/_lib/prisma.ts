import { PrismaClient } from "../generated/prisma/client"

declare global {
  // eslint-disable-next-line no-unused-vars
  var cachedPrisma: PrismaClient
}

export const prisma = global.cachedPrisma ?? new PrismaClient()

if(process.env.NODE_ENV !== "production") {
  global.cachedPrisma = prisma
}