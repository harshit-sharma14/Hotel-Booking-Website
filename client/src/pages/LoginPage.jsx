import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'
export const LoginPage = () => {
  const [email,SetEmail]=useState('');
  const [password,SetPassword]=useState('');
  const [redirect,Setredirect]=useState(false)
  const {Setuser}=useContext(UserContext);
  async function handleLogin(ev){
    ev.preventDefault();
    try{
      const {data}=await axios.post('/login',{email,password});
      alert('Login Successful');
      console.log(data.user)
      const token = data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(data)); // Save user data to local storage

      Setuser(data)
      Setredirect(true)
    }
    catch(e){
      alert('Login Failed')
    }

  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <div>
    <div className='mt-4 grow flex w-full md:w-[100%] items-center justify-center'>
        <div className=' min-h-[70vh] w-[100vw] md:w-[50vw] flex flex-col  border rounded-2xl shadow-lg shadow-black border-gray-500'>
        <div className='primary rounded-2xl md:w-[100%]'>
        <h1 className='text-4xl text-center font-bold text-white py-2  md:w-full border-b-2 rounded-2xl rounded-b-none'>Welcome to Air BNB</h1>
        </div>
        <h1 className='text-4xl text-center my-10'>Login</h1>
        <form className='max-w-md mx-auto  p-2  ' onSubmit={handleLogin}>
          <div className=' rounded-2xl'>
            <input type="email" className=' login border-black p-2    ' placeholder='your@email.com' value={email} onChange={e=>SetEmail(e.target.value)} />
            
            <input type="password" className='login border-black p-2  outline-none ' placeholder='password' value={password} onChange={e=>SetPassword(e.target.value)} />
            </div>
            <button className='primary mt-4'>Login</button>
            <div className='text-center  py-2 text-gray-500'>
              Don't have an account yet?
              <Link className='underline text-bn mt-4' to={'/register'}>Register Now</Link>
            </div>
          
        </form>
        </div>
        </div>

    </div>
  )
}
