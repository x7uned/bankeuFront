'use client';

import '@/app/css/modal.css';
import { LuWalletCards } from 'react-icons/lu';
import React, { useEffect, useState } from 'react';
import { Outfit } from 'next/font/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchGetCards, fetchSelectCard, useAppDispatch } from '@/redux/slices/statsSlice';
import { addSpacesToNumber, checkDesign } from '../cards';
import { ModalProps } from './addCard.modal';

const font = Outfit({ subsets: ['latin'], variable: '--font' });

interface MiniCard {
  id: number;
  card_name: string;
  card_number: number;
  card_design: string;
}

const CardCont: React.FC<{ data: MiniCard, onSelect: (id: number) => void }> = ({ data, onSelect }) => {
  return (
    <div className='w-[350px] h-52' key={data.id}>
      <div
        onClick={() => onSelect(data.id)}
        className={`flex flex-col bg-center ${checkDesign(data.card_design)} cursor-pointer gap-12 card bg-black px-10 pt-8 h-48 rounded-3xl m-3 mt-10 w-full`}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onSelect(data.id)}
      >
        <div className="flex w-full justify-between">
          <p className="text-xl">{data.card_name}</p>
          <p className="text-xl">HR</p>
        </div>
        <div className="flex w-full justify-center">
          <p className="text-xl w-full tracking-[.16em]">{addSpacesToNumber(data.card_number)}</p>
        </div>
      </div>
    </div>
  );
};

const ChangeCardModal: React.FC<ModalProps> = ({ active, setActive }) => {
  const dispatch = useAppDispatch();
  const [availableCards, setAvailableCards] = useState<MiniCard[]>([]);

  useEffect(() => {
    if (active) {
      changeCardFunc();
    }
  }, [active]);

  const changeCardFunc = async () => {
    try {
      const fetchCards = await dispatch(fetchGetCards());
      setAvailableCards(fetchCards.payload.cards);
    } catch (error) {
      console.error(error);
      toast.error(`Fetching card error: ${error}`);
    }
  };

  const selectCardFunc = async (id: number) => {
    try {
      await dispatch(fetchSelectCard(id));
      setActive(false);
      toast.success('Card selected successfully');
    } catch (error) {
      console.error(error);
      toast.error(`Selecting card error: ${error}`);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)} aria-modal="true">
        <div
          className={`modal__content ${font.className}`}
          style={{ width: '900px', minHeight: '600px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center flex-col gap-1">
            <div className="h-14">
              <LuWalletCards size="50px" color="black" />
            </div>
            <p className="text-black text-2xl font-medium">Select card</p>
            <div className="grid grid-cols-2 gap-x-2 w-[750px] justify-around overflow-y-auto h-[500px]">
              {availableCards.map((data) => (
                <CardCont key={data.id} data={data} onSelect={selectCardFunc} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeCardModal;
