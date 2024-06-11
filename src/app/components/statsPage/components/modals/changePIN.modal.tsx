import '@/app/css/modal.css';
import { FaTableCellsRowLock } from "react-icons/fa6";
import React from 'react';
import { Outfit } from 'next/font/google';
import ChangePINForm from '@/app/components/forms/changePIN.form';

const font = Outfit({ subsets: ['latin'], variable: '--font' });

interface ChangePIN {
    active: boolean;
    setActive: (active: boolean) => void;
    id: number;
}

export interface FormChangePIN {
    card_number: string;
    new_pin: number;
    old_pin: number;
}

const ChangePINModal: React.FC<ChangePIN> = ({ active, setActive, id }) => {
  return (
    <>
      <div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
        <div
          className={`modal__content ${font.className}`}
          style={{ width: '400px', minHeight: '200px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center flex-col gap-1">
            <div className="h-14">
              <FaTableCellsRowLock size="50px" color="black" />
            </div>
            <p className="text-black text-2xl font-medium">Change PIN</p>
            <div className="flex flex-col w-full justify-around mt-3 overflow-y-auto">
                <ChangePINForm id={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePINModal;
