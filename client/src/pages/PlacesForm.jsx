import React, { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AccountNav } from './AccountNav';
import { Perks } from './Perks';


export const PlacesForm = () => {
  const {id}=useParams(); 

  const [redirecttoList, setRedirecttoList] = useState(false);
  const [title, setTitle] = useState('');
  const [address, setAdrress] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkInInfo, setCheckInInfo] = useState('');
  const [checkOutInfo, setcheckOutInfo] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price,Setprice]=useState('');
   const [addedPhotos,setAddedPhotos]=useState([]);
        const [photoLink,setPhotoLink]=useState('');
  useEffect(()=>{
    if(!id){
      return ;
    }
    axios.get('/place/' + id).then((response) => {
    const { data } = response;
    setTitle(data.title);
    setDescription(data.description);
    setAdrress(data.address);
    setAddedPhotos(data.photos);
    setPerks(data.perks);
    setExtraInfo(data.extraInfo);
    setCheckInInfo(data.checkInInfo);
    setcheckOutInfo(data.checkOutInfo);
    Setprice(data.price);
  });
  },[id])

  function inputHeader(text) {
    return <h2 className='text-2xl mt-4'>{text}</h2>;
  }

  function inputDescription(text) {
    return <p className='text-gray-500 text-sm'>{text}</p>;
  }

  async function SavePlace(ev) {
    ev.preventDefault();
    
    if(id){
      const data = {
        id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkInInfo,
        checkOutInfo,
        maxGuests,
        price,
      };
      await axios.put('/places', data);
    setRedirecttoList(true);
    }
    else{
      const data = {
        title,
        address,
        description,
        addedPhotos,
        perks,
        extraInfo,
        checkInInfo,
        checkOutInfo,
        maxGuests,
        price
      };
      await axios.post('/places', data);
    setRedirecttoList(true);
    }
    
  }

  if (redirecttoList) {
    return <Navigate to={'/account/places'} />;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
async function uploadLink(ev){
        ev.preventDefault();
        const {data:fileName}=await axios.post('/upload-bylink',{link:photoLink});
        console.log(fileName)
        setAddedPhotos((prev) => [...prev, fileName]);
        setPhotoLink('');
        


    }
    async function uploadPhoto(ev){
        const files = ev.target.files;
        const data = new FormData();
        for(let i = 0; i < files.length; i++){
            data.set('photos', files[i]);
        }
        
        axios.post('/upload', data, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            const {data:filenames} = res;
            setAddedPhotos((prev) => [...prev, ...filenames]);
        })

    }
    function removePhoto(ev,filename){
      ev.preventDefault();
      setAddedPhotos([...addedPhotos.filter(photo=>photo!=filename)])
    }
    function setMainPhoto(ev,fileName){
      ev.preventDefault();
      const addedPhotosWithouts=addedPhotos.filter(photo=>photo!==fileName);
      const newAdded=[fileName,...addedPhotosWithouts];
      setAddedPhotos(newAdded )
    }
  return (
    <div>
      <AccountNav />
      <form onSubmit={SavePlace}>
        {preInput('Title', 'Title for your place. Should be short and crisp')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title: for example' />
        {preInput('Address', 'Address to your places')}
        <input type="text" placeholder='title: for example' value={address} onChange={ev => setAdrress(ev.target.value)} />
        {preInput('Photos', 'more=better')}
        <div><div className='flex gap-2 '>
                            <input type="text" placeholder='Add using a link...jpg' value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)} />
                            <button onClick={uploadLink} className='bg-gray-200 px-4 rounded-2xl'>Add photo</button>
                        </div>
                        
                        <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 flex'>
                        {addedPhotos.length>0 && addedPhotos.map((link, index) => (
                            <div className='h-32 flex relative' key={index}>
                            <img className='w-full object-cover h-32 rounded' src={'http://localhost:4000/uploads/'+link} alt="" />
                            <div onClick={(ev)=>removePhoto(ev,link)} className='absolute bottom-1 p-1 rounded-2xl px-3 py-2 bg-opacity-5 cursor-pointer text-white bg-black right-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                            </div>
                            
                            <button onClick={(ev)=>setMainPhoto(ev,link)} className='absolute bottom-1 p-1 rounded-2xl px-3 py-2 bg-opacity-5 cursor-pointer text-white bg-black left-1'>
                            {link===addedPhotos[0] &&(
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                              <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                            </svg>
                            
                            )}
                            {link!==addedPhotos[0] &&(
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg>
                            )}
                            



                            </button>
                            {console.log(`http://localhost:4000/uploads/${link}`)}
                            </div>
                        )   )}
                        <label  htmlFor="photo-upload" className='h-32 cursor-pointer border bg-gray-400 rounded-2xl py-6 text-gray-600 flex justify-center items-center gap-1'>
        Upload
        <input id="photo-upload" type="file" className='hidden' onChange={uploadPhoto} />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
        </svg>
    </label>
                        </div></div>
        {preInput('Description', 'Describe the place')}
        <textarea className='w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' value={description} onChange={ev => setDescription(ev.target.value)} ></textarea>
        <Perks selected={perks} onChange={setPerks} />
        {preInput('Extra Info', 'House Rules etc')}
        <textarea className='w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}></textarea>
        {preInput('CheckIn CheckOut and Max Guests', 'Add the timings accordingly and mention the maximum number of guests in each room')}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
          <div>
            <h3 className='mt-2 mb-1'>Check In Time</h3>
            <input type="number" placeholder='10:00 am' value={checkInInfo} onChange={ev => setCheckInInfo(ev.target.value)} />
          </div>
          <div>
            <h3 className='mt-2 mb-1'>Check Out Time</h3>
            <input type="number" placeholder='9:00 am' value={checkOutInfo} onChange={ev => setcheckOutInfo(ev.target.value)} />
          </div>
          <div>
            <h3 className='mt-2 mb-1'>Max Number of guests</h3>
            <input type="text" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
          </div>
          <div>
            <h3 className='mt-2 mb-1'>Price</h3>
            <input type="text" value={price} onChange={ev => Setprice(ev.target.value)} />
          </div>
        </div>
        <button className='bg-rose-600 mt-2 w-full py-2 px-4 rounded-full text-white'>Save</button>
      </form>
    </div>
  );
};
