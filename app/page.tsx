import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { Badge } from "./_components/ui/badge";
import { prisma } from "./_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";

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

        <div className="flex items-center gap-2 mt-6">
          <Input placeholder="Faça sua busca " />

          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative w-full h-[150px] mt-6">
          <Image src="/banner-01.png" fill className="object-cover rounded-xl" alt="Agende nos melhores com FSW Barber" />
        </div>

        <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Agendamentos</h2>

        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"></AvatarImage>
                </Avatar>

                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
              <p className="text-sm">Setembro</p>
              <p className="text-2xl">08</p>
              <p className="text-sm">10:00</p>
            </div>
          </CardContent>
        </Card>

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
            <p className="text-sm text-gray-400">© { new Date().getFullYear() } Copyright <span className="font-bold">FSW Barber</span>.</p>

          </CardContent>
        </Card>
      </footer>
    </>
  );
}
