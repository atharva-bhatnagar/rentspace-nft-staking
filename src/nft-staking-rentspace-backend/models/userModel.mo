import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import List "mo:base/List";

module{
    public type User={
        id:Principal;
        name:Text;
        email:Text;
        importedNFTs:[Text];
        stakedNFTs:[Text];
        rewardPoints:Nat;
    };
    public type UserInputData={
        name:Text;
        email:Text;

    }
};

