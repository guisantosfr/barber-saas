import { Button } from "@/app/_components/ui/button";
import { prisma } from "@/app/_lib/prisma";
import { ChevronLeftIcon, Link, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopPageProps {
    params: {
        id: string
    }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
    const { id } = params;
    const barbershop = await prisma.barbershop.findUnique({
        where: {
            id: id
        }
    })

    return (
        <div>
            <div className="relative w-full h-[250px]">
                <Image src={barbershop?.imageUrl!} alt={barbershop?.name!} fill className="object-cover" />

                <Button size="icon" variant="secondary" className="absolute left-4 top-4" asChild>
                    <Link href="/">
                        <ChevronLeftIcon />
                    </Link>
                </Button>

                <Button size="icon" variant="secondary" className="absolute right-4 top-4">
                    <MenuIcon />
                </Button>
            </div>

            <div className="p-5 border-b border-solid">
                <h1 className="font-bold text-xl mb-3">{barbershop?.name}</h1>

                <div className="flex items-center gap-1 mb-2">
                    <MapPinIcon className="text-primary" />
                    <p className="text-sm">{barbershop?.address}</p>
                </div>

                <div className="flex items-center gap-1">
                    <StarIcon className="text-primary fill-primary" />
                    <p className="text-sm">5.0 (899 avaliações)</p>
                </div>
            </div>

            <div className="p-5 border-b border-solid space-y-2">
                <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
                <p className="text-sm text-justify">{barbershop?.description}</p>
            </div>

        </div>
        
    )
}

export default BarbershopPage;