import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Imagedisplay } from './Imagedisplay';
import { format,differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { BookingDetail } from './BookingDetail';
import { AccountNav } from './AccountNav';
export const BookingsPages = () => {
    const [e,setE]=useState(false)
    const [bookings, setBookings] = useState([]);
    useEffect(()=>{
        axios.get('/bookings').then((response)=>{
            setBookings(response.data);
            console.log(response.data)
        }).catch((e)=>{
            console.log(e);
            setE(true)
        })
    },[])
    if (bookings.length === 0) {
        return(
            <div>
                <AccountNav/>
            <div className='w-full h-full flex flex-col gap-10 justify-center items-center'> 
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
</svg>

                </div>
            </div>
            </div>
        )
    }
  return (
    <div>
        {e? (<div>
            <AccountNav/>
            <h1>Hello</h1>
        </div>):
         <div className='py-4  '>
        <AccountNav/>
         <h1 className='text-3xl font-bold  text-center mb-4  '> Your Bookings</h1>
         <div className='flex flex-col items-center'>
         {bookings?.length>0 && bookings.map((b,index)=>(
            <Link to={'/account/bookings/'+b._id} className='flex gap-4 w-full md:w-[80%] bg-gray-200 rounded-2xl overflow-hidden  my-2 hover:scale-105 duration-200 ease-in'>
             <div className='w-45 h-40'>
                 
                 <Imagedisplay place={b.place } className='w-full h-full ' index={index} />
             </div>
             <div className=' py-3'>
                 <h2 className='text-xl'>{b.place.title}</h2>
             <BookingDetail b={b} className='mb-2 mt-4 text-gray-500'/>
             </div>
            
            </Link>
         ))}
         </div>
     </div>
        }
    </div>
   
  )
}
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Imagedisplay } from './Imagedisplay';
// import { BookingDetail } from './BookingDetail';
// import { Link } from 'react-router-dom';

// export const BookingsPages = () => {
//     const [bookings, setBookings] = useState([]);  // Bookings state
//     const [loading, setLoading] = useState(true);  // Loading state
//     const [error, setError] = useState('');  // Error state (empty string to show error message)

//     useEffect(() => {
//         axios.get('/bookings')
//             .then((response) => {
//                 setBookings(response.data);
//                 setLoading(false);
//                 console.log(response.data)
//             })
//             .catch((err) => {
//                 console.log(err);
//                 setError('There was an error fetching your bookings. Please try again later.');
//                 setLoading(false);
//             });
//     }, []);

//     // Show loading state while fetching data
//     if (loading) {
//         return (
//             <div className="w-full h-full flex flex-col gap-10 justify-center items-center">
//                 <div>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
//                     </svg>
//                 </div>
//                 <p>Loading...</p>
//             </div>
//         );
//     }

//     // Show error message if there is any error
//     if (error) {
//         return (
//             <div className="w-full h-full flex flex-col gap-10 justify-center items-center">
//                 <h1 className="text-xl text-red-500">{error}</h1>
//             </div>
//         );
//     }

//     // Show message when there are no bookings
//     if (bookings.length === 0) {
//         return (
//             <div className="w-full h-full flex flex-col gap-10 justify-center items-center">
//                 <div>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
//                     </svg>
//                 </div>
//                 <h2>No bookings currently</h2>
//             </div>
//         );
//     }

//     // Render bookings if data is available
//     return (
//         <div className="py-4">
//             <h1 className="text-3xl font-bold text-center mb-4">Your Bookings</h1>
//             <div className="flex flex-col items-center">
//                 {bookings.map((b, index) => (
//                     <Link to={`/account/bookings/${b._id}`} key={b._id} className="flex gap-4 w-[80%] bg-gray-200 rounded-2xl overflow-hidden my-2 hover:scale-105 duration-200 ease-in">
//                         <div className="w-45 h-40">
//                             <Imagedisplay place={b.place} className="w-full h-full" index={index} />
//                         </div>
//                         <div className="py-3">
//                             <h2 className="text-xl">{b.place.title}</h2>
//                             <BookingDetail b={b} className="mb-2 mt-4 text-gray-500" />
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

