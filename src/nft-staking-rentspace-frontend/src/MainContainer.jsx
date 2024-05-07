import React, { createContext, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer';
import { AuthProvider } from './utils/useAuthClient';

export const myContext= createContext();

const MainContainer = () => {

    const [isConnect, setIsConnect]=useState(false)
    const [connectedWallet, setConnectedWallet] = useState(false)  

  return (
    <AuthProvider>
      <myContext.Provider value={{isConnect, setIsConnect, connectedWallet, setConnectedWallet}}>
      <div className='' >
          <Navbar/>
          <Outlet />
          <Footer/>
          
      </div>
      </myContext.Provider>
    </AuthProvider>
  )
}

export default MainContainer