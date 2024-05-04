import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Debug "mo:base/Debug";
import Result "mo:base/Result";
module{
    public func checkAnonymous(_user:Principal): async(){
        if(Principal.isAnonymous(_user)){
            let err=Error.reject("Anonymous users cannot interact!");
            throw err;
        };
    };
}