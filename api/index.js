require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

var userRouter = require("./router/users")

var app = express();  
const ports = process.env.PORT || 3000
let url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@simplelogin.cnoez.mongodb.net/${process.env.DATABASE}`;
mongoose.connect(url,
{ useNewUrlParser: true, useUnifiedTopology: true }  )
.then(() => {
    app.listen(ports, console.log(`server runnig  on port ${ports}`) )
}) 
.catch((err) => { console.log(`could not connect to database ${err}`)  }) 

app.use(cors()) ;
app.use(express.json()) ;
app.use('/', userRouter)