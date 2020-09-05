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

app.set("view engine", hbs) 

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
    //logged in
    if(req.session.username){
        res.render("index.hbs",{
            username: req.session.username
        })
    }//not logged in
    else{
        res.render("index.hbs", {
            username: ""
        }) 
    }
})

app.post("/register", urlencoder, function(req, res){
    let username = req.body.un
    let password = req.body.pw

    if(username.trim() == "" || password.trim() == ""){
        res.render("register.hbs", {
            error: "Enter a username and password"
        })
    }else if(!isAvailable(username)){
        res.render("register.hbs", {
            error: "username is already taken"
        })
    }else{
        req.session.username = req.body.un
        users.push({
            username: username,
            password: password
        })
        res.redirect("/")
    }
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
    // not registered or wrong inputs
    if(!matches(req.body.un, req.body.pw)){
        res.render("login.hbs", {
            error: "not match"
        })
    }
    // credentials match
    else{
        req.session.username = req.body.un
        res.redirect("/")
    }
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
    req.session.destroy()
    res.redirect("/")
})

app.get("/register", function(req, res){
    //Going to register page
    res.render('register.hbs')
})

app.get("/login", function(req, res){
    //Going to register page
    res.render('login.hbs')
})


app.get("/reviews", function(req, res){
    //User goes to Categories page
    res.render('reviews.hbs', {
        username: req.session.username
    })
})

app.get("/ReviewPost", urlencoder, function(req, res){
    //user want to view review post
    res.render('reviewPost.hbs', {
        username: req.session.username
    })
})

app.get('/featured', (req,res) =>{
    //User goes to Featured page
    res.render('featured.hbs', {
        username: req.session.username
    })
})

app.get('/featuredPost', urlencoder, (req,res) =>{
    //User goes to Featured Specific page
    res.render('featuredPost.hbs', {
        username: req.session.username
    })
})

app.get('/categories', (req,res) =>{
    //User goes to Categories page
    res.render('categories.hbs', {
        username: req.session.username
    })
})

app.get("/monitorCategory" , function(req, res) {
    res.render('monitorCategory.hbs', {
        username: req.session.username
    })
})

app.get("/manage-post", function(req, res){
    //Going to register page
    res.render('managepost.hbs', {
        username: req.session.username
    })
})

app.post("/comment", urlencoder, function(req, res){
    var comment = req.body.comment

    //to implement - adding to 
    
    res.render('reviewPost.hbs', {
        username: req.session.username
    })
})

app.post("/add", urlencoder, function(req, res){

    //to implement - adding to db
    
})

app.patch("/edit", urlencoder, function(req, res){
    //edit post content
    //to implement - edit content  db
    
})

app.delete("/delete", urlencoder, function(req, res){
    //delete a post
    //to implement - delete content  db
    
})

app.listen(3000, ()=> { 
    console.log("Server ready")
})