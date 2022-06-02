const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

// import coustom lib
const {Read , Write} = require('./lib/crud');

// set port 
const PORT = process.env.PORT || 3300;

// config cors 
const cors = require("cors");
app.use(cors({
    origin : "*"
}))




app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());


// set Template engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');

const dataPath = path.join(__dirname+'/data/data.json');

// set route 
// set home route 
    app.get('/',(req,res)=>{
        res.render("home");
    });
    app.get('/login',(req,res)=>{
        res.render("login");
    });
// set login route 
    app.post('/login',(req,res)=>{
        let {username , password} = req.body;
        
        if(username === process.env.USER_NAME && password === process.env.PASSWORD){
            res.render("user")
        }else{
            res.send('wrong password')
        }
        
    })

// api route 

app.get('/data',(req,res)=>{
    let data = Read(dataPath);
    res.status(200).json(data);
})

// init server 
app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})