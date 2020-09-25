const express = require("express")
const router = express.Router()
const bodyparser = require("body-parser")
const User = require("../models/user")  
const Review = require("../models/review")
const Category = require("../models/category")
const moment =require("moment")

const app = express() 

const urlencoder = bodyparser.urlencoded({
    extended : true
})

router.use(urlencoder)

router.get("/", function(req, res){
    //User goes to Categories page
    let user = {
        username: req.session.username,
        role : req.session.role
    }
    Review.all().then((doc)=>{
        res.render('reviews.hbs', {
            user, review : doc
        })
    })
})

router.post("/ReviewPost", urlencoder, function(req, res){
    //user want to view review post
    let user = {
        username: req.session.username,
        role : req.session.role
    }

    let id = req.body.revid
    console.log(id)

    Review.review(id).then((doc)=>{
        console.log(doc)
        res.render('reviewPost.hbs', {
            user, review: doc
        })
    })
})

router.post("/ReviewPostC", urlencoder, function(req, res){
    //user want to view review post
    let user = {
        username: req.session.username,
        role : req.session.role
    }

    let title = req.body.revtitle
    console.log(title)

    Review.reviewC(title).then((doc)=>{
        console.log(doc)
        res.render('reviewPost.hbs', {
            user, review: doc
        })
    })
})

// Test Run for views

router.get('/searchResult', urlencoder, (req,res) =>{
    //User search something -> search results
    let user = {
        username: req.session.username,
        role : req.session.role
    }
    res.render('searchResult.hbs', {
        user
    })
})

router.get("/manage-reviews", function(req, res){
    let user = {
        username: req.session.username,
        name: req.session.name,
        role : req.session.role
    }
    if(user.role == "admin"){
        Review.all().then((docs)=>{
            Category.all().then((categories)=>{
                res.render('managepost.hbs', {
                    user, reviews : docs, categories: categories
                })
            })
        })
    }else{
        Review.myRev(req.session.name).then((docs)=>{
            Category.all().then((categories)=>{
                res.render('managepost.hbs', {
                    user, reviews : docs, categories: categories
                })
            })
            
        })
    }
    
    //Going to register page
    
})

router.post("/comment", urlencoder, function(req, res){
    let user = {
        username: req.session.username,
        role : req.session.role
    }
    var comment = req.body.comment

    //to implement - adding to 
    
    res.render('reviewPost.hbs', {
        user 
    })
})

router.post("/add-review", urlencoder, function(req, res){

    let user = { 
        username: req.session.username,
        name: req.session.name,
        role : req.session.role
    }

    let momentdate = moment().format('MMMM DD YYYY');
    // console.log("date is "+ test)
    let review = {
        title: req.body.title,
        content: req.body.content,
        author: req.session.name,
        date: momentdate,
        score: req.body.score,
        primaryImage: req.body.primaryImage,
        secondaryImage:  req.body.secondaryImage,
        specs: [],
        pros:  req.body.pros,
        cons:  req.body.cons,
        verdict:  req.body.verdict,
        category:   req.body.category
    }

    for(i = 0; i < req.body.counter; i++) {
        review.specs.push(req.body.name[i])
    }

    Review.create(review).then((doc) =>{
        console.log("Added Review successful")
    })
    
    Category.insert(req.body.category, review).then((doc) =>{
        console.log("Review added in the category")
    })

    User.insert(req.session.username, review).then((doc) =>{
        console.log("Review added in the user's review")
    })
    
    res.redirect('manage-reviews')
})

module.exports = router