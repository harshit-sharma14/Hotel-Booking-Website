import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bokking } from './Bokking';
import { BookingDetail } from './BookingDetail';
import { PhotoGallery } from './PhotoGallery';

export const SingleBooking = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        axios.get('/bookings').then(response => {
            const foundBooking = response.data.find(({ _id }) => _id === id);
            if (foundBooking) {
                setBooking(foundBooking); // Set the found booking
            }
        });
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <div className='my-8'>
            <h1 className='text-3xl'>{booking.place.title}</h1>
            <a className='flex mt-2 my-3 underline fonr-semibold' target='_blank' href={'https://maps.google.com/q='+booking.place.address}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>

        {booking.place.address}</a>
        <div className='bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center'>
            <div>
            <h2 className='text-2xl mb-2'>Your Booking Information:</h2>
            <BookingDetail b={booking}/> 
            </div>
           <div className='bg-red-600 p-4 text-white rounded-2xl flex flex-col justify-center'          >
            <div>Total Price</div>
            <div className='text-3xl'>${booking.price}</div>
           </div>
        </div>
            
            {/* Add more details as needed */}
            <PhotoGallery places={booking.place}/>
        </div>
    );
};

export default SingleBooking;