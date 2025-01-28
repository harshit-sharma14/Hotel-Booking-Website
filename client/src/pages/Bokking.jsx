import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import {differenceInCalendarDays} from 'date-fns'
import { UserContext } from '../UserContext';
export const Bokking = ({places}) => {
    const [checkInInfo,setCheckInInfo]=useState('');
    const [checkOutInfo,setcheckOutInfo]=useState('');
    const [maxGuests,setMaxGuests]=useState(1);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [redirect,setRedirect]=useState('');
    const user=useContext(UserContext);
    useEffect(()=>{
      if(user){
        setName(user.name)
      }
    },[user])
    let numberofdays=0;
    if(checkInInfo && checkOutInfo){
        numberofdays=differenceInCalendarDays(new Date(checkOutInfo), new Date(checkInInfo))
    }
    const BookThisPlace=()=>{
        if(!checkInInfo || !checkOutInfo || !maxGuests || !name || !phone){
            alert('Please fill all the fields')
            return;
        }
        if(numberofdays<=0){
            alert('Please select a valid date range')
            return;
        }
        const data = {
          place: places._id, // Ensure 'places' contains a valid document
          checkInInfo: checkInInfo || new Date(), // Default to current date if not provided
          checkOutInfo: checkOutInfo || new Date(), // Default to current date if not provided
          maxGuests: maxGuests || 1, // Default to 1 guest if not provided
          name: name?.trim() || 'Guest', // Default to 'Guest' if name is not provided
          phone: phone?.trim() || 'N/A', // Default to 'N/A' if phone is not provided
          price: places.price * (numberofdays || 1), // Default to 1 day if not provided
      };
      
        axios.post('/booking',data).then(response=>{
            const {data}=response;
            const bookingId=data._id;
            setRedirect('/account/bookings/'+bookingId)
            alert('Booking successful')
        })
    }
  return (
    <div className='bg-white shadow p-4 rounded-2xl'>
    <div className='text-2xl text-center'>
      <h2>Price: ${places.price}/per night</h2>
    </div>
    <div className='border rounded-2xl mt-4'>
    <div className=' py-3 px-4 '>
      <label htmlFor="">Check In : </label>
        <input type="date" value={checkInInfo} onChange={ev=>setCheckInInfo(ev.target.value)} name="" id="" />
      
    </div>
    <div className='mb-4  py-3 px-4 border-t '>
      <label htmlFor="">Check Out : </label>
        <input type="date" value={checkOutInfo} onChange={ev=>setcheckOutInfo(ev.target.value)} name="" id="" />
      
    </div>
    <div className='py-3 px-4 border-t'>
      <label htmlFor="">Number of guests</label>
      <input type="number" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} />
    </div>
    {numberofdays>0 && (
         <div className='py-3 px-4 border-t'>
         <label htmlFor="">Your full Name</label>
         <input type="text" value={name} onChange={ev=>setName(ev.target.value)} />
         <label htmlFor="">Your Phone Number</label>
         <input type="tel" value={phone} onChange={ev=>setPhone(ev.target.value)} />
       </div>
    )}
    </div>
    
    
   
    <button onClick={BookThisPlace} className='mt-4 block px-4 py-2 text-white rounded-2xl my-2 w-full bg-red-600'>Book this place</button>
  {numberofdays>0 && (
    <span>${numberofdays*places.price}</span>
  )}
  </div>
  )
}
