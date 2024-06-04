'use client'

import Image from 'next/image';
import picture from '../../img/image.jpg'
import Link from 'next/link';

import { Outfit } from "next/font/google";
import RegisterForm from '../components/forms/register.form';
import { useAppSelector } from '@/redux/store';
import { selectIsAuth } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

const font = Outfit({ subsets: ["latin"], variable: '--ourfit',
 });

const Register: React.FC = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const router = useRouter()

    if(isAuth) {
        router.push('/');
    }
    
    return (
        <div className={`flex w-screen items-center text-black ${font.className}`}>
            <div className="flex w-1/2 justify-end hue-rotate-30 items-end">
                <Image 
                width={600} 
                src={picture} 
                objectFit="cover" 
                alt="Picture of the author" />
            </div>
            <div className="flex w-1/2 items-start pl-20 mt-10 h-full flex-col">
                <div className="flex flex-col h-full items-center justify-center">
                    <p className='text-3xl'>Sign up</p> 
                    <p className='text-lg mt-3 text-gray-600'>Please enter your details</p>
                    <RegisterForm />
                    <div className="flex gap-2">
                        <p>Already have an account?</p>
                        <Link href="/login">
                            <p className='text-violet-600 underline'>
                            Login now
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;