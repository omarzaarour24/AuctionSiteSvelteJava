import {getID} from "./user.js";
import Token from "../tokenstore/Tokens.js";
import router from "page";
import Tokens from "../tokenstore/Tokens.js";

export async function LoginHandler(fields,msg) {
    console.log(fields)
    const response = await fetch('http://localhost:3000/api/Authorization',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields)
    })
    const json = await response.json();

    if(response.ok) {

        console.log(json.token+" Id: "+response.id)
        Token.token = json.token;

        router('/')
        return
    } else if (!(response.ok)){
        console.log(json.error);
        msg=json.error;
    }
}
export async function NewAccount(fields,msg) {
    console.log(fields)
    const response = await fetch('http://localhost:3000/api/users',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields)
    })
    const json = await response.json();
    if(response.ok) {
        console.log(json.token)
        Token.token = json.token;
        console.log(json.token+" Id: "+getID())
        msg="Account has been created please login"
        router('/users/'+getID()+'/auctions')
        return
    } else if (!(response.ok)){
        console.log(json.error);
        msg=json.error;
    }
}
export async function Getuser(id){
    console.log(id)
    const response = await fetch('http://localhost:3000/api/users/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
    const Data = await response.json();

    if(response.ok){
        console.log(Data)
        return Data;
    }else{
        throw new Error(response.error)
    }
}
export async function AllUsers(){
    const res=await fetch('http://localhost:3000/api/users',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        }

    })
    const info = await res.json();
    if (res.ok){
        console.log(info)
        return info;
    }else{
        throw new Error(res.error);
    }
}
export async function DeleteAccount(){
    const res=await fetch('http://localhost:3000/api/users/'+getID(),{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        }

    })
    const info = await res.json();
    if (res.ok){
        console.log('user deleted!!')
        Tokens.token=undefined;
        router ('/')
        return info;
    }else{
        throw new Error(res.error);
    }
}
export async function AdminDeleteAccount(id){
    const res=await fetch('http://localhost:3000/api/users/'+id,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        }

    })
    const info = await res.json();
    if (res.ok){
        console.log('user deleted!!')
        router ('/')
        return info;
    }else{
        throw new Error(res.error);
    }
}
export async function EditUser(id, msg,edit,feilds){
    edit ===false;
    console.log(feilds)
    const response = await fetch('http://localhost:3000/api/users/'+id,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Tokens.token}`
        },
        body: JSON.stringify(feilds)
    })
    const json = await response.json();
    if(response.ok){
        msg='Changes Saved!!!'
        console.log('edit complete')
        router(`/`)
    }else{
        throw new Error(response.error)
        // error = json.error;
    }
    router(`/`)
    msg='Changes Saved!!!'
}

