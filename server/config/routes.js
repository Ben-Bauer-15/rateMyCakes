var controller = require('../controllers/cakes')



module.exports = function(app){
    app.get('/allCakes', function(req, res){
        controller.getAllCakes(req, res)
    })

    app.post('/newCake', function(req, res){
        controller.makeNewCake(req, res)
    })

    app.post('/newRating', function(req, res){
        controller.makeNewRating(req, res)
    })

    app.get('/cake/:id', function(req, res){
        controller.getCake(req, res)
    })
}