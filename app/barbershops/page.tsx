import BarberShopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { prisma } from "../_lib/prisma"

interface BarbershopsPageProps {
    searchParams: Promise<{
        title?: string
        service?: string
    }>
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    const { title, service } = await searchParams

    const barbershops = await prisma.barbershop.findMany({
        where: {
            OR: [
                title ? {
                    name: {
                        contains: title,
                        mode: 'insensitive'
                    }
                } : {},

                service ? {
                    services: {
                        some: {
                            name: {
                                contains: service,
                                mode: 'insensitive'
                            }
                        }
                    }
                } : {},
            ]
        }
    })

    return (
        <div>
            <Header />

            <div className="my-6 px-5">
                <Search />
            </div>

            <div className="px-5">
                <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Resultados para &quot;{title || service}&quot;</h2>

                <div className="grid grid-cols-2 gap-4">
                    {
                        barbershops.map(barbershop => (
                            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BarbershopsPage;