import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import { IndexPage } from './pages/IndexPage'
import { LoginPage } from './pages/LoginPage'
import { Layout } from './pages/Layout'
import { RegisterPage } from './pages/RegisterPage'
import { ImageContext } from './pages/ImageContext'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import { AccountPage } from './pages/AccountPage'
import { Page } from './pages/Page'
import LoginForm from './pages/LoginForm'
import View from './pages/View'
import { PlacesPage } from './pages/PlacesPage'
import { PlacesForm } from './pages/PlacesForm'
import { MainPlace } from './pages/MainPlace'
import { BookingsPages } from './pages/BookingsPages'
import { SingleBooking } from './pages/SingleBooking'
axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials=true;
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path='/loginform' element={<LoginForm/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/view' element={<View/>}/>
        <Route path='/page' element={<Page/>}/>
        <Route path='/account/:subpage?' element={<AccountPage/>}/>
        <Route path='/account/places' element={<PlacesPage/>}/>
        <Route path='/account/places/new' element={<PlacesForm/>}/>
        <Route path='/account/place/:id' element={<PlacesForm/>}/>
        <Route path='/place/:id' element={<MainPlace/>}/>
        <Route path='/account/bookings' element={<BookingsPages/>}/>
        <Route path='/account/bookings/:id' element={<SingleBooking/>}/>

        </Route>

      </Routes>
      </UserContextProvider>
    </>
  )
}

export default App;