import React, { useEffect, useState } from 'react';
import './NFTsComp.css';
import { useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../Constants/useNFTsData';

const ImportedNFTs = () => {
  // State variables
  const { NFTs } = NFTsData();
  const [importedNFTs, setImportedNFTs] = useState([]);

  // Hooks
  const navigate = useNavigate();

  // Effect hook to filter imported NFTs
  useEffect(() => {
    const importedNFTs = NFTs.filter((data) => !data.staked);
    setImportedNFTs(importedNFTs);
  }, [NFTs]);

  // Event handler for viewing NFT details
  function nftDetailsHandle(id, name, img) {
    navigate('/ImpNftDetails', { state: { id, name, img } });
  }

  // Render Method
  return (
    <div className='nft-Maincont'>
      {importedNFTs.map((nft, ind) => (
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

export default ImportedNFTs;
