import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
// import { signIn, signOut, useSession } from "next-auth/client";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
// import { useSelector } from "react-redux";
// import { selectItems } from "../slices/basketSlice";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const basketData = useSelector(selectItems);

  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow ">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            className="cursor-pointer"
            src="https://links.papareact.com/f90"
            width={130}
            height={30}
            objectFit="contain"
          />
        </div>

        <div className="hidden sm:flex items-center h-10 flex-grow bg-yellow-400 cursor-pointer hover:bg-yellow-500 rounded-md">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className="link">
            {session ? (
              <p>Witaj, {session?.user.name}!</p>
            ) : (
              <p>Zaloguj się!</p>
            )}
            <p className="font-extrabold sm:text-sm">Konto & Listy</p>
          </div>

          <div className="link">
            <p>Zwroty</p>
            <p className="font-extrabold sm:text-sm">& Zamówienia</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="flex items-center link relative"
          >
            <span className="absolute top-2 right-1 md:right-12 bg-yellow-400 h-4 w-4 text-center rounded-full font-bold text-black">
              {basketData?.length}
            </span>

            <ShoppingCartIcon className="h-8" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Koszyk
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center  whitespace-nowrap bg-amazon_blue-light text-white font-medium p-2 text-sm">
        <div className="bottomHeader">
          <MenuIcon className="h-6 mr-1" />
          <p className="mr-0">Menu</p>
        </div>
        <p className="bottomHeader">Okazje</p>
        <p className="bottomHeader">Bestsellery</p>
        <p className="bottomHeader">Karty podarunkowe</p>
        <p className="hidden bottomHeader md:flex">Sprzedawaj na Amazon</p>
        <p className="hidden bottomHeader sm:flex">Dział Obsługi Klienta</p>

        <p className="hidden bottomHeader lg:flex ml-auto">
          Darmowa dostawa dla zamówień powyżej 100zł
        </p>
      </div>
    </header>
  );
}

export default Header;
