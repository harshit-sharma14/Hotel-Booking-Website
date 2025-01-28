import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Bokking } from './Bokking';
import { PhotoGallery } from './PhotoGallery';
export const MainPlace = () => {
    const {id}=useParams();
    const [places,Setplaces]=useState(null);
    const [showAllPhotos,setshowAllPhotos]=useState(false);
    
  
  useEffect(()=>{
    if(!id){
        return ;
    }
    axios.get(`/place/${id}`).then((response)=>{
        
      Setplaces(response.data)
      console.log(response.data)
    })
  },[id])
  if(!places){
    return ;
  }
  if(showAllPhotos){
    return(
      <div className='absolute inset-0  bg-black text-white min-w-full min-h-screen'>
       <div className='bg-black p-8   grid gap-4'> 
        <div>
          <h2 className='text-3xl mr-48'>Photos of {places.title}</h2>
          <button onClick={()=>setshowAllPhotos(false)} className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

            Close Photos</button>
        </div>
        {places.photos?.length>0 && places.photos.map((p)=>(
         <div>
          
          <img src={'http://localhost:4000/uploads/'+p} alt="" />
         </div> 
        ))}
</div>
      </div>
    )
  }
  
  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
        <h1 className='text-3xl'>{places.title}</h1>
        <a className='flex mt-2 my-3 underline fonr-semibold' target='_blank' href={'https://maps.google.com/q='+places.address}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>

        {places.address}</a>
        <PhotoGallery places={places}/>
        
        <div className='mt-8 mb-4  grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] '>
       <div>
        <div className='my-4'>
          <h2 className='font-semibold text-2xl'>Description</h2>
          {places.description}
        </div>
        
          <div>
            Check-in: {places.checkInInfo}<br/>
            Check-out: {places.checkOutInfo} <br />
            Max number of guests: {places.maxGuests}
          
          </div>
          </div>
          
          <div>
           <Bokking places={places}/>
          </div>
        </div>
        <div className='bg-white -mx-8 py-8 px-8 border-t'>
        <div>
          
          <h2 className='font-semibold text-2xl'>Extra Info</h2>
          </div>
          <div className='mb-4 mt-2 text-sm text-gray-700 leading-5'>
            {places.extraInfo}
            </div>
            
          </div>
       
    </div>
  )
}
