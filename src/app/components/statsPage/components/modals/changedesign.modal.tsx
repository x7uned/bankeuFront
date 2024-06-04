'use client';

import '@/app/css/modal.css';
import { MdOutlineDesignServices } from "react-icons/md";
import React from 'react';
import { Outfit } from 'next/font/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSetDesign, useAppDispatch } from '@/redux/slices/statsSlice';
import { addSpacesToNumber, checkDesign } from '../cards';
import { Card } from '../../statsContainer';

interface ChangeCard {
  active: boolean;
  setActive: (active: boolean) => void;
  card: Card;
}

const font = Outfit({ subsets: ['latin'], variable: '--font' });

const ChangeDesignModal: React.FC<ChangeCard> = ({ active, setActive, card }) => {
  const dispatch = useAppDispatch();
 
  const designs = ["black", "red", "green", "forest", "deepocean", "satoru", "satorugif", "redgif"];

  const selectDesign = async (design: string, id: number) => {
    try {
      const fetchArray = {design, id};
      await dispatch(fetchSetDesign(fetchArray));
      toast.success('Card selected successfully');
      setActive(false)
    } catch (error) {
      console.error(error);
      toast.error('Selecting card error');
    }
  };

  const CardCont: React.FC<{ design: string; index: number }> = ({ design, index }) => {
    return (
      <div className='w-full h-52' key={index}>
        <div onClick={() => selectDesign(design, card.id)} className={`flex flex-col bg-center ${checkDesign(design)} cursor-pointer gap-12 card bg-black px-10 pt-8 h-48 rounded-3xl m-3 mt-10`}>
          <div className="flex w-full justify-between">
            <p className="text-xl">{card.card_name}</p>
            <p className="text-xl">HR</p>
          </div>
          <div className="flex w-full justify-center">
            <p className="text-xl w-full tracking-[.16em]">{addSpacesToNumber(card.card_number)}</p>
          </div>
        </div>
      </div>
    );
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
      <div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
        <div
          className={`modal__content ${font.className}`}
          style={{ width: '900px', minHeight: '200px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center flex-col gap-1">
            <div className="h-14">
              <MdOutlineDesignServices size="50px" color="black" />
            </div>
            <p className="text-black text-2xl font-medium">Select design</p>
            <div className="grid grid-cols-2 gap-1 w-full justify-around mt-3 overflow-y-auto" style={{ maxHeight: '450px' }}>
              {designs.map((design, index) => (
                <CardCont key={index} design={design} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeDesignModal;
