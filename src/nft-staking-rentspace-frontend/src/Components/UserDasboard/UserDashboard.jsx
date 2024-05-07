import React, { useEffect, useState } from 'react';
import './UserDashboard.css'
import { Outlet, useLocation } from 'react-router-dom';
import { FaXTwitter } from "react-icons/fa6";
import { FaMedium, FaDiscord } from "react-icons/fa";
import { TbWorldCheck } from "react-icons/tb";
import ImportedNFTs from './NFTsComp/ImportedNFTs';
import StakedNFTs from './NFTsComp/StakedNFTs';
import { NFTsData } from '../../Constants/useNFTsData';



const UserDashboard = () => {
    const location = useLocation();
    const {NFTs, setNFTs}= NFTsData();
    // Access userData from location.state if it exists
    const userData = location.state && location.state.userData;
    const [switchSection, setSwitchSection] =useState(false)

    const [AssetsData, setAssetsData]= useState([ {'Volume Traded': '' }, {'Items':null }, {'imported NFT': null }, {'Staked NFT':null } ])
     
    useEffect(()=>{
        const importedNfts= NFTs.filter((data, ind)=> data.staked !== true )
        const stakedNfts= NFTs.filter((data, ind)=> data.staked === true )
        setAssetsData((prev)=>[ {'Volume Traded':'10k'},{'Items': NFTs.length}, {'imported NFT': importedNfts.length}, {'Staked NFT': stakedNfts.length } ])

    },[])

    return (
        <div className='dashboard-cont'>
              <div className='bgText-cont'>
                <div className='text-cont'>
                    <h1>Rentspace NFT </h1>
                    <h1> Staking</h1>
                </div>
            </div>

        <div className='Content-cont'>
          <div className='userData-cont'>
           <div className='userData-col1'>
            <div className='profilePic-cont'>
               <img src={'profileLogo.png'} className='profile-img' alt='profilePic' />
            </div>
            <div>
             <h1 className='username-text'> {userData.username} </h1>
             <div className='socialHandle-cont'>
                <FaXTwitter/>
                <FaMedium/>
                <FaDiscord/>
                <TbWorldCheck/>
             </div>
             <h1 className='email-text'> {userData.email}</h1>
              <p className='extra-info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic sequi ea voluptates dolorem illum corporis amet fugit tempora, sapiente asperiores?</p>

            </div>
            </div>

            <div className='userData-col2'>
              {
                AssetsData.map((data, ind)=>{
                  return  <div className='assestsData-cont'>
                   <h2> { data[Object.keys(data)] }  </h2>  <h1> { Object.keys(data) } </h1>
                  
                   </div>
                })
              }
             
            </div>

            <div className='NFTSection-btn'>
             <h1 onClick={()=>setSwitchSection(false)} className={!switchSection && 'bg-gray-500 rounded-lg'} >Imported_NFTs</h1>
                <h1 onClick={()=>setSwitchSection(true)} className={switchSection && 'bg-gray-500 rounded-lg'}>Staked_NFTs</h1>
            
            </div>
          
          </div>
           
          {
            !switchSection ? <ImportedNFTs/> 
            :
            <StakedNFTs/>
          }

          </div>
            
          
        </div>
    );
};

export default UserDashboard;
