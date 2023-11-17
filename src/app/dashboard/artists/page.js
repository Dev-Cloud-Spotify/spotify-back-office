'use client';
import Artists from '@/components/Artists';
import Songs from '@/components/Songs';
import React from 'react';
import { FcApproval, FcLeft } from 'react-icons/fc';

const Page = () => {
    return (
        <div className='flex flex-col gap-8 justify-center items-center relative w-1/2 mx-auto'>  
        <div className='absolute top-0 left-0 flex items-center gap-2 cursor-pointer hover:font-semibold hover:scale-105' onClick={() => window.history.back()}>
            <FcLeft size={20} /> Back
        </div>  
           <h1 className='font-bold text-4xl text-center flex items-center gap-2'> <FcApproval size={40}/> Artists</h1>
           <Artists />
        </div>
    );
}

export default Page;
