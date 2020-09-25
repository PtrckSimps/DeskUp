/*

Controllers folder should contain all routes dedicated to the particular document
Controllers should not directly access and manipulate the db, it should access the models folder files

index.js should route all prefix paths to the proper controller files
index.js should set the home/index page
index.js should be named index.js, because server.js just refers to the controllers folder, which assumes an index file

*/

const hbs = require("hbs")
const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const User = require("../models/user")
const Review = require("../models/review")

// load all the controllers into router
router.use("/review", require("./review"))
router.use("/user", require("./user"))
router.use("/category", require("./category"))


hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

router.get('/', (req,res) =>{
    //access the homepage
    //logged in
    let user = {
        username: req.session.username,
        role : req.session.role
    }
    if(req.session.username){
        // if (req.session.username == "admin"){
        //     req.session.admin = "admin"
            res.render("index.hbs",{
                user
            })
    //not logged in
    }else{
        res.render("index.hbs") 
    }
})

router.get("/signout", (req, res) =>{
    req.session.destroy()
    res.redirect("/")
})

module.exports = router

