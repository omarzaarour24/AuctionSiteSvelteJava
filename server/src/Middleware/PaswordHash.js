import Bcrypt from 'bcrypt';
//^ is used ro create the hash
export function hashpassword (req,res,next) {
    //checks if the password is present or not
    if ( req.body.Password === undefined|| req.body.Password===''){
        next();
    }
    //this is used to create the hashed password

    Bcrypt.hash(req.body.Password,10,(error,hash)=>{
        //if an error is present then a status code is returned.
        if (error){
            return res.status(500).json(error)
        }
        //the hash is saved in the place of the password
        req.body.Password=hash;
        next();
    });
}