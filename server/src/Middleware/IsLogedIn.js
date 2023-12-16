// import jwt from "jsonwebtoken";
// export function IsLogedIn(req, res, next) {
//     const {Authoriztion} = req.headers;
//     const check = Authoriztion.split(' ');
//     if (Authoriztion===null){
//         return res.status(401).json({error:'no auth header !!'})
//     }
//     if (check.length!=2){
//         return res.status(401).json({error:'invalid Authoriztion length'})
//     }
//     if (check[0]!='Bearer'){
//         return res.status(401).json({error:'wrong Authoriztion syntax'})
//     }
//     jwt.verify(check[1],'LOL',{},(error,result)=>{
//         if(error){return res.status(401).json(error.message)}
//         next();
//     })
//
// }
import jwt from "jsonwebtoken";

export function IsLogedIn(req,res,next) {
    const {authorization} = req.headers;
    console.log(req)
    const check = authorization.split(' ');

    if(!authorization){
        return res.status(401).json({error:'Invalid Authorization header not present'});
    }

    if(check.length != 2){
        return res.status(401).json({error:'Invalid Authorization length'});
    }

    if(check[0] != 'Bearer'){
        return res.status(401).json({error:'Invalid Authorization syntax'});
    }

    jwt.verify(check[1],'heHe',{},(error,result)=>{
        if(error){return res.status(401).json(error.message)}
        if (result){
            next();
        };
    })
}