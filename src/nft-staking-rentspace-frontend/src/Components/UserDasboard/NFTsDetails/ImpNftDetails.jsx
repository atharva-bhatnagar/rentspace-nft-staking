import React from 'react';
import './NFTsDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../Constants/useNFTsData';

const ImpNftDetails = () => {
const Navigate = useNavigate();

  // Destructure NFTs and setNFTs from NFTsData hook
  const { NFTs, setNFTs } = NFTsData();

  // Get the location object using useLocation hook
  const location = useLocation();

  // Access nftData from location.state if it exists
  const nftData = location.state;

  // Function to handle staking
  const handleStake = (id) => {
    // Find the index of the NFT with the given id
    const index = NFTs.findIndex(nft => nft.id === id);
    
    // If the index is found, update the staked property of that NFT
    if (index !== -1) {
      // Create a copy of NFTs array to avoid mutating state directly
      const updatedNFTs = [...NFTs];
      updatedNFTs[index] = { ...updatedNFTs[index], staked: true };
      
      // Update the NFTs state with the new array
      setNFTs(updatedNFTs);
      
    }
  };

  return (
    <div className='nftDetails-Cont'>
      <div className='nft-img'>
        <img src={nftData.img} alt={nftData.name} />
      </div>
      <div className='nftDetails-cont'>
        <div className='nftDetails'>
          <h1>{nftData.name}</h1>
          <p>Other Details</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, quia?</p>
          {/* Use a button element for better accessibility */}
          <button onClick={() => handleStake(nftData.id)} className='stake-btn'>Stake</button>
        </div>
      </div>
    </div>
  );
}

export default ImpNftDetails;
