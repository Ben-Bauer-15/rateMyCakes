var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

require('./server/config/routes')(app)

app.listen(8000, () => {
    console.log("Listening on port 8000")
})