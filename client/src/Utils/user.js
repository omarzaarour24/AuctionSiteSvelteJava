import jwtDecode from "jwt-decode";
import Tokens from "../tokenstore/Tokens.js";

export function IsLogedIn(){
    if(Tokens.token !== undefined){
        return true;
    }else{
        return false;
    }
}

export function getID(){
    const Data = decode(Tokens.token);
    console.log(Data)
    console.log("Logged in user "+Data.id)
    return Data.id;
}
function decode(token){
    return jwtDecode(token)
}


export function Owner(id){
    console.log('working')
    console.log(getID())
    if (getID()==id){
        return true;
    }else{
        return false;
    }
}

export function IsAdmin(token){
    if (decode(token).isAdmin==true){
        return true;
    }else{
        return false;
    }
}
export function IsOwner(Userid) {
    console.log('calledfuck')
    if (getID()===Userid){
        console.log('calledfuckyes')
        return true;
    }else if (getID()!==Userid){
        console.log('calledfuckno')
        return false;
    }

}
export function getEmail(token) {
    const data=decode(token)

    return data.Email;
}
export function getPass(PasswordHash){
    const data=decode(PasswordHash)
    console.log(data)
    return data;
}