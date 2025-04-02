const express=require("express")
const app=express()
const cors=require("cors")
const BodyParser=require("body-parser")
const authRouter=require("./routes/AuthRouter")
const productRouter=require("./routes/ProductRouter")

const PORT=process.env.PORT || 8080


require("dotenv").config()
require("./models/db")

app.use(BodyParser.json())
app.use(cors()) // different ports can communicate 



app.use ("/auth",authRouter)
app.use ("/products",productRouter)


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})