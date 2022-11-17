const dotenv = require('dotenv');
const express = require('express');
var cookies = require("cookie-parser");

const app = express();
app.use(cookies());

dotenv.config({path:'./.env'});
const port = process.env.PORT || 5000;

require('./db/connec');


//Middleware
app.use(express.json());
app.use(require('./routes/auth'));

// we want to serve build on Heroku as a frontend
if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(port,(req,res)=>{
    console.log(`server started at ${port}`);
});