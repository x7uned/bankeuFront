'use client'

import { LuMinus } from "react-icons/lu";
import { CgPassword } from "react-icons/cg";
import { CiCreditCard1 } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward, IoMdColorPalette } from "react-icons/io";

import { Card } from "../statsContainer";
import { useState } from "react";

import AddCardModal from "./modals/addCard.modal";
import RemoveCardModal from "./modals/removeCard.modal";
import ChangeCardModal from "./modals/changeCard.modal";

import { useAppSelector } from '@/redux/slices/statsSlice';
import { selectIsAuth } from "@/redux/slices/authSlice";
import ChangeDesignModal from "./modals/changedesign.modal";

export function addSpacesToNumber(number: Number) {
  let strNumber = String(number);
  
  let result = '';
  
  for (let i = 0; i < strNumber.length; i++) {
      result += strNumber[i];
      
      if ((i + 1) % 4 === 0 && i !== strNumber.length - 1) {
          result += ' ';
      }
  }
  
  return result;
}

export function checkDesign(design: String) {
    switch (design) {
        case "black":
            return "bg-black";
        case "forest":
            return "bg-[url('/cards/forest.png')]";
        case "red": 
            return "bg-red-600";
        case "green": 
            return "bg-green-600";
        case "deepocean":
            return "bg-[url('/cards/deep-ocean.jpg')]";
        case "satoru":
            return "bg-[url('/cards/satoru.jpg')]";
        case "satorugif": 
            return "bg-[url('/cards/satorugif.gif')]";
        case "redgif": 
            return "bg-[url('/cards/redgif.gif')]"
    }
    
}

const CardsContainer = ({ data }: { data: Card }) => {
    const [addCardModal, setAddCardModal] = useState(false);
    const [removeCardModal, setRemoveCardModal] = useState(false);
    const [changeCardModal, setChangeCardModal] = useState(false);
    const [changeDesignModal, setChangeDesignModal] = useState(false)
    const isAuth = useAppSelector(selectIsAuth);

    const removeCard = async () => {
        if (isAuth && data) {
            setRemoveCardModal(true)
        } else {
            console.log('card not added')
        }
    }

    const CardCont = () => {
        return (
            <>
                <div>
                    <div className={`flex ${checkDesign(data.card_design)} text-white bg-center flex-col gap-12 card px-10 pt-8 h-48 rounded-t-3xl m-3 mt-10 w-auto`}>
                        <div className="flex w-full justify-between">
                            <p className="text-xl">{data.card_name}</p>
                            <p className="text-xl">HR</p>
                        </div>
                        <div className="flex w-full justify-center">
                            <p className="text-xl tracking-[.16em]">{addSpacesToNumber(data.card_number)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-10 mt-10 mr-3">
                    <div className="flex w-full px-3 cursor-pointer">
                        <CiCreditCard1 size={"24px"} color="gray" className="w-1/6" />
                        <p className="text-black font-medium w-5/6">Show Card Details</p>
                        <IoIosArrowForward size={"24px"} color="black" />
                    </div>
                    <div className="flex w-full px-3 cursor-pointer">
                        <CgPassword size={"20px"} color="gray" className="w-1/6" />
                        <p className="text-black font-medium w-5/6">Your PIN</p>
                        <IoIosArrowForward size={"24px"} color="black" />
                    </div>
                    <div onClick={() => {setChangeDesignModal(true)}} className="flex w-full px-3 cursor-pointer">
                        <IoMdColorPalette  size={"20px"} color="gray" className="w-1/6" />
                        <p className="text-black font-medium w-5/6">Change card design</p>
                        <IoIosArrowForward size={"24px"} color="black" />
                    </div>
                </div>
            </>
        );
    };

    const CardSelected = () => {
        if (!data?.card_name) {
            return (
                <div className="flex justify-center items-center h-52">
                    <p className="text-gray-500 text-xl">Card not selected</p>
                </div>
            );
        } else {
            return <CardCont />;
        }
    };

    return (
        <div className="w-3/4 h-auto p-3">
            <div className="flex items-center justify-between">
                <p className="text-gray-500 text-xl">Cards</p>
                <p onClick={() => {setChangeCardModal(true)}} className="text-violet-600 font-medium text-lg cursor-pointer">Change card</p>
            </div>
            <CardSelected />
            <AddCardModal active={addCardModal} setActive={setAddCardModal} />
            <RemoveCardModal active={removeCardModal} setActive={setRemoveCardModal} />
            <ChangeCardModal active={changeCardModal} setActive={setChangeCardModal} />
            <ChangeDesignModal active={changeDesignModal} setActive={setChangeDesignModal} card={data} />
            <div className="flex mt-12 ml-5 gap-12">
                <button onClick={() => { setAddCardModal(true) }} className="flex rounded-full items-center p-3 w-2/5 bg-violet-600 text-white">
                    <p className="w-2/3 text-base">Add Card</p>
                    <GoPlus size={"26px"} className="w-1/3" />
                </button>
                <button onClick={() => removeCard()} className="flex items-center p-3 w-2/5 text-red-600">
                    <p className="w-2/3 text-base">Remove</p>
                    <LuMinus size={"26px"} className="w-1/3" />
                </button>
            </div>
        </div>
    );
};

export default CardsContainer;
