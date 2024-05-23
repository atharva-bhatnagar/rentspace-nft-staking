Canister="nft-staking-rentspace-backend"
nftID="sampleNFTID"
metadata="sampleMetadata"
canisterID="sampleCanisterID"
pageNumber=1
pageSize=10




echo "---------Importing new NFT----------"
dfx canister call $Canister importNewNFT '(record {
 id="'${nftID}'";
 metadata="'${metadata}'";
 canisterID="'${canisterID}'"; 
})'


echo "---------Staking imported NFT----------"
dfx canister call $Canister stakeNFT '("'${nftID}'")'

echo "---------Getting details of imported NFT----------"
dfx canister call $Canister getImportedNFTDetails '("'${nftID}'")'


echo "---------Getting details of staked NFT----------"
dfx canister call $Canister getStakedNFTDetails '("'${nftID}'")'

echo "---------Listing all staked NFTs with pagination----------"
dfx canister call $Canister getAllStakedNFTs '(nat'${pageNumber}', nat'${pageSize}')'


echo "---------Unstaking NFT----------"
dfx canister call $Canister unstakeNFT '("'${nftID}'")'