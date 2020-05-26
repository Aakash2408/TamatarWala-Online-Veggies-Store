import express from 'express';
import data from './data';
import data2 from './data2';

const app =express();
app.get("/api/products",(req,res)=>{

    res.send(data.products);
    // res.send(data2.products);
});

app.listen(5000, ()=>{console.log("Server started at http://localhost:5000")}); 