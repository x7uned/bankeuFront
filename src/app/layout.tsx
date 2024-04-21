import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import logo from "./logo.png";
import shibo from "./shibo.jpg";
import Image from 'next/image'

const mont = Montserrat({ subsets: ["latin"], variable: '--mont',
 });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const NavComponent = () => {
  return (
      <nav className={`flex mr-12 w-3/5 items-center justify-around ${mont.className}`}>
        <p className="text-black font-semibold text-lg cursor-pointer">Summary</p>
        <p className="text-gray-600 text-lg cursor-pointer">Cards</p>
        <p className="text-gray-600 text-lg cursor-pointer">Activity</p>
        <p className="text-gray-600 text-lg cursor-pointer">Recipients</p>
        <p className="text-gray-600 text-lg cursor-pointer">Help Center</p>
        <p className="text-gray-600 text-lg cursor-pointer">Earn Gifts</p>
      </nav>
  )
}

const UserComponent = () => { 
  return (
      <div className="flex w-1/4 items-center justify-between ml-10">
        <Image
            src={logo}
            width={80}
            height={80}
            alt="Picture of the author"
            className="cursor-pointer"
          />
        <div className={`flex text-black text-lg ${mont.className}`}>Welcome back, <p className="text-violet-600 font-medium text-xl ml-2">x7uned</p></div>
        <Image className="cursor-pointer rounded-full overflow-hidden" width={40} height={40} src={shibo} objectFit="cover" alt="Picture of the author" />
      </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="flex bg-white w-full items-center justify-between pt-10 pb-10">
          <UserComponent />
          <NavComponent />
        </header>
        {children}
      </body>
    </html>
  );
}