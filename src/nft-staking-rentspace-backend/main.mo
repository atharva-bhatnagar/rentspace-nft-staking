import Trie "mo:base/Trie";
import UserModel "models/userModel";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Error "mo:base/Error";
import UserController "controllers/userController";
import Contants "utils/contants";
import Functions "utils/functions";
actor {
  var userRecords=Trie.empty<Principal,UserModel.User>();

  public shared ({caller}) func createNewUser(_userdata:UserModel.UserInputData):async Result.Result<Text,Text>{
    try{
      let userRes = UserController.createNewUser(_userdata,caller);
      switch(userRes){
        case(#ok(value)){
          userRecords:= Trie.put(userRecords,Contants.userKey caller,Principal.equal,value).0;
          return #ok(value.name # " successfully registered!");
        };
        case(#err(err)){
          return #err(err);
        }
      };
    }catch e {
      return #err(Error.message(e));
    }
  };

  public shared ({caller}) func getUserData():async Result.Result<UserModel.User,Text>{
    try{
      await Functions.checkAnonymous(caller);
      switch(Trie.get(userRecords,Contants.userKey caller,Principal.equal)){
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
};
