import { Route, Routes } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/home'
import AdminUsersPage from './pages/admin/users'
import ProductDetailsPage from './pages/product-details';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Search from './pages/search'
import Profile from './pages/profile'
import StripeContainer from './components/payment/StripeContainer'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<Register />}/>
      <Route path='/signin' element={<Login />}/>
      <Route path='/search' element={<Search />} />
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/payment' element={<StripeContainer/> }/>
      <Route path='/profile'/>
      <Route path='/products/:productId' element={<ProductDetailsPage />} />
      <Route path='/admin'>
        <Route path='products'>
        <Route path='users' element={<AdminUsersPage/>}/>
        </Route>
      </Route>
    </Routes>
    </>
    
  )
}

export default App;
