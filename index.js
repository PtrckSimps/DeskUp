const hbs = require("hbs")
const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")


const app = express()
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

app.get("/features", function(req, res){
    res.render('features.hbs')
})

app.get("/brands", function(req, res){
    res.render('brands.hbs')
})

app.get("/login", function(req, res){
    res.render('login.hbs')
})


// app.get("/", (req, res) =>{
//     if(req.session.username){
//         res.render("home.hbs",{
//             username: req.session.username
//         })
//     }else{
//         res.render("index.hbs") 
//     }    
// })

// app.post("/register", urlencoder, (req, res) =>{
//     // username: un
//     // password: pw
//     let username = req.body.un
//     let password = req.body.pw

//     if(username.trim() == "" || password.trim() == ""){
//         res.render("index.hbs", {
//             error: "Enter a username and password"
//         })
//     }else if(!isAvailable(username)){
//         res.render("index.hbs", {
//             error: "username is already taken"
//         })
//     }else{
//         req.session.username = req.body.un
//         users.push({
//             username: username,
//             password: password
//         })

//         res.redirect("/")
//     }
// })


// function isAvailable(username){
//      for(let i =0; i < users.length; i++ ){
//          if(users[i].username == username){
//              return false
//          }
//      }
//      return true
// }

// app.post("/login", urlencoder, (req, res) =>{
    
//     if(!matches(req.body.un, req.body.pw)){
//         res.render("index.hbs", {
//             error: "not match"
//         })
//     }else{
//         res.render("home.hbs",{
//             username: req.session.username
//         })
//     }
// })

// function matches(username, password){
//     for(let i =0; i < users.length; i++ ){
//         if(users[i].username == username && users[i].password == password){
//             return true
//         }
//     }
//     return false
// }

// app.get("/signout", urlencoder, (req, res) =>{
//     req.session.destroy()
//     res.redirect("/")
// })

app.listen(3000, ()=> { 
    console.log("Server ready")
})
