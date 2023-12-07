'use client';
import Playlists from '@/components/PLaylists';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FcLeft } from 'react-icons/fc';
import { RiPlayListFill } from 'react-icons/ri';

const Page = () => {

    const router = useRouter();

    return (
    <div className='flex flex-col gap-8 justify-center items-center relative w-1/2 mx-auto'>  
        <div className='absolute top-0 left-0 flex items-center gap-2 cursor-pointer hover:font-semibold hover:scale-105' onClick={() => router.push('/dashboard')}>
            <FcLeft size={20} /> Back
        </div>        
        <h1 className='font-bold text-4xl text-center flex items-center gap-2'> <RiPlayListFill size={40}/> Playlists</h1>
        <Playlists />
    </div>
    );
}

export default Page;
