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
import Search from "./_components/search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // if(!session?.user){
  //     return notFound();
  // }

  const barbershops = await prisma.barbershop.findMany({});
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: 'desc'
    }
  });

  const bookings = session?.user ?
    await prisma.booking.findMany({
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
    :
    []

  return (
    <>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold mb-2">Olá, {session?.user ? `${session.user.name}!` : 'bem-vindo!'}</h2>
        <p>
          {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })
            .replace(/^./, str => str.toUpperCase())}
        </p>

        <div className="my-6">
          <Search />
        </div>

        <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {
            quickSearchoptions.map(option => (
              <Button className="gap-2" variant="secondary" key={option.title} asChild>
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image src={option.imageUrl} width={16} height={16} alt={option.title} />
                  {option.title}
                </Link>
              </Button>
            ))
          }
        </div>

        <div className="relative w-full h-[150px] mt-6">
          <Image src="/banner-01.png" fill className="object-cover rounded-xl" alt="Agende nos melhores com FSW Barber" />
        </div>

        <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Agendamentos</h2>

        <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
          {
            bookings.map(booking => <BookingItem key={booking.id} booking={booking} />)
          }
        </div>

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
    </>
  );
}
