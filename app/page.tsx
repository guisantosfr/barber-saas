import { EyeIcon, FootprintsIcon, SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { Badge } from "./_components/ui/badge";
import { prisma } from "./_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";
import { quickSearchoptions } from "./_constants/search";
import BookingItem from "./_components/booking-item";

export default async function Home() {
  const barbershops = await prisma.barbershop.findMany({});
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: 'desc'
    }
  });

  return (
    <>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Guilherme</h2>
        <p>Segunda-feira, 08 de setembro</p>

        <div className="flex items-center gap-2 my-6">
          <Input placeholder="Faça sua busca " />

          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {
            quickSearchoptions.map(option => (
              <Button className="gap-2" variant="secondary" key={option.title}>
                <Image src={option.imageUrl} width={16} height={16} alt={option.title} />
                {option.title}
              </Button>
            ))
          }
        </div>

        <div className="relative w-full h-[150px] mt-6">
          <Image src="/banner-01.png" fill className="object-cover rounded-xl" alt="Agende nos melhores com FSW Barber" />
        </div>

        <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Agendamentos</h2>

        <BookingItem />

        <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Recomendados</h2>

        <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
          {
            barbershops.map(barbershop =>
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            )
          }
        </div>

        <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Populares</h2>

        <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
          {
            popularBarbershops.map(barbershop =>
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            )
          }
        </div>
      </div>

      <footer>
        <Card className="py-6 px-5">
          <CardContent>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Copyright <span className="font-bold">FSW Barber</span>.</p>
          </CardContent>
        </Card>
      </footer>
    </>
  );
}
