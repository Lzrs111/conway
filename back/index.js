import express from "express"
var app = express()

app.use('/',express.static(__dirname)).listen(process.env.PORT || 3000,()=>{console.log('server started =)')})