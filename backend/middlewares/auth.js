
const jwt=require("jsonwebtoken")


function ensureAuthenticated(req,res,next){

const auth=req.headers["authorization"]
//console.log(auth)
if(!auth){
    return res.status(403).json({message:"Unauthorized, JSON web token is required",success:false})
}

try{
    //console.log(req)

    const decode=jwt.verify(auth,process.env.Secret_key)
    req.user=decode
    next()

}catch(error){
    console.log(error)
    return res.status(401).json({message:"Unauthorized, JSON web token is expired or wrong",success:false})
}

}


module.exports=ensureAuthenticated