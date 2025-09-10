import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Barbershop } from "../generated/prisma";
import { StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface BarberShopItemProps {
  barbershop: Barbershop
}

const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl p-0">
      <CardContent className="p-0 px-1 pt-1">
        <div className="relative h-[159px] w-full">
          <Image alt={barbershop.name} fill className="object-cover rounded-2xl" src={barbershop.imageUrl} />

          <Badge className="absolute left-2 top-2 z-10 space-x-1" variant="secondary">
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        <div className="py-3 px-1">
          <h3 className="font-semibold truncate">{barbershop.name}</h3>

          <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>

          <Button 
          variant="secondary"
          className="mt-3 w-full"
          asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarberShopItem;