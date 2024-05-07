import React, { createContext, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import ConnectWallet from './Components/ConnectWallet/ConnectWallet'
import Footer from './Components/Footer/Footer';

export const myContext= createContext();

const MainContainer = () => {

    const [isConnect, setIsConnect]=useState(false)
    const [connectedWallet, setConnectedWallet] = useState(false)

  

  return (
    <myContext.Provider value={{isConnect, setIsConnect, connectedWallet, setConnectedWallet}}>
    <div className='' >
         <Navbar/>
         <Outlet />
         <Footer/>
        
    </div>
    </myContext.Provider>
  )
}

export default MainContainer