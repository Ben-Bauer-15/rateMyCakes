var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cakes');
mongoose.Promise = global.Promise;
console.log('mongo file')

module.exports = {
    mongo : mongoose
}