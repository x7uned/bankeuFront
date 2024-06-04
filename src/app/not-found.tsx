import React from 'react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';

const mont = Outfit({ subsets: ["latin"], variable: '--mont'});

export default function Custom404() {
    return (
        <div className={`text-2xl w-screen h-screen align-center justify-center text-center text-black ${mont.className}`}>
            <h1>404 - Page not found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link href="/">
                <p className='underline text-violet-500'>Back to main page</p>
            </Link>
        </div>
    );
}