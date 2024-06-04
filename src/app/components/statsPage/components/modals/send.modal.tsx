'use client'

import '@/app/css/modal.css';
import React from 'react';
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { Outfit } from "next/font/google";
import { fetchTransfer, useAppDispatch } from '@/redux/slices/statsSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/app/components/forms/form.module.css';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from '../../statsContainer';

const font = Outfit({ subsets: ["latin"], variable: "--font" });

export type FormAddCardValues = {
    receiverNumber: number;
    sum: number;
};

interface SendModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
    data: Card;
}

const SendModal: React.FC<SendModalProps> = ({ active, setActive, data }) => {
    const dispatch = useAppDispatch();
    const balance = Math.round(Number(data?.balance_value));

    const schema = yup.object({
        receiverNumber: yup.number()
            .typeError("Addresser Number must be a number")
            .min(1000000000000000, "Addresser Number must be 16 digits")
            .max(9999999999999999, "Addresser Number must be 16 digits")
            .required("Addresser Number is required"),
        sum: yup.number()
            .typeError("Sum must be a number")
            .min(1, "Sum min 1")
            .max(balance, "You don't have that kind of money, broke :)")
            .required("Sum is required"),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm<FormAddCardValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (params: any) => {
        try {
            params.addresserNumber = data.card_number;
            params.receiverNumber = JSON.stringify(params.receiverNumber);
            await dispatch(fetchTransfer(params));
            toast.success('Transaction successful!');
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
                <div className={`modal__content ${font.className}`} style={{ width: '500px', height: '400px' }} onClick={(e) => { e.stopPropagation() }}>
                    <div className="flex text-black gap-2 items-center flex-col h-full">
                        <FaMoneyBillTransfer size="50px" />
                        <p className='text-2xl font-medium'>Create transaction</p>
                        <form className={styles.form} style={{ width: '400px' }} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="receiverNumber" className={styles.label}>
                                    <p className="text-black font-medium">Card Number</p>
                                </label>
                                <input
                                    type='number'
                                    id="receiverNumber"
                                    className={styles.input}
                                    {...register("receiverNumber")}
                                />
                                {errors.receiverNumber && <p className={styles.error}>{errors.receiverNumber.message}</p>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="sum" className={styles.label}>
                                    <p className="text-black font-medium">Sum</p>
                                </label>
                                <input
                                    type='number'
                                    id="sum"
                                    className={styles.input}
                                    {...register("sum")}
                                />
                                {errors.sum && <p className={styles.error}>{errors.sum.message}</p>}
                            </div>
                            <div className="flex w-full justify-around mt-3">
                                <button onClick={() => setActive(false)} className="flex items-center justify-center p-2 w-2/5 text-red-600">
                                    <p className="w-2/4 text-base font-medium">Cancel</p>
                                </button>
                                <button type="submit" className="flex justify-center rounded-full items-center p-2 w-2/5 bg-violet-600 text-white">
                                    <p className="w-2/4 text-base">Confirm</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default SendModal;