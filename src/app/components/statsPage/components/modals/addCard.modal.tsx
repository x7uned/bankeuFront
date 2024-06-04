import '@/app/css/modal.css'
import React from 'react';
import { Outfit } from "next/font/google";
import Image from 'next/image';
import card from './credit-card.png'
import AddCardForm from '@/app/components/forms/addCard.form';

const font = Outfit({ subsets: ["latin"], variable: "--font" });

export interface ModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
}

const AddCardModal: React.FC<ModalProps> = ({ active, setActive }) => {
    return (
        <div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
            <div className={`modal__content ${font.className}`} style={{ width: '500px', height: '550px' }} onClick={(e) => { e.stopPropagation() }}>
                <div className="flex items-center flex-col gap-1">
                    <div className="h-14">
                    <Image
                     className="hue-rotate-60"
                     width={40}
                     height={40} 
                     src={card}
                     objectFit="cover" 
                     alt="Picture of the author" />
                    </div>
                    <p className="text-black text-xl font-medium">Add your card</p>
                    <p className="text-gray-500 text-xl">New payment method</p>
                </div>
                <AddCardForm />
            </div>
        </div>
    );
}

export default AddCardModal;