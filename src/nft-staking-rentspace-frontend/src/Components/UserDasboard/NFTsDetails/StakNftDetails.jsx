import React from 'react';
import { useLocation } from 'react-router-dom';
import { NFTsData } from '../../../Constants/useNFTsData';
import './NFTsDetails.css';

const StakNftDetails = () => {
    // Hooks
    const { NFTs, setNFTs } = NFTsData();
    const location = useLocation();

    // Data
    const nftData = location.state && location.state;

    // Event Handlers
    const handleUnstake = (id) => {
        // Find the index of the NFT with the given id
        const index = NFTs.findIndex(nft => nft.id === id);

        // If the index is found, update the staked property of that NFT
        if (index !== -1) {
            // Create a copy of NFTs array to avoid mutating state directly
            const updatedNFTs = [...NFTs];
            updatedNFTs[index] = { ...updatedNFTs[index], staked: false };

            // Update the NFTs state with the new array
            setNFTs(updatedNFTs);
        }
    };

    // Rendering
    return (
        <div className='nftDetails-Cont'>
            <div className='nft-img'>
                <img src={nftData ? nftData.img : ''} alt={nftData ? nftData.name : ''} />
            </div>
            <div className='nftDetails-cont'>
                <div className='nftDetails'>
                    <h1>{nftData ? nftData.name : 'Loading...'}</h1>
                    <p>Other Details</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, quia?</p>
                    <div className='btn-cont'>
                        <h2 className='Claim-btn'>Claim reward</h2>
                        <h2 onClick={() => handleUnstake(nftData.id)} className='unstake-btn'>Unstake</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StakNftDetails;
