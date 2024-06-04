'use client'

import React, { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoMdArrowUp, IoMdArrowDown } from "react-icons/io";
import SendModal from "./modals/send.modal";

function convertNumberFormat(number: string) {
  if (!number) {
    return "0,00";
  }

  let parts = number.split('.');
  let integerPart = parts[0];
  let decimalPart = parts[1] || '00';

  let withThousandSeparators = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return withThousandSeparators + ',' + decimalPart;
}

const BalanceContainer = ({ data }: {data: any}) => {
  const balanceRef = useRef(null);
  const [sendModalActive, setSendModalActive] = useState(false)

  useEffect(() => {
    const finalBalance = parseFloat(data?.balance_value || "0");
    const duration = 2000;
    const start = Date.now();

    const updateBalance = () => {
      const elapsedTime = Date.now() - start;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentBalance = finalBalance * progress;
      if (balanceRef.current) {
        balanceRef.current.textContent = convertNumberFormat(currentBalance.toFixed(2).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(updateBalance);
      } else {
        if (balanceRef.current) {
          balanceRef.current.textContent = convertNumberFormat(finalBalance.toFixed(2).toString());
        }
      }
    };

    requestAnimationFrame(updateBalance);
  }, [data?.balance_value]);

  return (
    <>
      <SendModal active={sendModalActive} setActive={setSendModalActive} data={data} />
      <div className={`flex w-full p-3 flex-col gap-5 col-span-2`}>
        <p className="text-gray-500 text-xl">Total Balance</p>
        <div className="flex items-end">
          <p ref={balanceRef} className="text-black font-semibold text-7xl">0,00</p>
          <p className="text-gray-500 text-2xl mb-1 ml-5">USD</p>
        </div>
        <div className="flex w-full gap-4 items-center">
          <button onClick={() => setSendModalActive(true)} className="flex rounded-full items-center justify-center p-3 w-36 bg-violet-600 text-white">
            <p className="w-2/4 text-base">Send</p>
            <IoMdArrowUp size={"20px"} className="w-1/4" />
          </button>
          <button className="flex items-center justify-center p-3 w-36 text-black">
            <p className="w-2/4 text-base ml-3">Request</p>
            <IoMdArrowDown size={"20px"} className="w-2/4 ml-5" />
          </button>
          <button className="flex items-center justify-center p-3 w-36 text-black">
            <p className="w-3/4 text-base ml-3">Promo</p>
            <GoPlus size={"20px"} className="w-1/4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BalanceContainer;
