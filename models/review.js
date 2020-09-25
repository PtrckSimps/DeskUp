/*

Model folder should contain all direct database access and manipulation
Model files should not include request, response, or view objects
Model files must be created independent of each other. Deleting one model file will not affect the others

*/

const mongoose = require("mongoose")

var commentsSchema = mongoose.Schema({
  // _id: mongoose.Types.ObjectId(),
  comment: String,
  username: String,
  date: String 
})

var reviewSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,  
    date: String,
    score: Number,
    primaryImage: String,
    secondaryImage: String,
    pros: String,
    cons: String,
    specs: [String],
    verdict: String,
    category: String,
    comments: [
        commentsSchema
    ]
})

// post: [
//   {
//       _id: ObjectID(),
//       title: String,
//       content: String,
//       author: String,
//       date: Date,
//       score: Number,
//       picture: [String],
//       pros: [String],
//       cons: [String],
//       specs: [String],
//       verdict: String,
//       type: String,
//       featured: [String],
//       category: {
//           _id: ObjectID(),
//           name: String
//       }
//       comments: [
//           {
//               _id: ObjectID(),
//               comment: String,
//               username: String,
//               date: Date
//           }
//       ]
//   }
// ]

var Review = mongoose.model("review", reviewSchema) 

exports.create = function(review){
  return new Promise(function(resolve, reject){
    var r = new Review(review)

    r.save().then((newReview)=>{
      resolve(newReview)
    }, (err)=>{
      reject(err)
    })
  })
}


exports.all = function(){
  return new Promise(function(resolve, reject){
      Review.find({}).then((review)=>{
          resolve(review)
      }, (err)=>{
          reject(err)
      })
  })
}

exports.review = function(id){
  return new Promise(function(resolve, reject){
      Review.findOne({_id: id}).then((review)=>{
          resolve(review)
      }, (err)=>{
          reject(err)
      })
  })
}

exports.reviewC = function(title){
  return new Promise(function(resolve, reject){
      Review.findOne({title: title}).then((review)=>{
          resolve(review)
      }, (err)=>{
          reject(err)
      })
  })
}

exports.myRev = function(name){
  return new Promise(function(resolve, reject){
      Review.find({author: name}).then((review)=>{
          resolve(review)
      }, (err)=>{
          reject(err)
      })
  })
}

