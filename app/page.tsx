import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
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
import { getConfirmedBookings } from "./_data/get-confirmed-bookings";
import { notFound } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const barbershops = await prisma.barbershop.findMany({});
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: 'desc'
    }
  });

  const bookings = await getConfirmedBookings();

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

        {
          bookings.length > 0 && (
            <>
              <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Agendamentos</h2>

              <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
                {
                  bookings.map(booking => (
                  <BookingItem 
                  key={booking.id} 
                  booking={JSON.parse(JSON.stringify(booking))} />
                  ))
                }
              </div>
            </>
          )
        }

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
