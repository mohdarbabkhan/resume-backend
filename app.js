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



app.listen(port,(req,res)=>{
    console.log(`server started at ${port}`);
});