const mongoose = require('mongoose');

const db = process.env.DATABASE;

mongoose.connect(db).then(()=>{
    console.log("Connection Succesfull");
}).catch(()=>{
    console.log("Connection Unsuccesfull");
});
