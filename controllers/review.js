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
    Review.all().then((docs)=>{
        res.render('reviews.hbs', {
            user, review : docs
        })
    })
})

router.post("/ReviewPost/:title", urlencoder, function(req, res){
    //user want to view review post
    let user = {
        username: req.session.username,
        role : req.session.role
    }

    let title = req.body.revid
    console.log(title)

    Review.review(title).then((doc)=>{
        res.render('reviewpost.hbs', {
            user, review: doc, user
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
    Review.reviewC(title).then((doc)=>{
        console.log(doc)
        res.render('reviewpost.hbs', {
            user, review: doc
        })
    })
})

// Test Run for views

router.post('/searchResult', urlencoder, (req,res) =>{
    //User search something -> search results
    let user = {
        username: req.session.username,
        role : req.session.role
    }
    let keyword = req.body.search
    
    console.log("keyword is " + keyword)

    Review.search(keyword).then((docs)=>{
        console.log(docs)
        if(docs){
            res.render('search.hbs', {
                user, reviews: docs
            })
        } 
        else{
            res.render('search.hbs', {
                user, error: "No match found"
            })
        }
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

router.post("/delete-post", urlencoder, function(req, res){

    let id = req.body.id
    let title = req.body.title
    let author = req.body.author
    let category = req.body.category


    

    console.log(author)
    console.log(title)
    console.log(category)

    User.deletePost(author, title).then((doc)=>{
        console.log("removed in users")
    })

    Category.deletePost(category, title).then((doc)=>{
        console.log("removed in category")
    })

    Review.deletePost(id).then((doc)=>{
        if(doc.n) {
            res.send(true)
        }else{
            res.send(false)
        }
    })
})

router.post("/comment", urlencoder, function(req, res){

    console.log("COMMENTS ")
    let momentdate = moment().format('LLL');
    console.log(momentdate)
    let commentObj = {
        comment: req.body.comment,
        username: req.session.username,
        date: momentdate 
    }

    let user = {
        username: req.session.username,
        role : req.session.role
    }

    var id = req.body.postID
    var title = req.body.postTitle


    Review.insertComment(id, commentObj).then((doc)=>{
        console.log("Comment inserted in reviews")
    })

    User.insertComment(req.session.username, commentObj).then((doc)=>{
        console.log("Comment inserted in users")
    })
    
    Review.review(title).then((doc)=>{
        res.render('reviewpost.hbs', {
            user, review: doc ,user
        })
    })
})

module.exports = router