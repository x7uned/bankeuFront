'use client'

import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from './form.module.css';
import { fetchLogin } from "@/redux/slices/authSlice";
import { useAppDispatch } from '@/redux/store';

import { IoMdEye, IoIosEyeOff  } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().min(6, "Password is so short (min 6 symbols)").max(16, "Password is so long (max 16 symbols)").required("Password is required"),
}).required();

const FormLogin: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
        // Используйте dispatch для отправки fetchLogin
        const response = await dispatch(fetchLogin(data)).unwrap();
        
        if (response.token) {
            localStorage.setItem('token', response.token)
            window.location.reload();
        } else {
            toast.error('Login error!');
        }
    } catch (error) {
        // Обработка ошибок
        console.error('Login failed:', error);
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
        <div className={`${styles.inputGroup}`}>
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
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
