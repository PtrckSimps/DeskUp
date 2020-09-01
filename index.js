const hbs = require("hbs")
const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")


const app = express()
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(path.join(__dirname, 'static')));
app.set("view engine", "hbs") 

const urlencoder = bodyparser.urlencoded({
    extended: false
})

app.use(session({
    secret: "very secret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60 * 60
    }
}))

app.get('/', (req,res) =>{
    res.render('index.hbs')
})

app.get("/reviews", function(req, res){
    res.render('reviews.hbs')
})

app.get('/featured', (req,res) =>{
    res.render('featured.hbs')
})

app.get("/logreg", function(req, res){
    res.render('logreg.hbs')
})

app.get("/register", function(req, res){
    res.render('register.hbs')
})

app.get("/login", function(req, res){
    res.render('login.hbs')
})

app.listen(3000, ()=> { 
    console.log("Server ready")
})