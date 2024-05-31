
Canister="nft-staking-rentspace-backend"
name="user1"
email="random@gmail.com"
pageNumber=1
pageSize=10



echo "---------Creating new user----------"
dfx canister call $Canister createNewUser '(record {
     name="'${name}'";
     email="'${email}'";
})'


echo "---------Getting user data----------"
dfx canister call $Canister  getUserData


echo "---------Listing all imported NFTs by user----------"
dfx canister call $Canister getAllUserImportedNFTs


echo "---------Listing all staked NFTs by user----------"
dfx canister call $Canister getAllUserStakedNFTs