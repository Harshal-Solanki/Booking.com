// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layouts/layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import AddHotel from './pages/AddHotel'
import { useAppContext } from './Contexts/AppContext'
import MyHotels from './pages/MyHotels'
import EditHotels from './pages/EditHotels'
import Search from './pages/Search'
import Details from './pages/Details'
import Home from './pages/Home'
import Booking from './pages/Bookings'
import MyBookings from './pages/MyBookings'
import HomeLayout from './Layouts/HomeLayout'


function App() {
  const {isLoggedIn}= useAppContext();
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=
          {
            <HomeLayout>
              
              <Home/>
            </HomeLayout>
          }>

        </Route>

        <Route path='/search' element={<HomeLayout>
          <Search/>
        </HomeLayout>}></Route>

        <Route path="/details/:hotelId" element={<Layout><Details/></Layout>}></Route>
        
        <Route path='/register' element={<Layout><Register/></Layout>}></Route>

        <Route path='/signin' element={<Layout><SignIn/></Layout>}></Route>


        {isLoggedIn && 
          <>
          <Route 
            path='/hotels/:hotelId/bookings' 
            element={
              <Layout> 
                <Booking />
              </Layout>
            } 
          />

          <Route 
            path='/addhotel' 
            element={
              <Layout> 
                <AddHotel />
              </Layout>
            } 
          />
          <Route 
          path='/myhotel' 
          element={
            <Layout>
              <MyHotels/>
            </Layout>
            }
          />
          <Route 
          path='/edithotel/:hotelId' 
          element={
            <Layout>
              <EditHotels/>
            </Layout>
            }
          />

          <Route 
            path='/mybookings' 
            element={
              <Layout> 
                <MyBookings />
              </Layout>
            } 
          />

          </>
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
