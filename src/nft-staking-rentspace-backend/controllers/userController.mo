import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import List "mo:base/List";
import UserModel "../models/userModel";
import NFTModel "../models/nftModel";

module{
    // creating new user
    public func createNewUser(_userInfo:UserModel.UserInputData,_caller:Principal): Result.Result<UserModel.User,Text>{
        if(Principal.isAnonymous(_caller)){
            return #err("Anonymous user cannot be registered!");
        };
        let newUser:UserModel.User={
            id=_caller;
            name=_userInfo.name;
            email=_userInfo.email;
            importedNFTs=List.nil<Text>();
            stakedNFTs=List.nil<Text>();
            rewardPoints=0;
        };
        return #ok(newUser);
    }
}