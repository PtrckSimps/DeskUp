const hbs = require("hbs")
const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")

let users =  []

const urlencoder = bodyparser.urlencoded({
    extended: false
})

router.get('/', (req,res) =>{
    //access the homepage
    //logged in
    if(req.session.username){
        // if (req.session.username == "admin"){
        //     req.session.admin = "admin"
            res.render("index.hbs",{
                username: req.session.username,
                admin: req.session.admin
            })
        // }
        // else{
        //     res.render("index.hbs",{
        //         username: req.session.username,
        //         // user: "user"
        //     })        
        // }
    //not logged in
    }else{
        res.render("index.hbs", {
            username: ""
        }) 
    }
})

router.post("/register", urlencoder, function(req, res){
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

router.post("/login", urlencoder, function(req, res){
    // not registered or wrong inputs
    // if(!matches(req.body.un, req.body.pw)){
    //     res.render("login.hbs", {
    //         error: "not match"
    //     })
    // }
    // // credentials match
    // else{
    //     req.session.username = req.body.un
    //     res.redirect("/")
    // }
    req.session.username = req.body.un
    if (req.session.username == "admin"){
        req.session.admin = "admin"
    }
    res.redirect("/")
})

function matches(username, password){
    for(let i =0; i < users.length; i++ ){
        if(users[i].username == username && users[i].password == password){
            return true
        }
    }
    return false
}

router.get("/signout", urlencoder, (req, res) =>{
    req.session.destroy()
    res.redirect("/")
})

router.get("/register", function(req, res){
    //Going to register page
    res.render('register.hbs')
})

router.get("/login", function(req, res){
    //Going to register page
    res.render('login.hbs')
})

router.get("/reviews", function(req, res){
    //User goes to Categories page
    res.render('reviews.hbs', {
        username: req.session.username,
        admin: req.session.admin
    })
})

router.get("/ReviewPost", urlencoder, function(req, res){
    //user want to view review post
    res.render('reviewPost.hbs', {
        username: req.session.username,
        admin: req.session.admin
    })
})

router.get('/featured', (req,res) =>{
    //User goes to Featured page
    res.render('featured.hbs', {
        username: req.session.username,
        admin: req.session.admin
    })
})

router.get('/featuredPost', urlencoder, (req,res) =>{
    //User goes to Featured Specific page
    res.render('featuredPost.hbs', {
        username: req.session.username,
        admin: req.session.admin
    })
})

// Test Run for views

router.get('/searchResult', urlencoder, (req,res) =>{
    //User search something -> search results
    res.render('searchResult.hbs', {
        username: req.session.username,
        admin: req.session.admin
    })
})

router.get('/categories', (req,res) =>{
    //User goes to Categories page
    res.render('categories.hbs', {
        username: req.session.username,
        admin: req.session.admin
    })
})

router.get("/user-profile" , function(req, res) {
    res.render('monitorCategory.hbs', {
        username: req.session.username,
        admin: req.session.admin
    })
})

router.get("/monitorCategory" , function(req, res) {
    res.render('monitorCategory.hbs', {
        username: req.session.username,
        admin: req.session.admin
    })
})

router.get("/manage-post", function(req, res){
    //Going to register page
    res.render('managepost.hbs', {
        username: req.session.username,
        admin: req.session.admin
    })
})

router.get("/manage-users", function(req, res){
    //Going to register page
    res.render('manageUsers.hbs', {
        username: req.session.username,
        admin: req.session.admin
    })
})

router.post("/comment", urlencoder, function(req, res){
    var comment = req.body.comment

    //to implement - adding to 
    
    res.render('reviewPost.hbs', {
        username: req.session.username,
        admin: req.session.admin
    })
})

router.post("/add", urlencoder, function(req, res){

    //to implement - adding to db
    
})

router.patch("/edit", urlencoder, function(req, res){
    //edit post content
    //to implement - edit content  db
    
})

router.delete("/delete", urlencoder, function(req, res){
    //delete a post
    //to implement - delete content  db
    
})


module.exports = router

