import jwt from "jsonwebtoken";
import express from 'express';
import userinfo from '../Data/userinfo.js'
import {decodeToken, findAuctionsByID, findByID, maxID} from "../utils/info utils.js";
import {IsLogedIn} from "../Middleware/IsLogedIn.js";
import {hashpassword} from "../Middleware/PaswordHash.js";
import auctioninfo from "../Data/auctioninfo.js";
const router = express.Router();
//gets all users
router.get('/',function (req, res) {
    return res.status(200).json(userinfo);
});
//gets a single user
router.get('/:id',function (req, res) {
    if (isNaN(req.params.id)){
        return res.status(400).json({error: 'the given ID is not a number'});
    }
    const auction=findByID(userinfo,Number.parseInt(req.params.id))
    return res.status(200).json(auction);
});
//gets all auctions for a single user
router.get('/:id/auctions',IsLogedIn,function (req,res){
    const {id} = req.params;
    const {authorization} = req.headers;

    if(isNaN(id)){
        return res.status(400).json({error:'Given ID is not a number!'});
    }

    if(Number.parseInt(req.params.id) === decodeToken(authorization).id){
        return res.status(200).json(findAuctionsByID(auctioninfo,Number.parseInt(id)));
    }

    return res.status(404);
});
//edits user info
router.patch('/:id',hashpassword,function (req,res) {
    const newuserinfo=req.body;

    let checkuser=userinfo.find(data=>data.Email===req.body.Email)
    if (isNaN(req.params.id)){
        return res.status(400).json({error: 'the given ID is not a number'});
    }
    if ('id' in req.body){
        return res.status(400).json({error:'changing the ID is not allowed'});
    }
    if (checkuser){
        return res.status(400).json({error:'Email is already associated with a registered account !!'})
    }
    jwt.sign({Email:newuserinfo.Email,IsAdmin:newuserinfo.isAdmin,id:newuserinfo.id},'heHe',{},(err,tok)=>{
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).json({token:tok});

    })
    const pathID=Number.parseInt(req.params.id);
    const finduser = findByID(userinfo,pathID);
    Object.assign(finduser,req.body);

    return res.status(200).json(newuserinfo);

});
//post new user
router.post('/',hashpassword,function (req,res){
    const newuser=req.body;
    console.log('posted '+ newuser.Email+' '+ newuser.Password)

    if (newuser.Email===undefined||newuser.Email===''){
        return res.status(400).json({error:'No Email given'})
    }

    if(newuser.Password===undefined||newuser.Password===''){
        return res.status(400).json({error:'No Password given'})
    }
    if (newuser.isAdmin===undefined){
        newuser.isAdmin=false;
    }
    const usersearch=userinfo.find(info =>newuser.Email===info.Email);
    if (!usersearch){
        console.log('user not false')
        newuser.id=maxID(userinfo)+1;
        console.log(newuser.id)
        userinfo.push(newuser);
        jwt.sign({Email:newuser.Email,IsAdmin:newuser.isAdmin,id:newuser.id},'heHe',{},(err,tok)=>{
            if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).json({token:tok});

        })
    }else if (usersearch){
        return res.status(400).json({error: 'email already taken!!!'});

    }
});
//deletes user
router.delete('/:id',IsLogedIn,function (req,res){
    const {id} = req.params;
    console.log(id)
    if (isNaN(id)){
        return res.status(400).json({error: 'the given ID is not a number'});
    }
    if (id == undefined){
        return res.status(404).json({error: 'ID not given'});
    }
   userinfo.splice(userinfo.indexOf(findByID(userinfo,Number.parseInt(id))));
    console.log('deleted account with id: '+id);
    console.log(userinfo);
    return res.status(200).json(userinfo);

});



export default router;



