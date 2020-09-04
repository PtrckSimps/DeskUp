const hbs = require("hbs")
const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")


const app = express()
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/bootjs', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

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
    //access the homepage

    // not logged in visitor
    res.render('index.hbs')
    
    //logged in visitor
    //res.render('home.hbs')
})

app.post("/login", urlencoder, function(req, res){
    res.render('home.hbs')
})

app.post("/register", urlencoder, function(req, res){
    res.render('home.hbs')
})

app.get("/reviews", function(req, res){
    //User goes to Categories page
    res.render('reviews.hbs')
})

app.get('/featured', (req,res) =>{
    //User goes to Featured page
    res.render('featured.hbs')
})

app.get('/categories', (req,res) =>{
    //User goes to Categories page
    res.render('categories.hbs')
})

// app.get("/logreg", function(req, res){
//     res.render('logreg.hbs')
// })

app.get("/register", function(req, res){
    //Going to register page
    res.render('register.hbs')
})

app.get("/login", function(req, res){
    //Going to register page
    res.render('login.hbs')
})

app.get("/ReviewPost", urlencoder, function(req, res){
    //user want to view review post
    //get post id
    
    //if not logged
    res.render('reviewPost.hbs')

    //else
    // res.render('reviewPostUser.hbs')
})


app.listen(3000, ()=> { 
    console.log("Server ready")
})