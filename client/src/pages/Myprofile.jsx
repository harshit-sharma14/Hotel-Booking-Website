import React from 'react'
import { UserContext } from '../UserContext';
import { useContext } from 'react';
export const Myprofile = () => {
    const {user}=useContext(UserContext);
  
  return (
    <div className='flex justify-center w-[100vw] min-h-[40vh]'>
        <div className='p-20 py-0'> 
            <div className='w-[40vh] h-[40vh] border flex justify-center items-center rounded-full'>
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-30 text-gray-500 cursor-pointer hover:text-black ease-in-out duration-150 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

            </div>
        </div>
        <div className='w-[60%] flex flex-col items-start py-4'>
            <h1 className='text-3xl font-bold font-serif'>{user.name}</h1>
            <h3 className='text-2xl text-gray-700 mt-4'>{user.email}</h3>
            <div className='mt-4 flex flex-col justify-center gap-3'>
                
            </div>
        </div>
    </div>
  )
}
