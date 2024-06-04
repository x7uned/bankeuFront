'use client'

import Link from 'next/link';
import Image from 'next/image';
import picture from '../../img/pic.jpg';
import { useAppSelector } from '@/redux/store';
import { selectIsAuth } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import CreateCardForm from '../components/forms/createCard.form.';

const CreateCard: React.FC = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const router = useRouter()

    if(!isAuth) {
        router.push('/login');
    }

    return (
        <div className="flex w-screen items-center text-black">
            <div className="flex w-1/2 pr-20 mt-10 h-full flex-col items-end">
                <div className="flex flex-col h-full items-center justify-center">
                    <p className="text-3xl">Create card</p>
                    <p className="text-lg mt-3 text-gray-600">Create new payment method</p>
                    <CreateCardForm />
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

export default CreateCard;