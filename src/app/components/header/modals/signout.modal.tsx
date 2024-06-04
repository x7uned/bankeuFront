'use client'

import '@/app/css/modal.css';
import { PiSignOutBold } from "react-icons/pi";
import React from 'react';
import { Outfit } from "next/font/google";
import { useAppDispatch } from '@/redux/slices/statsSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { logout } from '@/redux/slices/authSlice';

const font = Outfit({ subsets: ["latin"], variable: "--font" });

interface ModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
}

const SignOutModal: React.FC<ModalProps> = ({ active, setActive }) => {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const onClickLogout = async () => {
        try {
            await dispatch(logout())
            window.localStorage.removeItem('token')
            return router.push('/login')
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('An error occurred. Please try again.');
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
                        <PiSignOutBold size="50px" color="red" />
                        </div>
                        <p className="text-black text-xl font-medium">Confirm account logout</p>
                        <p className="text-gray-500 text-xl">Do you really want to logout of your account?</p>
                        <div className="flex w-4/5 justify-around mt-3">
                            <button onClick={() => setActive(false)} className="flex items-center justify-center p-2 w-2/5 text-red-600">
                                <p className="w-2/4 text-base font-medium">Cancel</p>
                            </button>
                            <button onClick={() => onClickLogout()} className="flex justify-center rounded-full items-center p-2 w-2/5 bg-violet-600 text-white">
                                <p className="w-2/4 text-base">Confirm</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default SignOutModal;