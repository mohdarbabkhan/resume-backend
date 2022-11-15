const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('../db/connec');
const User = require('../db/model/userSchema');
const authenticate = require("../middleware/authentication")

router.get('/home',authenticate,(req, res) => {
    res.send("hello server from router");
});


router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(421).json({ error: "please fill all the required fields", code: "421" });
    };

    try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            res.status(422).json({ message: "User already exists", code: "422" });
        } else if (password != cpassword) {
            res.status(422).json({ message: "password not matching", code: "422" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(201).json({ message: "user saved succesfully", code: "201" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message, code: "400" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        return res.status(422).json({ message: "please fill all the details",code:"422"});
    };
    const userLogin = await User.findOne({ email });
    if (userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
        const token = await userLogin.generateAuthToken();
        res.cookie('jwttoken', token, {
            expires: new Date(Date.now() + 2589200000),
            httpOnly: true
        })

        if (isMatch) {
            res.status(201).json({ message: "login succesfully",code:"201"});

        } else {
            res.status(404).json({ error: "login failed",code:"404"});
        }
    } else {
        res.status(404).json({ error: "invalid credentials",code:"404" });
    }
})

router.get("/about",authenticate,(req,res)=>{
    res.send(req.rootUser);
})

router.get("/getdata",authenticate,(req,res)=>{
    res.send(req.rootUser);
})

router.post("/contact",authenticate,async(req,res)=>{
    
    const {name,email,phone,message} = req.body;
    if(!name || !email || !phone || !message){
        return res.json({message:"Please fill all the details"});
    }
    const userContact = await User.findOne({_id:req.userId});
    if(userContact){
        const userMessage = await userContact.addMessage(name,email,phone,message);
        await userContact.save();
        res.status(201).json({message:"Contact details saved succesfully"})
    }else{
        res.status(401).json({message:"User not found"})
    }
})
router.get('/logout',(req,res)=>{
    res.clearCookie('jwttoken',{path:'/'})
    res.status(200).json({message:"Logged out succesfully"})
})
module.exports = router;
