const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// user registration route 
const AuthRoute = require('./routes/AuthRoute') 


// Connection to the database
mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true, useUnifiedTopology : true});

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})

db.once('open', ()=>{
    console.log("DataBase Connected")
})

// Making Express App
const app = express();
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// declaring port for nodejs app
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`)
})

// hiting the api
app.use('/api', AuthRoute)