var Cake = require('../models/cake').cake
var Rating = require('../models/cake').rating

module.exports = {

    index : function(req, res){
        res.sendFile(__dirname + 'index.html')
    },

    getAllCakes : function(req, res){
        Cake.find({}, function(err, cakes){
            if (err){
                console.log("Something went wrong: "+ err)
            }
            else {
                res.json({message : "Success", data : cakes})
            }
        })
    },

    makeNewCake : function(req, res){
        var newCake = new Cake({baker : req.body.baker, url : req.body.url, ratings : [], createdAt : new Date(), updatedAt : new Date()})
        newCake.save(function(err){
            if (err){
                console.log("Something went wrong: "+ err)
            }
            else{
                res.json({message : "Success", data : newCake})
            }
        })
    },
    
    makeNewRating : function(req, res){
        var newRating = new Rating({stars : req.body.stars, comment : req.body.comment})
        newRating.save(function(err){
            if (err){
                console.log("Something went wrong: "+ err)
            }
            else {
                Cake.updateOne({_id : Object(req.body.id)}, {$push : {ratings : newRating}}, function(err){
                    if (err){
                        console.log("Something went wrong: "+ err)
                    }
                    else {
                        res.json({message : "Success", data : newRating})
                    }
                })
            }
        })
    },

    getCake : function(req, res){
        Cake.find({_id : Object(req.params.id)}, function(err, cake){
            if (err){
                console.log("Something went wrong: "+ err)
            }
            else{
                res.json({message : "Success", data : cake})
            }
        })
    }


}