const express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

var User = require("../models/user");
const jwtSecret = "51778657246321226641fsdklafjasdkljfsklfjd7148924065";

function checkExistingEmail(email) {
    return User.findOne({email:email}).then(function(result) {
        if (result == null) {
            return {
                status: 200,
                message: 'email do not exist'
            }
        } else {
            return {
                status: 409,
                message: 'email exist'
            }
        }
    })
}

router.post('/register', (req, res, next) => {
    let { email, username, password, creation_dt} = req.body;
    var user = new User({
        email: email,    
        username, username,
        password: User.hashPassword(password),
        creation_dt: new Date()
    })  

    checkExistingEmail(email).then(function(valid) {
        if(valid.status === 409) {
          res.sendStatus(409)
        } else if (valid.status === 200) {
            let promise = user.save();
            promise.then(function(doc) {
                console.log('email is valid');
                return res.status(201).json(doc)
            }) 
            promise.catch(function(err) {
                return res.status(501).json({message: 'error on registrer'})
            })  
        }
    }).catch((err) => {
        console.log(err, 'error');
    })
   
   
})

/*********************** login  ***********/ 
router.post('/login', (req, res, next) => { 
  let promise = User.findOne({email: req.body.email}).exec();

  promise.then(function(doc) {
      if(doc) {
          if(doc.isValid(req.body.password)) {
              let token = jwt.sign({username: doc.username}, jwtSecret, {expiresIn: '3h'}) 
              return res.status(200).json(token)
          } else {
              return res.status(501).json({message: ' invalid creadential'})
          }
      } else {
        return res.status(501).json({message: ' User email is not registered'})
    }
  });
  promise.catch(function(err) {
    return res.status(501).json({message: ' User email is not registered'})
})
})

router.get('/username',verifyToken, (req,res, next) => {
  return res.status(200).json(decodedToken.username)
}) 

var decodedToken = '';
function verifyToken(req, res, next) {
    let token = req.query.token;
    jwt.verify(token, jwtSecret, (err, tokenData) => {
        if(err) {
            return res.status(400).json({message:'user inautheriezed'})
        } 
        if(tokenData) { 
        decodedToken = tokenData; 
        next()
         }
    })
}

module.exports = router