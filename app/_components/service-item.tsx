'use client'

import Image from 'next/image';
import { Barbershop, BarbershopService, Booking } from '../generated/prisma';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from './ui/sheet';
import { Calendar } from './ui/calendar';
import { ptBR } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';
import { isPast, isToday, set } from 'date-fns';
import { createBooking } from '../_actions/create-booking';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { getBookings } from '../_actions/get-bookings';
import { Dialog, DialogContent } from './ui/dialog';
import SignInDialog from './sign-in-dialog';
import BookingSummary from './booking-summary';
import { useRouter } from 'next/navigation';

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, 'name'>
}

interface GetTimeListProps {
    bookings: Booking[]
    selectedDate: Date | undefined
}

const TIME_LIST = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
]

const getTimeList = ({ bookings, selectedDate }: GetTimeListProps) => {
    const timeList = TIME_LIST.filter(time => {
        const [hours, minutes] = time.split(':');

        const timeIsOnPast = isPast(set(new Date(), { hours: Number(hours), minutes: Number(minutes) }))

        if (timeIsOnPast && isToday(selectedDate)) {
            return false;
        }

        const hasBookingOnCurrentTime = bookings.some(
            booking =>
                booking.date.getHours() === Number(hours) &&
                booking.date.getMinutes() === Number(minutes)
        )

        if (hasBookingOnCurrentTime) {
            return false;
        }

        return true;
    });

    return timeList;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const { data } = useSession();
    const router = useRouter();

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

    const [dateBookings, setDateBookings] = useState<Booking[]>([]);

    const [sheetOpen, setSheetOpen] = useState(false);
    const [signInDialogOpen, setSignInDialogOpen] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!selectedDate) return;

            const bookings = await getBookings({ date: selectedDate, serviceId: service.id })
            setDateBookings(bookings)
        }

        fetchBookings()
    }, [selectedDate, service.id])

    const selectedDateAndTime = useMemo(() => {
        if (!selectedDate || !selectedTime) return
        return set(selectedDate, {
            hours: Number(selectedTime.split(":")[0]),
            minutes: Number(selectedTime.split(":")[1]),
        })

    }, [selectedDate, selectedTime])

    const handleBookingClick = () => {
        if (data?.user) {
            return setSheetOpen(true)
        }

        return setSignInDialogOpen(true);
    }

    const handleSheetOpenChange = () => {
        setSelectedDate(undefined)
        setSelectedTime(undefined)
        setDateBookings([])
        setSheetOpen(false)
    }

    const handleDateSelected = (date: Date | undefined) => {
        setSelectedDate(date);
    }

    const handleTimeSelected = (time: string) => {
        setSelectedTime(time);
    }

    const handleCreateBooking = async () => {
        try {
            if (!selectedDateAndTime) return;

            await createBooking({
                serviceId: service.id,
                userId: (data?.user as any).id,
                date: selectedDateAndTime
            })

            toast.success('Reserva criada com sucesso', {
                action: {
                    label: "Ver agendamentos",
                    onClick: () => router.push('/bookings')
                }
            })
        } catch (error) {
            console.error(error)
            toast.error('Erro ao criar reserva')
        }
    }

    const timeList = useMemo(() => {
        if (!selectedDate) return;

        return getTimeList({
            bookings: dateBookings,
            selectedDate
        })
    }, [dateBookings, selectedDate])

    return (
        <>
            <Card>
                <CardContent className="flex items-center gap-3 p-3">
                    <div className="relative h-[110px] w-[110px]">
                        <Image src={service.imageUrl} alt={service.name} fill className="object-cover rounded-xl" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">{service.name}</h3>
                        <p className="text-gray-400 text-sm">{service.description}</p>

                        <div className="flex items-center justify-between">
                            <p className='text-sm font-bold text-primary'>
                                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(service.price))}
                            </p>

                            <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleBookingClick}
                                >
                                    Reservar
                                </Button>

                                <SheetContent className='px-0'>
                                    <SheetHeader>
                                        <SheetTitle>Fazer Reserva</SheetTitle>
                                    </SheetHeader>

                                    <div className="py-5 border-b border-solid">
                                        <Calendar
                                            mode="single"
                                            locale={ptBR}
                                            disabled={{ before: new Date() }}
                                            selected={selectedDate}
                                            onSelect={handleDateSelected}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize",
                                                },
                                            }}
                                        />

                                        {
                                            selectedDate && (
                                                <div className="p-5 border-b border-solid flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
                                                    {
                                                        timeList?.length > 0
                                                            ? timeList.map(time => (
                                                                <Button
                                                                    key={time}
                                                                    variant={selectedTime === time ? 'default' : 'outline'}
                                                                    className="rounded-full"
                                                                    onClick={() => handleTimeSelected(time)}>
                                                                    {time}
                                                                </Button>
                                                            )) : <p className='text-xs'>Não há horários disponíveis para este dia</p>
                                                    }
                                                </div>
                                            )
                                        }

                                        {
                                            selectedDateAndTime && (
                                                <div className="px-5 pt-5 pb-0">
                                                    <BookingSummary
                                                        barbershop={barbershop}
                                                        service={service}
                                                        selectedDate={selectedDateAndTime} />
                                                </div>
                                            )
                                        }
                                    </div>

                                    <SheetFooter className='px-5 mt-5'>
                                        <SheetClose asChild>
                                            <Button
                                                type="submit"
                                                onClick={handleCreateBooking}
                                                disabled={!selectedDate || !selectedTime}>
                                                Confirmar
                                            </Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={signInDialogOpen} onOpenChange={(open) => setSignInDialogOpen(open)}>
                <DialogContent className='w-[90%]'>
                    <SignInDialog />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ServiceItem;