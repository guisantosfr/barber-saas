'use client'

import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchoptions } from "../_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { signOut, useSession } from "next-auth/react";
import SignInDialog from "./sign-in-dialog";

const Sidebar = () => {
  const { data } = useSession();

  const handleLogout = () => {
    signOut()
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between py-5 px-3 border-b border-solid gap-3">
        {
          data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.user?.image ?? ""} />
              </Avatar>

              <div>
                <p className="font-bold">{data.user.name}</p>
                <p className="text-sx">{data.user.email}</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-bold">Olá, faça seu login!</h2>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <LogInIcon />
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-[90%]">
                  <SignInDialog />
                </DialogContent>

              </Dialog>

            </>
          )
        }

      </div>

      <div className="flex flex-col gap-2 py-5 border-b border-solid">
        <SheetClose asChild>
          <Button className="gap-2 justify-start" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <Button className="gap-2 justify-start" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 py-5 border-b border-solid">
        {
          quickSearchoptions.map(option => (
            <SheetClose key={option.title} asChild>
              <Button className="gap-2 justify-start" variant="ghost" asChild>
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image alt={option.title} src={option.imageUrl} height={18} width={18} />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
      </div>

      {
        data?.user && (
          <div className="flex flex-col gap-2 py-5 border-b border-solid">
            <Button className="justify-start gap-2" variant="ghost" onClick={handleLogout}>
              <LogOutIcon size={18} />
              Sair da conta
            </Button>

          </div>
        )
      }

    </SheetContent>
  )
}

export default Sidebar;