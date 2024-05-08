import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConnectWallet.css';
import { myContext } from '../../MainContainer';
import { useAuth } from '../../utils/useAuthClient';

const ConnectWallet = ({ setIsConnect }) => {
  const walletData = [
    { name: 'Internet Identity', img: 'icp.png' },
    // { name: 'TrustWallet', img: 'trustwallet-logo.png' },
    // { name: 'SolFlare', img: 'solflare-logo.png' }
  ];

  const {setConnectedWallet} = useContext(myContext)
  const navigate = useNavigate()
  const {login,actors}=useAuth()

  const handleNavigate = () => {
    navigate('/registerUser');
  };
  const userLogin=async()=>{
    await login().then(async(r)=>{
      let newActor=(actors?.userActor==undefined)?r:actors?.userActor
      await newActor.getUserData().then((res)=>{
          console.log("res",res)
          if("No user data found for this principal"==res.err){
              navigate('registerUser')
          }else if(res.err){
              alert("something went wrong, please try again!")
          }else{
              navigate('/userDashboard')
          }
      }).catch((err)=>{
          console.log("err",err)
      })
    })
  }

  const [userData, setUserData] = useState();


  return (
    <div className='connectPage-cont'>
      <p className='close-btn' onClick={() => setIsConnect(false)}> ✕ </p>

      <div className='heading-cont'>
        <h1> Connect with</h1>
      </div>

      {walletData.map((data, index) => (
        <div className='wallet-cont' key={index} onClick={userLogin}>
          <h1>{data.name}</h1>
          <img className='wallet-img' src={data.img} alt='logo' />
        </div>
      ))}

      {/* <div className='existing-wallet-text' onClick={handleNavigate}>
        <p> I don't have a wallet </p>
      </div> */}
    </div>
  );
};

export default ConnectWallet;
