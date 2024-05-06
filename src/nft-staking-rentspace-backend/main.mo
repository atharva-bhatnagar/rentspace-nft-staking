import UserModel "models/userModel";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Error "mo:base/Error";
import TrieMap "mo:base/TrieMap";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Functions "utils/functions";
import NftModel "models/nftModel";
actor {
  var userRecords=TrieMap.TrieMap<Principal,UserModel.User>(Principal.equal,Principal.hash);
  var importedNftRecords=TrieMap.TrieMap<Text,NftModel.ImportedNFT>(Text.equal,Text.hash);
  var stakedNftRecords=TrieMap.TrieMap<Text,NftModel.StakedNFT>(Text.equal,Text.hash);
  // var stakedNftRecords=Trie.empty<Text,NftModel.StakedNFT>();

  // to do -->

  // 1. user creation Function d
  // 2. user details get Functions d
  // 3. import nft function d
  // 4. stake imported nfts d
  // 5. list all the staked nfts with pagination d
  // 6. list nft imported by a user d
  // 7. list nft staked by user d
  // 8. Get NFT details for imported NFTs d
  // 9. Get NFT details for staked NFTs d
  // 10. unstake a specific NFT
  // 11. calculate result
  // 12. Add DIP721 in staking and unstaking

  //Create new user
  public shared ({caller}) func createNewUser(_userdata:UserModel.UserInputData):async Result.Result<Text,Text>{
    try{
      await Functions.checkAnonymous(caller);
      let newUser:UserModel.User={
        id=caller;
        name=_userdata.name;
        email=_userdata.email;
        importedNFTs=[];
        stakedNFTs=[];
        rewardPoints=0;
      };
      userRecords.put(caller,newUser);
      return #ok(newUser.name # " successfully registered!");
      
    }catch e {
      return #err(Error.message(e));
    }
  };

  // Get existing user data
  public shared ({caller}) func getUserData():async Result.Result<UserModel.User,Text>{
    try{
      await Functions.checkAnonymous(caller);
      switch(userRecords.get(caller)){
        case(null){
          return #err("No user data found for this principal");
        };
        case(?value){
          return #ok(value);
        };
      }
    }catch e {
      return #err(Error.message(e));
    };
  };

  // Import New NFTs
  public shared ({caller}) func importNewNFT(_nftData:NftModel.ImportedNFTInputData):async Result.Result<Text,Text>{
    try{
      await Functions.checkAnonymous(caller);
      let nftID=_nftData.id;
      
      switch(importedNftRecords.get(nftID)) {
        case(null) { 
          switch(userRecords.get(caller)) {
            case(null) { 
              return #err("You are not a valid user!");
            };
            case(?user) {   
              let newImportedNFT:NftModel.ImportedNFT={
                id=_nftData.id;
                metadata=_nftData.metadata;
                owner=caller;
                isStaked=false;
                canisterID=_nftData.canisterID;
              };
              let newImportedNFTList:Buffer.Buffer<Text> = Buffer.fromArray(user.importedNFTs);
              newImportedNFTList.add(newImportedNFT.id);
              let newUserData:UserModel.User={
                id=user.id;
                stakedNFTs=user.stakedNFTs;
                name=user.name;
                email=user.email;
                rewardPoints=user.rewardPoints;
                importedNFTs=Buffer.toArray(newImportedNFTList);
              };
              userRecords.put(caller,newUserData);
              importedNftRecords.put(nftID,newImportedNFT);
              return #ok("NFT successfully imported");
            };
          };
          
        };
        case(?value) { 
          return #err("Already imported this NFT!");
        };
      };
    }catch e{
      return #err(Error.message(e));
    };
  };

  //Stake imported NFTs
  public shared ({caller}) func stakeNFT(_nftID:Text):async Result.Result<Text,Text>{
    try{
      await Functions.checkAnonymous(caller);
      switch(importedNftRecords.get(_nftID)){
        case(?value){
          if(value.owner==caller){
            switch(userRecords.get(caller)){
              case(null){
                return #err("Owner of this NFT does not exist in records!");
              };
              case(?owner){
                let newStakedNFT:NftModel.StakedNFT={
                  id=_nftID;
                  metadata=value.metadata;
                  owner=caller;
                  canisterID=value.canisterID;
                  stakedAt=Time.now();
                };
                var newStakedNFTList:Buffer.Buffer<Text> = Buffer.fromArray(owner.stakedNFTs);
                newStakedNFTList.add(_nftID);
                let newUserData:UserModel.User={
                  id=owner.id;
                  email=owner.email;
                  importedNFTs=owner.importedNFTs;
                  rewardPoints=owner.rewardPoints;
                  name=owner.name;
                  stakedNFTs=Buffer.toArray(newStakedNFTList);
                };
                userRecords.put(caller,newUserData);
                stakedNftRecords.put(_nftID,newStakedNFT);
                return #ok("Your NFT is staked now!")
              }
            }
          }
          else{
            return #err("You are not the owner of this NFT!");
          }
        };
        case(null){
          return #err("No NFT found with this ID!")
        };
      };
    }catch e{
      return #err(Error.message(e));
    };
  };
  // get all the staked NFTs by a user
  public shared ({caller}) func getAllUserStakedNFTs():async Result.Result<[Text],Text>{
    switch(userRecords.get(caller)){
      case(null){
        return #err("No user found with this ID");
      };case(?user){
        return #ok(user.stakedNFTs);
      };
    };
  };
  // get all the imported NFTs by a user
  public shared ({caller}) func getAllUserImportedNFTs():async Result.Result<[Text],Text>{
    switch(userRecords.get(caller)){
      case(null){
        return #err("No user found with this ID");
      };case(?user){
        return #ok(user.importedNFTs);
      };
    };
  };
  // Get details of an imported NFT
  public func getImportedNFTDetails(_nftID:Text):async Result.Result<NftModel.ImportedNFT,Text>{
    switch(importedNftRecords.get(_nftID)){
      case(null){
        return #err("No NFT is imported with this ID");
      };
      case(?value){
        return #ok(value);
      };
    };
  };
  // Get details of a Staked NFT
  public func getStakedNFTDetails(_nftID:Text):async Result.Result<NftModel.StakedNFT,Text>{
    switch(stakedNftRecords.get(_nftID)){
      case(null){
        return #err("No NFT staked with given ID");
      };
      case(?value){
        return #ok(value);
      };
    };
  };
  // List all the staked NFTs with pagination
  public func getAllStakedNFTs(_pageNo:Nat,_pageSize:Nat):async Result.Result<[(Text,NftModel.StakedNFT)],Text>{
    try{
      let nftIter=stakedNftRecords.entries();
      let nftArr=Iter.toArray(nftIter);
      if(_pageNo < 1){
        return #err("Page number starts from 1");
      };
      let startIndex=(_pageNo - 1)*10;
      var endIndex=startIndex+_pageSize;
      if(startIndex >= nftArr.size()){
        return #err("page number is exceeds the number of entries");
      };
      if(endIndex >= nftArr.size()){
        endIndex := nftArr.size()-1;
      };
      let filteredNFTListings=Iter.toArray(Array.slice(nftArr,startIndex,endIndex));
      return #ok(filteredNFTListings)
    }catch e {
      return #err(Error.message(e));
    };
  };
  // Un-staking an NFT
  public shared ({caller}) func unstakeNFT(_nftID:Text):async Result.Result<Text,Text>{
    switch(userRecords.get(caller)){
      case(null){
        return #err("You are not a valid user!");
      };
      case(?user){
        switch(stakedNftRecords.get(_nftID)){
          case(null){
            return #err("No staked NFT found for this ID");
          };
          case(?nft){
              if(nft.owner != caller){
                return #err("You are not the owner of the staked NFT !");
              };
              let updatedImportedNFTs:Buffer.Buffer<Text> = Buffer.fromArray(user.importedNFTs);
              updatedImportedNFTs.add(_nftID);
              let updatedStakedNFTs:Buffer.Buffer<Text> = Buffer.fromArray(user.stakedNFTs);
              var removeIndex=0;
              switch(Buffer.indexOf(_nftID,updatedStakedNFTs,Text.equal)) {
                case(null) { 
                  return #err("No staked NFT with this ID owner by you");
                };
                case(?value) {
                  removeIndex:=value;
                };
              };
              ignore updatedStakedNFTs.remove(removeIndex);
              let updatedUser:UserModel.User={
                id=caller;
                name=user.name;
                email=user.email;
                importedNFTs=Buffer.toArray(updatedImportedNFTs);
                stakedNFTs=Buffer.toArray(updatedStakedNFTs);
                rewardPoints=user.rewardPoints+1;//will be replaced by a reward calculation system
              };
              ignore userRecords.replace(caller,updatedUser);
              stakedNftRecords.delete(_nftID);
              return #ok("NFT successfully unstaked! ");
          };
        };
      };
    };
    return #err("Incomplete");
  };
};
