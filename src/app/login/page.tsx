'use client'

import FormLogin from '../components/forms/login.form';
import Link from 'next/link';
import Image from 'next/image';
import picture from '../../img/pic.jpg';
import { useAppSelector } from '@/redux/store';
import { selectIsAuth } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const router = useRouter()

    if(isAuth) {
        router.push('/');
    }

    return (
        <div className="flex w-screen items-center text-black">
            <div className="flex w-1/2 pr-20 mt-10 h-full flex-col items-end">
                <div className="flex flex-col h-full items-center justify-center">
                    <p className="text-3xl">Welcome back</p>
                    <p className="text-lg mt-3 text-gray-600">Please enter your details</p>
                    <FormLogin />
                    <div className="flex gap-2">
                        <p>Never registered?</p>
                        <Link href="/register">
                            <p className="text-violet-600 underline">Register now</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex w-1/2 justify-start">
                <Image 
                    width={600} 
                    height={400} 
                    src={picture} 
                    alt="Picture of the author" 
                />
            </div>
        </div>
    );
};

export default Login;
