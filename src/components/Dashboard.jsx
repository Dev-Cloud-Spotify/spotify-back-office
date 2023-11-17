
import { useRouter } from 'next/navigation';
import React from 'react';
import { FcApproval, FcHeadset, FcMusic, FcStatistics } from 'react-icons/fc';
import Statistics from './Statistics';

const Dashboard = () => {

    const router = useRouter();
    const menus = [
        {name: 'Songs', path: '/dashboard/songs', icon: <FcMusic size={40} />, active: true},
        {name: 'Artists', path: '/dashboard/artists', icon: <FcApproval size={40} />, active: true},
        {name: 'Albums', path: '/dashboard/albums', icon: <FcHeadset size={40} />, active: true},
    ];

    return (
        <div className='flex justify-center flex-col items-center gap-8'>
            <h1 className='font-bold text-4xl text-center'>Dashboard</h1>

            <div className='mt-4 flex flex-wrap justify-center w-1/2 gap-12'>
                {menus.map((menu, index) => (
                    <div key={index} className={`flex flex-col items-center justify-center rounded-full w-28 h-28 gap-2 cursor-pointer p-4 hover:scale-105 hover:opacity-70 transition-all ${index % 2? 'bg-blue-500': 'bg-blue-300'}`}
                    onClick={()=> router.push(menu.path)}>
                        <div className={`flex items-center justify-center`}>
                            {menu.icon}
                        </div>
                        <p className='text-white font-bold'>{menu.name}</p>
                    </div>
                ))}
            </div>

            <div className='mt-4'>
                <Statistics />
            </div>
        </div>
    );
}

export default Dashboard;
