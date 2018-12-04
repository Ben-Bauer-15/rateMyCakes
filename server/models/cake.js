var mongoose = require('../config/mongoose').mongo
var RatingSchema = new mongoose.Schema({
    stars : Number,
    comment : String
})
var CakeSchema = new mongoose.Schema({
    url : String,
    baker : String,
    ratings : [RatingSchema],
    createdAt : Date,
    updatedAt : Date
})
mongoose.model('Cake', CakeSchema);
mongoose.model('Rating', RatingSchema);
console.log('models file')

module.exports = {
    cake : mongoose.model('Cake'),
    rating : mongoose.model('Rating')
}