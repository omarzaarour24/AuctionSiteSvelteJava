import express from "express";
import jwt from "jsonwebtoken"
import userinfo from '../Data/userinfo.js'
import Bcrypt from "bcrypt";
const router = express.Router();

router.post("/", async (req, res) => {
    // @todo check the credentials and return an appropriate response
    // 1. check if account exists
        // -> If no: send 400!
    // 2. check if password matches
        // -> If no: send 400!
    // 3. send token

    const userBody = req.body;

    const foundUser = userinfo.find(user=>user.Email === userBody.Email);
    if (!foundUser) {
        return res.status(404).json({error:'no user with given email was found'})
    }

    Bcrypt.compare(userBody.Password, foundUser.Password,(error,result)=> {
        if (error) {
            return res.status(500).json(error)
        }

        if (!result) {
            return res.status(400).json({error: 'Incorrect Password'})
        }

        jwt.sign({id:foundUser.id,Email:foundUser.Email,isAdmin:foundUser.isAdmin},'heHe',{},(err, tok) =>{
            if(error) {
                return res.status(500).json(error)
            }

            return res.status(200).json({token:tok})

        });
    });
});


router.get('/:id',async(req,res)=>{
    console.log('posted');
    let founduser=undefined;
    const newuser=req.body;
    console.log('params '+Email+' '+Password);
    if (newuser.Email===undefined||newuser.Email===''){
        return res.status(400).json({error:'No Email given'})
    }
    if(newuser.Password===undefined||newuser.Password===''){
        return res.status(400).json({error:'No Password given'})
    }
    if (newuser.isAdmin===undefined){
        newuser.isAdmin=false;
    }
    if (!founduser){
        return res.status(404).json({error:'no user with given email was found'})
    }
    const usersearch=userinfo.find(info =>newuser.Email.toLowerCase()===info.Email.toLowerCase());
    if (usersearch){
        Bcrypt.compare(newuser.Password,usersearch.Password,(error,result)=>{
            if(error){return res.status(500).json(error)};
            if(!result){return res.status(400).json({error:'Incorrect Password'})}
            jwt.sign({id:founduser.id,Email:founduser.Email,isAdmin:founduser.isAdmin},'heHe',{},(err, tok) =>{
                if(err) { return res.status(500).json(err)};
                return res.status(200).json({token:tok});
            });
        });
        return usersearch.id;
    }
});

export default router;