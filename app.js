const express= require('express');
const dotenv= require('dotenv').config();
const app= express();
const PORT_NUMBER= process.env.PORT_NUMBER || 5400
app.listen(PORT_NUMBER,()=>{
    console.log(`APP URL is http://localhost:${PORT_NUMBER}`)
})

app.get('/',(req,res,next)=>{
    res.send("Hello")
})