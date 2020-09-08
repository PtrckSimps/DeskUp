/*

Model folder should contain all direct database access and manipulation
Model files should not include request, response, or view objects
Model files must be created independent of each other. Deleting one model file will not affect the others

*/

const mongoose = require("mongoose")

var categorySchema = mongoose.Schema({
    name: String,
    picture: String,
    icon: String
})

// category: [
//   {
//       _id: ObjectID(),
//       name: String,
//       picture: String,
//       icon: String
//   }
// ]

var Category = mongoose.model("category", categorySchema)

exports.create = function(category){
  return new Promise(function(resolve, reject){
    var c = new Cateegory(category)

    c.save().then((newCategory)=>{
      resolve(newCategory)
    }, (err)=>{
      reject(err)
    })
  })
}
