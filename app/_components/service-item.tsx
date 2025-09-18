'use client'

import Image from 'next/image';
import { Barbershop, BarbershopService } from '../generated/prisma';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from './ui/sheet';
import { Calendar } from './ui/calendar';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { format, set, setHours, setMinutes } from 'date-fns';
import { createBooking } from '../_actions/create-booking';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, 'name'>
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

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const { data } = useSession();

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

    const handleDateSelected = (date: Date | undefined) => {
        setSelectedDate(date);
    }

    const handleTimeSelected = (time: string) => {
        setSelectedTime(time);
    }

    const handleCreateBooking = async () => {
        try{
            if(!selectedDate || !selectedTime) return;
    
            const [hours, minutes] = selectedTime.split(':');
            
            const newDate = set(selectedDate, {
                minutes: Number(minutes),
                hours: Number(hours)
            })
           
            await createBooking({
                serviceId: service.id,
                userId: 'cmflpzqfx0000kuoil2ob6teo',
                date: newDate
            })

            toast.success('Reserva criada com sucesso')
        } catch (error){
            console.error(error)
            toast.error('Erro ao criar reserva')
        }
    }

    return (
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

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="secondary" size="sm">Reservar</Button>
                            </SheetTrigger>

                            <SheetContent className='px-0'>
                                <SheetTitle>Fazer Reserva</SheetTitle>

                                <div className="py-5 border-b border-solid">
                                    <Calendar
                                        mode="single"
                                        locale={ptBR}
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
                                                    TIME_LIST.map(time => (
                                                        <Button
                                                            key={time}
                                                            variant={selectedTime === time ? 'default' : 'outline'}
                                                            className="rounded-full"
                                                            onClick={() => handleTimeSelected(time)}>
                                                            {time}
                                                        </Button>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }

                                    {
                                        (selectedDate && selectedTime) && (
                                            <div className="px-5 pt-5 pb-0">
                                                <Card>
                                                    <CardContent className="p-3 space-y-3">
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="font-bold">{service.name}</h2>
                                                            <p className="text-sm font-bold">
                                                                {
                                                                    Intl.NumberFormat("pt-BR", {
                                                                        style: "currency",
                                                                        currency: "BRL",
                                                                    }).format(Number(service.price))
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-sm text-gray-400">Data</h2>
                                                            <p className="text-sm">
                                                                {
                                                                    format(selectedDate, "d 'de' MMMM", {
                                                                        locale: ptBR
                                                                    }
                                                                    )
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-sm text-gray-400">Horário</h2>
                                                            <p className="text-sm">
                                                                {
                                                                    selectedTime
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                                                            <p className="text-sm">
                                                                {
                                                                    barbershop.name
                                                                }
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )
                                    }
                                </div>

                                <SheetFooter className='px-5'>
                                    <SheetClose asChild>
                                        <Button type="submit" onClick={handleCreateBooking}>Confirmar</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ServiceItem;