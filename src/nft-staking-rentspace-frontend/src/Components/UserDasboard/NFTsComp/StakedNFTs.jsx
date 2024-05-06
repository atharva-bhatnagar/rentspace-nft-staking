import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../Constants/useNFTsData';

const StakedNFTs = () => {
  // State variables
  const { NFTs } = NFTsData();
  const [stakedNFTs, setStakedNFTs] = useState([]);

  // Hooks
  const navigate = useNavigate();

  // Effect hook to filter staked NFTs
  useEffect(() => {
    const stakedNFTs = NFTs.filter((data) => data.staked);
    setStakedNFTs(stakedNFTs);
  }, [NFTs]);

  // Event handler for viewing NFT details
  function nftDetailsHandle(id, name, img) {
    navigate('/StakNftDetails', { state: { id, name, img } });
  }

  // Render Method
  return (
    <div className='nft-Maincont'>
      {stakedNFTs.map((nft, ind) => (
        <div className='nftCont' key={ind} onClick={() => nftDetailsHandle(nft.id, nft.name, nft.img)}>
          <div className='nftImg-cont'>
            <img src={nft.img} alt='nft-img' />
          </div>
          <h1>{nft.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default StakedNFTs;
