import Nat32 "mo:base/Nat32";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
module{
    type Key<K> = Trie.Key<K>;
    let SECONDS_IN_A_DAY:Nat32=0;
    public func userKey(t : Principal) : Key<Principal> {{hash = Principal.hash t; key = t}};
    public func nftKey(t : Text) : Key<Text> {{hash = Text.hash t; key = t}};
}