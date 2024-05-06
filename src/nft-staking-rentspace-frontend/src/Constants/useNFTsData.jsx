import { useEffect, useState } from "react";

export function NFTsData(){

const [NFTs,setNFTs] =useState( [
    { id: 1, name: 'ShibaInu-Nft1', img: 'nft1.jpg', staked: true },
    { id: 2, name: 'Doge_Nft2', img: 'nft2.jpg', staked: true },
    { id: 3, name: 'BNB_Nft3', img: 'nft3.jpg', staked: false },
    { id: 4, name: 'Bitcoin_Nft4', img: 'nft4.jpg', staked: true },
    { id: 5, name: 'SHIBA_Nft5', img: 'nft2.jpg', staked: false },
    { id: 6, name: 'Nft6', img: 'nft5.jpg', staked: false },
    { id: 7, name: 'Nft7', img: 'nft7.jpg', staked: true },
    { id: 8, name: 'LitecNft8', img: 'nft6.jpg', staked: false },
    { id: 9, name: 'TRX_Nft9', img: 'nft9.jpg', staked: true },
    { id: 10, name: 'Binance_Nft10', img: 'nft5.jpg', staked: true },
    { id: 11, name: 'Nft11', img: 'nft6.jpg', staked: false },
    { id: 12, name: 'Nft12', img: 'nft1.jpg', staked: false },
    { id: 13, name: 'BInance_Nft1', img: 'nft7.jpg', staked: true },
    { id: 14, name: 'Monkey_Nft7', img: 'nft7.jpg', staked: false },
    { id: 15, name: 'Litecoin_Nft2', img: 'nft6.jpg', staked: true },
    { id: 16, name: 'Bitcoin_Nft3', img: 'nft3.jpg', staked: true },
    { id: 17, name: 'Etherium_Nft4', img: 'nft2.jpg', staked: false },
    { id: 18, name: 'Nft5', img: 'nft6.jpg', staked: false },
    { id: 19, name: 'TRX_Nft6', img: 'nft3.jpg', staked: true },
    { id: 20, name: 'Nft8', img: 'nft6.jpg', staked: false },
    { id: 21, name: 'Nft9', img: 'meownft.jpg', staked: false },
    { id: 22, name: 'Nft10', img: 'nft5.jpg', staked: true },
    { id: 23, name: 'DogeNft11', img: 'nft6.jpg', staked: true },
    { id: 24, name: 'Nft12', img: 'nft1.jpg', staked: false },

  ])

  useEffect(()=>{
    console.log(NFTs)
  },[NFTs])


  return {NFTs,setNFTs}
}


