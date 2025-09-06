import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import Image from "next/image";

export default function Home() {
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
          <Image src="/banner-01.png" fill className="object-cover rounded-xl" alt="Agende nos melhores com FSW Barber"/>
        </div>


      </div>

    </>
  );
}
