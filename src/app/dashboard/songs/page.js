'use client';
import Songs from '@/components/Songs';
import React from 'react';
import { FcLeft, FcMusic } from 'react-icons/fc';
import { useRouter } from 'next/navigation';


const Page = () => {

    const router = useRouter()
    return (
        <div className='flex flex-col gap-8 justify-center items-center relative w-1/2 mx-auto'>  
        <div className='absolute top-0 left-0 flex items-center gap-2 cursor-pointer hover:font-semibold hover:scale-105' onClick={() => router.push('/dashboard')}>
            <FcLeft size={20} /> Back
        </div>  
           <h1 className='font-bold text-4xl text-center flex items-center gap-2'> <FcMusic size={40}/> Songs</h1>
           <Songs />
        </div>
    );
}

export default Page;
