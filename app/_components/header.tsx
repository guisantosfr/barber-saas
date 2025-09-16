import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row justify-between items-center p-5">
        <Link href="/">
          <Image alt="FSW Barber" src="/logo.png" width={120} height={18} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <Sidebar />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header;