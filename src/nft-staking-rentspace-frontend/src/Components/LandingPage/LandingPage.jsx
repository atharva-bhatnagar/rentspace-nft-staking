import React, { useContext } from 'react';
import './LandingPage.css';
import { Outlet } from 'react-router-dom';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import { myContext } from '../../MainContainer';
import { useAuth } from '../../utils/useAuthClient';

const LandingPage = () => {
  // Context usage
  const { isConnect, setIsConnect } = useContext(myContext);
  // const {isAuthenticated}=useAuth()

  // Component body
  return (
    <div className='landingPage-cont relative'>
      <div className={'hero-cont ' + (isConnect ? 'blur-lg' : 'blur-none')}>
        <img src='nftBackground.jpg' alt='Background' className='' />
      </div>

      <div className='absolute top-0 text-white'>
        {/* Your additional content here */}
      </div>

      {isConnect && <ConnectWallet setIsConnect={setIsConnect} />}
    </div>
  );
};

export default LandingPage;
