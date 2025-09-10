import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchoptions } from "../_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
    return (
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center py-5 border-b border-solid gap-3">
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/32960040?v=4" />
              </Avatar>

              <div>
                <p className="font-bold">Guilherme Santos</p>
                <p className="text-sx">santosgui678@gmail.com</p>
              </div>
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
                  <Button className="gap-2 justify-start" variant="ghost" key={option.title}>
                    <Image alt={option.title} src={option.imageUrl} height={18} width={18} />
                    {option.title}
                  </Button>
                ))}
            </div>

            <div className="flex flex-col gap-2 py-5 border-b border-solid">
              <Button className="justify-start gap-2" variant="ghost">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>

            </div>


          </SheetContent>
    )
}

export default Sidebar;