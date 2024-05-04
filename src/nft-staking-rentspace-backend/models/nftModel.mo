import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";

module{
    public type ImportedNFT = {
        id:Text;
        metadata:Text;
        isStaked:Bool;
        owner:Principal;
        canisterID:Text;
    };
    public type StakedNFT = {
        id:Text;
        metadata:Text;
        stakedAt:Nat;
        owner:Principal;
        canisterID:Text;
    };
    public type ImportedNFTInputData={
        id:Text;
        metadata:Text;
        canisterID:Text;
    }
};