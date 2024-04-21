import { Montserrat } from "next/font/google";

import shibo from "./shibo.jpg";
import Image from 'next/image'

// Icons
import { CiCreditCard1 } from "react-icons/ci";
import { IoIosArrowForward, IoMdArrowUp, IoMdArrowDown } from "react-icons/io";
import { CgPassword } from "react-icons/cg";
import { MdOutlineLock } from "react-icons/md";
import { SiScrollreveal } from "react-icons/si";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";

const mont = Montserrat({ subsets: ["latin"], variable: "--mont" });

export default function Home() {
  const contactsArray = [
    {
      name: "Denis",
      avatar: "",
    },
    {
      name: "Anna",
      avatar: "",
    },
    {
      name: "John",
      avatar: "",
    },
    {
      name: "Fridge",
      avatar: "",
    },
    {
      name: "Iron",
      avatar: "",
    },
    {
      name: "Mouse",
      avatar: "",
    },
    {
      name: "Denisssssss",
      avatar: "",
    },
    {
      name: "Anna",
      avatar: "",
    },
    {
      name: "Johnssss",
      avatar: "",
    },
    {
      name: "Fridge",
      avatar: "",
    },
    {
      name: "Iron",
      avatar: "",
    },
    {
      name: "Mouse",
      avatar: "",
    },
    {
      name: "Denis",
      avatar: "",
    },
    {
      name: "Anna",
      avatar: "",
    },
    {
      name: "John",
      avatar: "",
    },
    {
      name: "Fridge",
      avatar: "",
    },
    {
      name: "Iron",
      avatar: "",
    },
    {
      name: "Mouse",
      avatar: "",
    },
  ];

  const Contacts = ({ contacts }: { contacts: Array<{ name: string; avatar: string }> }) => {
    return (
        <div className="flex flex-row gap-6">
            {contacts.slice(0,20).map((contact, index) => (
              <div className="flex gap-3 w-14 items-center text-center flex-col" key={index}>
                <Image className="cursor-pointer rounded-full overflow-hidden" width={100} height={100} src={shibo} objectFit="cover" alt="Picture of the author" />
                <p className="text-gray-500 w-full truncate">
                    {contact.name}
                </p>
              </div>
            ))}
        </div>
    );
};


  const CardsContainer = () => {
    return (
      <div className="w-3/4 h-auto p-3">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-xl">Cards</p>
          <p className="text-violet-600 font-medium text-lg cursor-pointer">
            Show All
          </p>
        </div>
        <div>
          <div className="flex flex-col gap-12 card bg-black px-10 pt-8 h-48 rounded-t-3xl m-3 mt-10 w-auto">
            <div className="flex w-full justify-between">
              <p className="text-xl">Denis x7uned</p>
              <p className="text-xl">HR</p>
            </div>
            <div className="flex w-full justify-between">
              <p className="text-xl tracking-[.25em]">0123 4567 8910</p>
              <p className="bg-zinc-700 px-4 pt-1 rounded-xl">CVV</p>
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
          <div className="flex w-full px-3 cursor-pointer">
            <MdOutlineLock size={"20px"} color="gray" className="w-1/6" />
            <p className="text-black font-medium w-5/6">Security Code</p>
            <IoIosArrowForward size={"24px"} color="black" />
          </div>
          <div className="flex w-full px-3 cursor-pointer">
            <SiScrollreveal size={"20px"} color="gray" className="w-1/6" />
            <p className="text-black font-medium w-5/6">Edit Limits</p>
            <IoIosArrowForward size={"24px"} color="black" />
          </div>
        </div>
        <div className="flex mt-12 ml-5 gap-12">
          <button className="flex rounded-full items-center p-3 w-2/5 bg-violet-600 text-white">
            <p className="w-2/3 text-base">Add Card</p>
            <GoPlus size={"26px"} className="w-1/3" />
          </button>
          <button className="flex items-center p-3 w-2/5 text-red-600">
            <p className="w-2/3 text-base">Remove</p>
            <LuMinus size={"26px"} className="w-1/3" />
          </button>
        </div>
      </div>
    );
  };

  const BalanceContainer = () => {
    return (
      <div className={`flex w-1/3 p-3 flex-col gap-5 col-span-2 ${mont.className}`}>
        <p className="text-gray-500 text-xl">Total Balance</p>
        <div className="flex items-end">
          <p className="text-black font-semibold text-7xl">29,475.00</p>
          <p className="text-black text-gray-500 text-2xl mb-1 ml-5">USD</p>
        </div>
        <div className="flex w-full gap-4 items-center">
          <button className="flex rounded-full items-center justify-center p-3 w-1/3 bg-violet-600 text-white">
            <p className="w-2/4 text-base">Send</p>
            <IoMdArrowUp size={"20px"} className="w-1/4" />
          </button>
          <button className="flex items-center justify-center p-3 w-1/3 text-black">
            <p className="w-2/4 text-base ml-3">Request</p>
            <IoMdArrowDown size={"20px"} className="w-2/4 ml-5" />
          </button>
          <button className="flex items-center justify-center p-3 w-1/3 text-black">
            <p className="w-3/4 text-base ml-3">Top Up</p>
            <GoPlus size={"20px"} className="w-1/4" />
          </button>
        </div>
      </div>
    );
  };

  const ContactsContainer = () => {
    return (
      <div className={`flex p-3 w-full flex-col gap-5 col-span-2 ${mont.className}`}>
        <div className="flex w-5/6 items-center justify-between">
          <p className="text-gray-500 text-xl">Recent Contacts</p>
          <p className="text-violet-600 font-medium text-lg cursor-pointer">
            All Contacts
          </p>
        </div>
        <div className="flex gap-6 max-w-5xl items-start text-center flex-row overflow-hidden">
          <div className="flex gap-3 w-14 items-center text-center flex-col cursor-pointer">
            <div className="flex items-center justify-center size-14 border-dashed border-2 border-violet-600 rounded-full">
              <GoPlus size={"22px"} className="text-violet-600" />
            </div>
            <p className="text-gray-500">
              Add
            </p>
          </div>
          <Contacts contacts={contactsArray} />
        </div>
      </div>
    );
  };

  const TransactionsContainer = () => {
    return <div className="flex">Transactions Content</div>;
  };

  return (
    <main className="flex bg-white w-full min-h-screen pl-24">
      <aside className={`row-span-4 w-1/3 ${mont.className}`}>
        <CardsContainer />
      </aside>
      <article className="w-3/4 flex flex-col gap-16">
        <BalanceContainer />
        <ContactsContainer />
        <TransactionsContainer />
      </article>
    </main>
  );
}
