// importin the user model
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { type } = require('os')

// fucntion for registration process
const register = (req, res, next) => {
    bcryptjs.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: hashedPass,
            phone: req.body.phone
        })
        user.save()
            .then(user => {
                res.json({
                    message: "User Added Successfully"
                })
            })
            .catch(error => {
                res.json({
                    message: "Eorror occured in saving new user"
                })
            })
    })
}


// Fucntion to login user 
const login = async(req, res, next) => {
    var email = req.body.email
    var password = req.body.password
    console.log(password)
    try {
        let user =await User.findOne({email})
        if (!user) {
            return res.status(400).json({error :"Please Enter the correct credentials"})
        }

        const passwordCompare = await bcryptjs.compare(password, user.password)
        
        if (!passwordCompare) {
            return res.status(400).json({error :"Please Enter the correct password"})
        }

        const data = {
            user:{
                id : user.id,
            }
        }
        const authtoken = jwt.sign(data, 'verySecretvalue')
        res.json({authtoken})

    } catch (error) {
        res.json({
            error : ""
        })
    }
}


// function to search a specific user
const show = (req, res) => {
    let userName = req.params.username
    User.findOne({ username: userName }, function (err, doc) {
        if (err) throw err
        if (doc) {
            res.json({
                message: `User Found with username ${userName}`
            })
        }
        else {
            res.json({
                message: "User Not Found"
            })
        }
    })
}

// function to follow and unfollow
const follow = (req, res) => {
    var id = req.params.followId
    console.log(id)
    User.findByIdAndUpdate(id,{
        $push : {followers : req.user._id}
    }, {new : true}, (err,result) => {
        if(err){
            return res.status(422).json({error: err})
        }
        
        User.findByIdAndUpdate(req.user._id,{
            $push : {following : id},
            
        }, {new : true}).then(result => {
            res.json({
                res
            })
        })
        .catch(error => {
            return res.status(422).json({err : error})
        })
    }
    )
}

const Unfollow = (req, res) => {
    var id = req.params.followId
    User.findByIdAndUpdate(id,{
        $pull : {followers : req.user._id}
    }, {new : true}, (err,result) => {
        if(err){
            return res.status(422).json({error: err})
        }
        
        User.findByIdAndUpdate(req.user._id,{
            $pull : {following : id},
            
        }, {new : true}).then(result => {
            res.json({
                res
            })
        })
        .catch(error => {
            return res.status(422).json({err : error})
        })
    }
    )
}

module.exports = {
    register, show, login, follow, Unfollow
}