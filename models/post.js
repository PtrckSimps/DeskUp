/*

Model folder should contain all direct database access and manipulation
Model files should not include request, response, or view objects
Model files must be created independent of each other. Deleting one model file will not affect the others

*/

const mongoose = require("mongoose")

var postSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: Date,
    score: Number,
    picture: [String],
    pros: [String],
    cons: [String],
    specs: [String],
    verdict: String,
    type: String,
    featured: [String],
    category: {
        name: String
    },
    comments: [
        {
            comment: String,
            username: String,
            date: Date
        }
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

var Post = mongoose.model("post", postSchema)

exports.create = function(post){
  return new Promise(function(resolve, reject){
    var p = new Post(post)

    p.save().then((newPost)=>{
      resolve(newPost)
    }, (err)=>{
      reject(err)
    })
  })
}

