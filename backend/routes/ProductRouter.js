const router = require("express").Router()
const ensureAuthenticated=require("../middlewares/auth")

router.get("/",ensureAuthenticated,(req,res)=>{
  //  console.log(req.user)
    return res.status(401).json([
        {
            "name":"mobile",
           "price":"10000"
        },
        {
            "name":"LED",
            "price":"20000"
        }
    ])
})



module.exports=router