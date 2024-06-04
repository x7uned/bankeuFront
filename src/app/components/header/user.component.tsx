'use client'

import logo from "@/img/logo.png";
import shibo from './shibo.jpg'
import Image from 'next/image';
import Link from "next/link";
import { Outfit } from "next/font/google";
import { useSelector } from "react-redux";
import { selectIsAuth, userData } from "@/redux/slices/authSlice";
import './userMenu.css';

import { MdOutlineEdit, MdOutlineSettings } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import SignOutModal from "./modals/signout.modal";
import { useState } from "react";

const font = Outfit({ subsets: ["latin"], variable: '--mont'});

export const UserComponent = () => { 
    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(userData);
    const [signOutModalActive, setSignOutModalActive] = useState(false)

    const ifAuthComponent = (isAuth: Boolean) => {
        if (isAuth) {
            const data = user.userData
            return (
              <>
                <SignOutModal active={signOutModalActive} setActive={setSignOutModalActive} />
                <div className={`flex text-black text-lg ${font.className}`}>Welcome back, <p className="text-violet-600 font-medium text-xl ml-2">{`${data.first_name} ${data.second_name}`}</p></div>
                <div className="flex justify-center">
                  <div className="triggerD cursor-pointer">
                    <Image className="rounded-full overflow-hidden" 
                    width={40} 
                    height={40} 
                    src={shibo}
                    objectFit="cover" 
                    alt="Picture of the author" />
                  </div>
                  <div className={`userMenu border p-1 flex flex-col items-center justify-around ${font.className}`}>
                    <div className="flex cursor-pointer justify-center items-center gap-1 w-full">
                      <MdOutlineEdit size="18px" color="black" />
                      <p className="text-black">Change profile</p>
                    </div>
                    <div className="flex cursor-pointer justify-center items-center gap-1 w-full">
                      <MdOutlineSettings size="18px" color="black" />
                      <p className="text-black">Options</p>
                    </div>
                    <div onClick={() => setSignOutModalActive(true)} className="flex cursor-pointer justify-center items-center gap-1 w-full">
                      <PiSignOutBold size="18px" color="red" />
                      <p className="text-red-500">Sign out</p>
                    </div>
                  </div>
                </div>
              </>
            )
        } else {
            return (
              <Link href="/login">
                <p className="text-violet-600 font-medium text-xl ml-2">Sign Up</p>
              </Link> 
            )
        }
    }

    return (
        <div className="flex w-1/4 items-center justify-between ml-10">
          <Link href="/">
            <Image
              src={logo}
              width={80}
              height={80}
              alt="Picture of the author"
              className="cursor-pointer"
            />
          </Link>
          {ifAuthComponent(isAuth)}
        </div>
    )
  }