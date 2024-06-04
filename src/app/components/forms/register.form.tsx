'use client'

import { NextPage } from "next";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from './form.module.css';
import { fetchRegister } from "@/redux/slices/authSlice";
import { useAppDispatch } from '@/redux/store';

import { IoMdEye, IoIosEyeOff  } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type FormValues = {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
};

const schema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().min(6, "Password is too short (min 6 symbols)").max(16, "Password is too long (max 16 symbols)").required("Password is required"),
  firstName: yup.string().matches(/^[a-zA-Zа-яА-Я\s]+$/, "First Name should contain only letters").min(2, "First Name is too short (min 2 symbols)").max(16, "First Name is too long (max 16 symbols)").required("First Name is required"),
  secondName: yup.string().matches(/^[a-zA-Zа-яА-Я\s]+$/, "First Name should contain only letters").min(2, "Second Name is too short (min 2 symbols)").max(16, "Second Name is too long (max 16 symbols)").required("Second Name is required"),
}).required();

const resolver: Resolver<FormValues> = yupResolver(schema);

const RegisterForm: NextPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver,
  });

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
        const response = await dispatch(fetchRegister(data)).unwrap();
        
        (response.success ? toast.success('Register successful!') : toast.error('An error occurred. Please try again.'))
    } catch (error) {
        console.error('Register failed:', error);
        toast.error('An error occurred. Please try again.');
    }
  };

  const togglePasswordVisibility: () => void = () => {
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            className={styles.input}
            {...register("email")}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            id="firstName"
            className={styles.input}
            {...register("firstName")}
          />
          {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="secondName" className={styles.label}>
            Second Name
          </label>
          <input
            id="secondName"
            className={styles.input}
            {...register("secondName")}
          />
          {errors.secondName && <p className={styles.error}>{errors.secondName.message}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className="flex w-full">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`${styles.input} w-full`}
              {...register("password")}
            />
            <button className="flex text-gray-500 ml-64 absolute w-10 h-10 items-center" type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <IoMdEye size="20px" /> : <IoIosEyeOff size="20px" />}
            </button>
          </div>
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        <button className={styles.button} type="submit">
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
