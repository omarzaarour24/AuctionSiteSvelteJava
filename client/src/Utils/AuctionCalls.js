import {getID} from "./user.js";
import Tokens from "../tokenstore/Tokens.js";
import router from "page";

//gets all auctions
export async function getallauctions(){
    const res=await fetch('http://localhost:3000/api/auctions',{
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


//all auctions of user
export async function GetAuctions(){
    console.log(getID())
    const response = await fetch(`http://localhost:3000/api/users/${getID()}/auctions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Tokens.token}`
        }})
    const data = await response.json();

    if(response.ok){
        // activeItem='current Auctions';
        return data;
    }else{
        throw new Error(response.error)
    }
}

//gets auction data
export async function getauctionifo(id){
    const res=await fetch(`http://localhost:3000/api/auctions/${id}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        }
    })
    const Info = await res.json();
    if (res.ok){
        // if (Info.UserId===getID()||IsAdmin(Tokens.token)){
        //
        // }
        return Info;
    }else{
        throw new Error(res.error);
    }



}

//posts editted auction data
// the req works and the info is updated but it gives errors in the console for no reason
// i tired my best to find a solution and even asked my classmates for help in case i am missing something
// but all our brain power combined couldnt find a solution
export async function Edit(params,msg,edit,feilds){
    edit ===false;
    console.log(feilds)
    const response = await fetch('http://localhost:3000/api/auctions/'+params.id,{
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
    // msg='Changes Saved!!!'
}

//deletes auction
export async function deleteauc(params){
    console.log(Tokens.token)
    const response = await fetch('http://localhost:3000/api/auctions/'+params.id ,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Tokens.token}`
        }
    })
    if(response.status === 200){
        console.log('auction deleted')
        router('/')
    }
}