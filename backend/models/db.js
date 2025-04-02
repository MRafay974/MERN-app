const mongoose=require("mongoose")

const conn_string="mongodb+srv://rafay:rafay@cluster0.gbkoiro.mongodb.net/auth-db?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(conn_string).then(()=>{
    console.log("MongoDB Connected")
}).catch(()=>{
    console.log("MongoDB Disconnected")
})