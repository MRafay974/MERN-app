const router = require("express").Router()
const {SignUpValidation,loginValidation}=require("../middlewares/authValidation")
const {SignUp,Login}=require("../controllers/authController")

router.post("/signUp",SignUpValidation,SignUp)


router.post("/login",loginValidation,Login)

module.exports=router