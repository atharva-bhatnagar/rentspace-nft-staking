import React, { useContext, useEffect } from 'react';
import './Navbar.css';
import { myContext } from '../../MainContainer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/useAuthClient';

const Navbar = () => {
  // Context usage
  const { setIsConnect, connectedWallet, setConnectedWallet } = useContext(myContext);
  const {isAuthenticated,logout}=useAuth()
  
  // Navigation hook
  const navigate = useNavigate();

  // Menu items array
  const menuItems = ['Stake', 'Buy', 'Contact', 'Dashboard'];

  // Logout handler
  async function handleLogout() {
    // Logic of logout
    await logout()
    navigate('/');
  }

  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/')
    }
  },[])

  return (
    <div className='Nav-cont'>
      <div className='img-cont'>
        <img src="rentspaceLogo.png" className='img' alt="Logo" />
      </div>
      <ul className='menu-items-cont'>
        {menuItems.map((item, index) => (
          <li key={index} onClick={()=>{
            if(isAuthenticated){
              navigate('/userDashboard')
            }
          }}>{item}</li>
        ))}
      </ul>

      {isAuthenticated ? (
        <div className='connect-cont' onClick={handleLogout}>
          <h1>Logout</h1>
        </div>
      ) : (
        <div className='connect-cont' onClick={() => setIsConnect(true)}>
          <h1>Join us</h1>
        </div>
      )}
    </div>
  );
};

export default Navbar;
