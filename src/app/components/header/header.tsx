'use client'

import { useEffect } from "react";
import { UserComponent } from "./user.component";
import { Outfit } from "next/font/google";
import { useAppDispatch } from "@/redux/store";
import { fetchAuthMe } from "@/redux/slices/authSlice";

const font = Outfit({ subsets: ["latin"], variable: '--mont',
 });

const NavComponent = () => {
    return (
        <nav className={`flex mr-12 w-3/5 items-center justify-around ${font.className}`}>
          <p className="text-black font-semibold text-lg cursor-pointer">Summary</p>
          <p className="text-gray-600 text-lg cursor-pointer">Cards</p>
          <p className="text-gray-600 text-lg cursor-pointer">Activity</p>
          <p className="text-gray-600 text-lg cursor-pointer">Recipients</p>
          <p className="text-gray-600 text-lg cursor-pointer">Help Center</p>
          <p className="text-gray-600 text-lg cursor-pointer">Earn Gifts</p>
        </nav>
    )
  }

export const HeaderContainer = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(fetchAuthMe())
    })

    return (
        <header className="flex bg-white w-full items-center justify-between pt-10 pb-10">
          <UserComponent />
          <NavComponent />
        </header>
    )
}