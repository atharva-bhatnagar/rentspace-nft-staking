import React, { useContext } from 'react';
import './Navbar.css';
import { myContext } from '../../MainContainer';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // Context usage
  const { setIsConnect, connectedWallet, setConnectedWallet } = useContext(myContext);
  
  // Navigation hook
  const navigate = useNavigate();

  // Menu items array
  const menuItems = ['Stake', 'Buy', 'Contact', 'Links'];

  // Logout handler
  function handleLogout() {
    // Logic of logout
    setConnectedWallet(false);
    navigate('/');
  }

  return (
    <div className='Nav-cont'>
      <div className='img-cont'>
        <img src="rentspaceLogo.png" className='img' alt="Logo" />
      </div>
      <ul className='menu-items-cont'>
        {menuItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {connectedWallet ? (
        <div className='connect-cont' onClick={handleLogout}>
          <h1>Logout</h1>
        </div>
      ) : (
        <div className='connect-cont' onClick={() => setIsConnect(true)}>
          <h1>Connect Your Wallet</h1>
        </div>
      )}
    </div>
  );
};

export default Navbar;
