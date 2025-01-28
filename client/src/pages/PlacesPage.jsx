import React, { useEffect, useState } from 'react'
import { Link, Navigate, redirect, useParams } from 'react-router-dom'
import { Perks } from './Perks';
import axios from 'axios';
import {PlacesForm} from './PlacesForm'
import { AccountNav } from './AccountNav';
export const PlacesPage = () => {
    
    const [places,Setplaces]=useState([]);
    const {action}=useParams();
    
    
    useEffect(()=>{
        axios.get('/places').then(({data})=>{
            
            Setplaces(data);
            console.log(data);
        })
    },[])
    
   
    
  return (
    <div>
        <AccountNav/>
        <div className='text-center'>
            <Link to={'/account/places/new'} className=' inline-flex gap-1 bg-rose-600 px-6 py-2 rounded text-white'>Add new <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</Link>
        </div>
        <div className='mt-8 flex flex-col items-center'>
        {places.length > 0 && places.map(p => (
  <Link 
    to={'/account/place/' + p._id} 
    className='flex gap-6 bg-gray-100 shadow-md hover:shadow-lg p-6 rounded-2xl transition-all duration-300 border border-gray-300 shadow-lg ease-in-out my-6 w-full md:w-[60vw]'>
    
    {/* Image Container */}
    <div className='w-40 h-40 flex-shrink-0'>
      {p.photos.length > 0 && (
        <img 
          className='object-cover w-full h-full rounded-xl' 
          src={'http://localhost:4000/uploads/' + p.photos[0]} 
          alt={p.title} 
        />
      )}
    </div>
    
    {/* Text Content */}
    <div className='flex flex-col justify-center gap-2'>
      <h2 className='text-2xl font-bold text-gray-800'>{p.title}</h2>
      <p className='text-sm text-gray-600 mt-2 line-clamp-3'>{p.description}</p>
    </div>
  </Link>
))}

        </div>
        {action==='new' &&(
           <PlacesForm/>

        )}
        
    </div>
  )
}
