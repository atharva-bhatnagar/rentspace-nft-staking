import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Float "mo:base/Float";
module{
    public func checkAnonymous(_user:Principal): async(){
        if(Principal.isAnonymous(_user)){
            let err=Error.reject("Anonymous users cannot interact!");
            throw err;
        };
    };
    public func calculateReward(_stakeTime:Int):async Nat{
        let currTime:Int=Time.now();
        if(currTime < _stakeTime){
            let err=Error.reject("In-correct stake time for nft");
            throw err;
        };
        let diff=Float.fromInt(currTime - _stakeTime) / 10000000000;
        return Int.abs(Float.toInt(diff));
    };
}