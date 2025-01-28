import React from 'react'
import { useState,useEffect } from 'react';
export const PhotoGallery = ({places}) => {
    const [showAllPhotos,setshowAllPhotos]=useState(false);
    
  
  
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
    <div><div className='relative flex justify-center '>
            <div className='grid gap-1 w-[60vw]  h-auto grid-cols-[3fr_1fr] rounded-3xl overflow-hidden'>
            <div>
              {places.photos?.[0] &&(
                <div>
                <img onClick={()=>setshowAllPhotos(true) } className='cursor-pointer aspect-square object-cover' src={'http://localhost:4000/uploads/'+places.photos?.[0]} alt="" />
                </div>
              )}
            </div>
            <div className='grid '>
              {places.photos?.[1] &&(
                <img onClick={()=>setshowAllPhotos(true) } className='cursor-pointer h-[20vh] w-full marker: aspect-square object-cover' src={'http://localhost:4000/uploads/'+places.photos?.[1]} alt="" />
              )}
              <div className='overflow-hidden'>
              {places.photos?.[2] &&(
                <img onClick={()=>setshowAllPhotos(true) } className='cursor-pointer  aspect-square object-cover relative' src={'http://localhost:4000/uploads/'+places.photos?.[3 ]} alt="" />
              )}
              
              </div>
              {places.photos?.[3] &&(
                // {console.log(places.photos[])};
                <img onClick={()=>setshowAllPhotos(true) } className='cursor-pointer aspect-square object-cover relative' src={'http://localhost:4000/uploads/'+places.photos?.[2]} alt="" />
              )}
            </div>
            </div>
            <button onClick={()=>setshowAllPhotos(true)} className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl  shadow-md shadow-gray-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
    
    
              Show More Photos</button>
            </div></div>
  )
}
