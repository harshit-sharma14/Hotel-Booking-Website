import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useNavigate, useParams,redirect } from 'react-router-dom';
import axios from 'axios';
import { PlacesPage } from './PlacesPage';
import { AccountNav } from './AccountNav';
import { Myprofile } from './Myprofile';
import { BookingsPages } from './BookingsPages';
export const AccountPage = () => {
    const { user, ready, Setuser } = useContext(UserContext);
    const [redirectTo, SetRedirectTo] = useState(null);  // Renamed to avoid conflict
    const navigate = useNavigate();
    let { subpage } = useParams();

    // Default subpage to 'profile' if undefined
    if (subpage === undefined) {
        subpage = 'profile';
    }

    // Logout function
    async function logout() {
        try {
            await axios.post('/logout', {}, { withCredentials: true });
            Setuser(null);  // Clear user state
            SetRedirectTo('/');  // Set redirect state
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
            alert('Logout failed');
        }
    }

    // Redirect if needed
    if (redirectTo) {
        navigate(redirectTo);  // Use navigate to redirect
        return null;  // Avoid rendering the page until redirect happens
    }

    if(!ready){
        return 'loading...'
    }
    if(ready && !user && !redirect){
        return <Navigate to='/login'/>
    }
    
    
    

  return (
    <div>
        <AccountNav/>
        {
                subpage==='profile' &&(
                    <div className='  mx-auto flex flex-col items-center'> 
                    <Myprofile/>
                        <button onClick={logout} className='bg-rose-600 max-w-sm mt-2 px-4 py-2 rounded text-white'>Logout</button> 
                    </div>
                )
            }    
             {subpage==='bookings' && 
            <div><BookingsPages/></div>}   
            {subpage==='places' && 
            <div><PlacesPage/></div>}   

    </div>
  )
}
