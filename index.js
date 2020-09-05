const hbs = require("hbs")
const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")

let users =  []
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

    // if(req.session.username){
    //     res.render("home.hbs",{
    //         username: req.session.username
    //     })
    // }else{
    //     res.render("index.hbs") 
    // }
})

app.post("/register", urlencoder, function(req, res){
    // let username = req.body.un
    // let password = req.body.pw

    // if(username.trim() == "" || password.trim() == ""){
    //     res.render("register.hbs", {
    //         error: "Enter a username and password"
    //     })
    // }else if(!isAvailable(username)){
    //     res.render("register.hbs", {
    //         error: "username is already taken"
    //     })
    // }else{
    //     req.session.username = req.body.un
    //     users.push({
    //         username: username,
    //         password: password
    //     })

    //     res.redirect("/")
    // }
    res.render('home.hbs')
})

function isAvailable(username){
    for(let i =0; i < users.length; i++ ){
        if(users[i].username == username){
            return false
        }
    }
    return true
}

app.post("/login", urlencoder, function(req, res){
    // if(!matches(req.body.un, req.body.pw)){
    //     res.render("login.hbs", {
    //         error: "not match"
    //     })
    // }else{
    //     res.render("home.hbs",{
    //         username: req.body.un
    //     })
    // }
    res.render('home.hbs')
})

function matches(username, password){
    for(let i =0; i < users.length; i++ ){
        if(users[i].username == username && users[i].password == password){
            return true
        }
    }
    return false
}

app.get("/signout", urlencoder, (req, res) =>{
    // req.session.destroy()
    res.redirect("/")
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

app.get("/manage-post", function(req, res){
    //Going to register page
    res.render('managepost.hbs')
})

app.get("/monitorCategory" , function(req, res) {
    res.render('monitorCategory.hbs')
})



app.listen(3000, ()=> { 
    console.log("Server ready")
})