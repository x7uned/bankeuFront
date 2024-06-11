'use client'

import { fetchChangePIN } from "@/redux/slices/cardsSlice";
import { useAppDispatch } from "@/redux/store";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './form.module.css';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { SerializedError } from '@reduxjs/toolkit';

export type FormChangePINValues = {
    old_pin: number;
    new_pin: number;
};

const schema = yup.object({
    old_pin: yup.number()
        .typeError("PIN must be a number")
        .min(0, "PIN must be 4 digits")
        .max(9999, "PIN must be 4 digits")
        .required("PIN is required"),
    new_pin: yup.number()
        .typeError("PIN must be a number")
        .min(0, "PIN must be 4 digits")
        .max(9999, "PIN must be 4 digits")
        .required("PIN is required"),
}).required();

const ChangePINForm = ({ id }: {id: number}) => {
    const dispatch = useAppDispatch();
    const [showOldPIN, setShowOldPIN] = useState(true);
    const [showNewPIN, setShowNewPIN] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm<FormChangePINValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            let params = data;
            params.id = id;
            const response = await dispatch(fetchChangePIN(params));
            
            if (response.meta.requestStatus === 'fulfilled') {
                toast.success('PIN changed successfully!');
            } else if (response.meta.requestStatus === 'rejected') {
                const error = response.payload as SerializedError;
                const errorMessage = error.message || 'Error changing pin!';
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error('Adding card failed:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    const toggleShow = (option: number) => {
        if(option == 1) {
            setShowOldPIN((prevState) => !prevState);
        } else if (option == 2) {
            setShowNewPIN((prevState) => !prevState);
        }
    };

    return (
        <div>
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
            <form className={styles.form} style={{ width: '300px' }} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup} style={{width: '300px'}}>
                    <label htmlFor="card_pin" className={styles.label}>
                        <p className="text-black font-medium">Old PIN</p>
                    </label>
                    <div className="flex w-full relative">
                        <input
                            id="card_pin"
                            type={showOldPIN ? "text" : "password"}
                            className={`${styles.input} w-full`}
                            {...register("old_pin")}
                            minLength={4}
                            maxLength={4}
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" type="button" onClick={() => toggleShow(1)}>
                            {showOldPIN ? <IoMdEye size="20px" /> : <IoIosEyeOff size="20px" />}
                        </button>
                    </div>
                    {errors.old_pin && <p className={styles.error}>{errors.old_pin.message}</p>}
                </div>
                <div className={styles.inputGroup} style={{width: '300px'}}>
                    <label htmlFor="card_pin" className={styles.label}>
                        <p className="text-black font-medium">New PIN</p>
                    </label>
                    <div className="flex w-full relative">
                        <input
                            id="card_pin"
                            type={showNewPIN ? "text" : "password"}
                            className={`${styles.input} w-full`}
                            {...register("new_pin")}
                            minLength={4}
                            maxLength={4}
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" type="button" onClick={() => toggleShow(2)}>
                            {showNewPIN ? <IoMdEye size="20px" /> : <IoIosEyeOff size="20px" />}
                        </button>
                    </div>
                    {errors.new_pin && <p className={styles.error}>{errors.new_pin.message}</p>}
                </div>
                <button className={styles.button} style={{ fontWeight: '500', width: '300px' }} type="submit">
                    APPLY
                </button>
            </form>
        </div>
    );
};

export default ChangePINForm;
