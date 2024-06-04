'use client'

import '@/app/css/modal.css';
import { IoMdRemoveCircleOutline } from "react-icons/io";
import React from 'react';
import { Outfit } from "next/font/google";
import { ModalProps } from './addCard.modal';
import { fetchRemoveCard, useAppDispatch } from '@/redux/slices/statsSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const font = Outfit({ subsets: ["latin"], variable: "--font" });

const RemoveCardModal: React.FC<ModalProps> = ({ active, setActive }) => {
    const dispatch = useAppDispatch();

    const fetchFunc = async () => {
        try {
            await dispatch(fetchRemoveCard());
            toast.success('Card removing successful!');
            setActive(false)
        } catch (error) {
            console.error(error);
            toast.error('Removing card error');
        }
    }

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
                <div className={`modal__content ${font.className}`} style={{ width: '500px', height: '240px' }} onClick={(e) => { e.stopPropagation() }}>
                    <div className="flex items-center flex-col gap-1">
                        <div className="h-14">
                        <IoMdRemoveCircleOutline size="50px" color="red" />
                        </div>
                        <p className="text-black text-xl font-medium">Confirm card removing</p>
                        <p className="text-gray-500 text-xl">Are you sure you want remove your card?</p>
                        <div className="flex w-4/5 justify-around mt-3">
                            <button onClick={() => setActive(false)} className="flex items-center justify-center p-2 w-2/5 text-red-600">
                                <p className="w-2/4 text-base font-medium">Cancel</p>
                            </button>
                            <button onClick={() => fetchFunc()} className="flex justify-center rounded-full items-center p-2 w-2/5 bg-violet-600 text-white">
                                <p className="w-2/4 text-base">Confirm</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default RemoveCardModal;