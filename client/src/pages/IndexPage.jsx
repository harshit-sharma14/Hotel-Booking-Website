import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const IndexPage = () => {
  const [places,Setplaces]=useState([]);
  useEffect(()=>{
    axios.get('/allplaces').then((response)=>{
      Setplaces([...response.data,...response.data,...response.data,...response.data,...response.data,...response.data])
      console.log(response.data)
    })
  },[])
  return (
    <div className='w-auto h-auto flex flex-col '>
      <h1 className='text-4xl font-serif py-10 border pb-2 border-b-zinc-700'>Places to Visit</h1> 
    <div className='grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4 mt-4'>
     
      {places.length>0 && places.map(place=>(
        <Link to={'/place/'+place._id}>
          <div className="bg-gray-100 border border-gray-300 rounded-2xl mb-4 shadow-md hover:shadow-lg transition-all ease-in-out flex flex-col">
  {/* Image Section */}
  <div className="overflow-hidden rounded-t-2xl">
    {place.photos?.[0] ? (
      <img
        className="rounded-t-2xl object-cover w-full aspect-square hover:scale-105 transition-transform duration-300 ease-in-out"
        src={`http://localhost:4000/uploads/${place.photos[0]}`}
        alt={`${place.title} image`}
      />
    ) : (
      <div className="flex items-center justify-center w-full aspect-square bg-gray-200 text-gray-500 text-sm">
        No Image Available
      </div>
    )}
  </div>

  {/* Details Section */}
  <div className="p-4">
    <h2 className="font-bold text-lg text-gray-800 truncate">{place.address}</h2>
    <h3 className="text-sm text-gray-600 mt-1 truncate">{place.title}</h3>
    <div className="mt-2">
      <span className="font-bold text-gray-800">${place.price}</span>
      <span className="text-gray-500 text-sm"> per night</span>
    </div>
  </div>
</div>

        </Link>
      ))}
    </div>
    </div>
    
)
}
