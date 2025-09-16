'use client'

import Image from 'next/image';
import { BarbershopService } from '../generated/prisma';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';
import { Calendar } from './ui/calendar';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

interface ServiceItemProps {
    service: BarbershopService
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

const ServiceItem = ({ service }: ServiceItemProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

    const handleDateSelected = (date: Date | undefined) => {
        setSelectedDate(date);
    }

    const handleTimeSelected = (time: string) => {
        setSelectedTime(time);
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
                                            <div className="p-5 flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
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
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ServiceItem;