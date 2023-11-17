'use client';
import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import { RoundedBoutton } from '../utilities/Elements';

const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleLogin = () => {
        console.log(formData);
        router.push('/dashboard');
    }
    

    return (
        <div className='flex justify-center flex-col gap-4 w-[400px]'>
            <h1 className='font-bold text-4xl text-center'>Log in to continue.</h1>

            <div className='w-full flex flex-col gap-4 text-xl mt-4'>
                <div className='relative items-center'>
                    <input type="text" name='email' placeholder='Email' className='w-full px-4 py-2 bg-[#404040]' onChange={handleChange} />
                    <FaEnvelope className='absolute top-1/2 transform -translate-y-1/2 right-3 text-2xl text-gray-400' />
                </div>
                <div className='relative items-center'>
                    <input type={showPassword? 'text': 'password'} name='password' placeholder='Password' className='w-full px-4 py-2 bg-[#404040]' onChange={handleChange} />
                    {showPassword? 
                        (<FaEye className='absolute top-1/2 transform -translate-y-1/2 right-3 text-2xl text-gray-400' onClick={()=> setShowPassword(false)} />):
                        (<FaEyeSlash className='absolute top-1/2 transform -translate-y-1/2 right-3 text-2xl text-gray-400' onClick={()=> setShowPassword(true)} />)
                    }
                </div>
            </div>

            <div className='mt-4'>
                {/* <button className='w-full py-3 bg-white text-black font-bold text-xl rounded-full' onClick={handleLogin}>LOG IN</button> */}
                <RoundedBoutton className={'bg-white'} handleClick={handleLogin} text='LOG IN' />

                <div className='flex items-center justify-center my-4'>
                    <hr className='w-1/3' />
                    <span className='mx-4 text-xl'>OR</span>
                    <hr className='w-1/3' />
                </div>

                {/* <button className='w-full py-3 bg-blue-600 text-black font-bold text-xl rounded-full'>REGISTER</button> */}
                <RoundedBoutton className={'bg-blue-600'} handleClick={()=> router.push('/register')} text='REGISTER' />
            </div>

            
        </div>
    );
}

export default LoginForm;
