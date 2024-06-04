'use client'

import { fetchCreateCard } from "@/redux/slices/cardsSlice";
import { useAppDispatch } from "@/redux/store";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './form.module.css';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import Link from "next/link";

export type FormCreateCardValues = {
    card_name: string;
    card_number: number;
    card_pin: number;
};

const schema = yup.object({
    card_name: yup.string().typeError("Card Name must be a string").required("Card Name is required"),  
    card_number: yup.number().typeError("Card Number must be a number").min(1000000000000000, "Card Number must be 16 digits").max(9999999999999999, "Card Number must be 16 digits").required("Card Number is required"),
    card_pin: yup.number().typeError("PIN must be a number").min(0, "PIN must be 4 digits").max(9999, "PIN must be 4 digits").required("PIN is required"),
}).required();

const CreateCardForm = () => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormCreateCardValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormCreateCardValues) => {
        try {
            const response = await dispatch(fetchCreateCard(data));
            if (response.meta.requestStatus === 'fulfilled') {
                toast.success('Card added successfully!');
            } else {
                toast.error('Error adding card!');
            }
        } catch (error) {
            console.error('Adding card failed:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
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
            <form className={styles.form} style={{width: '400px'}} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <label htmlFor="card_name" className={styles.label}>
                        <p className="text-black font-medium">Card Name</p>
                    </label>
                    <input
                        minLength={4}
                        maxLength={20}
                        id="card_name"
                        className={styles.input}
                        {...register("card_name")}
                    />
                    {errors.card_name && <p className={styles.error}>{errors.card_name.message}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="card_number" className={styles.label}>
                        <p className="text-black font-medium">Card Number</p>
                    </label>
                    <input
                        minLength={16}
                        maxLength={16}
                        id="card_number"
                        className={styles.input}
                        {...register("card_number")}
                    />
                    {errors.card_number && <p className={styles.error}>{errors.card_number.message}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="card_pin" className={styles.label}>
                        <p className="text-black font-medium">Card PIN</p>
                    </label>
                    <div className="flex w-full relative">
                        <input
                            id="card_pin"
                            type={showPassword ? "text" : "password"}
                            className={`${styles.input} w-full`}
                            {...register("card_pin")}
                            minLength={4}
                            maxLength={4}
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? <IoMdEye size="20px" /> : <IoIosEyeOff size="20px" />}
                        </button>
                    </div>
                    {errors.card_pin && <p className={styles.error}>{errors.card_pin.message}</p>}
                </div>
                <button className={styles.button} style={{fontWeight: '500'}} type="submit">
                    CREATE CARD
                </button>
            </form>
            <div className="w-full flex flex-col items-center gap-5">
                <p className="text-gray-500">OR</p>
                <Link href="/createcard">
                    <button className={"w-full text-black font-medium"} type="submit">
                        DASHBOARD
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CreateCardForm;
