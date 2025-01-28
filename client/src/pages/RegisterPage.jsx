import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

export const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [address,setAdd]=useState('');
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
                address,  // Make sure this is set correctly.
            });
            alert('Registration Successful');
            setRedirect(true);
        } catch (e) {
            alert(e.response ? e.response.data.message : e.message);
        }
    }
    
    if (redirect) {
        return <Navigate to={'/login'} />;
    }

    return (
        <div className='mt-4 grow flex items-center justify-center'>
            <div className='mb-64 min-h-[70vh] w-[40vw] flex flex-col border rounded-2xl shadow-lg shadow-black border-gray-500'>
                <div className='primary rounded-2xl'>
                    <h1 className='text-4xl text-center font-bold text-white py-2 primary border-b-2 rounded-2xl rounded-b-none'>Welcome to Air BNB</h1>
                </div>
                <h1 className='text-4xl text-center my-10'>Register</h1>
                <form className='max-w-md mx-auto p-2' onSubmit={registerUser}>
                    <div className='rounded-2xl'>
                        <input
                            type="text"
                            className='login border-black p-2 mb-2 w-full'
                            placeholder='Your Name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            className='login border-black p-2 mb-2 w-full'
                            placeholder='your@email.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className='login border-black p-2 mb-2 w-full'
                            placeholder='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <input
                            type="text"
                            className='login border-black p-2 mb-2 w-full'
                            placeholder='Address'
                            value={address}
                            onChange={e => setAdd(e.target.value)}
                        />
                    </div>
                    <button className='primary mt-4 w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already a member?
                        <Link className='underline text-blue-500 ml-1' to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;