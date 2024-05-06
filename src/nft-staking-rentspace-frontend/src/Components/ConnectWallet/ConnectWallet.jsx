import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConnectWallet.css';
import { myContext } from '../../MainContainer';

const ConnectWallet = ({ setIsConnect }) => {
  const walletData = [
    { name: 'MetaMask', img: 'metamask-logo.png' },
    { name: 'TrustWallet', img: 'trustwallet-logo.png' },
    { name: 'SolFlare', img: 'solflare-logo.png' }
  ];

  const {setConnectedWallet} = useContext(myContext)
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/registerUser');
  };

  const [userData, setUserData] = useState();

  const handleWalletConnect = async (name) => {
    // Simulate wallet connection logic
    // Assuming wallet connection is successful and user data is fetched
    
    const userData = { username: 'vimleshg', email: 'vkg911858@gmail.com' };

    if (userData.username && userData.email) {
        navigate('/userDashboard', {state:{ userData: userData }});
        setConnectedWallet(true)

    } else {
      
        navigate('/registerUser');
    }
};


  return (
    <div className='connectPage-cont'>
      <p className='close-btn' onClick={() => setIsConnect(false)}> ✕ </p>

      <div className='heading-cont'>
        <h1> Connect Wallet</h1>
      </div>

      {walletData.map((data, index) => (
        <div className='wallet-cont' key={index} onClick={() => handleWalletConnect(data.name)}>
          <h1>{data.name}</h1>
          <img className='w-8' src={data.img} alt='logo' />
        </div>
      ))}

      <div className='existing-wallet-text' onClick={handleNavigate}>
        <p> I don't have a wallet </p>
      </div>
    </div>
  );
};

export default ConnectWallet;
