const express = require('express')
require('dotenv').config()
const app = express()

const db = require('./db/Conn')

app.use(express.json())  

const routes = require('./routes/Routes')
app.use(routes)





db.sync().then(() => {

    console.log('Conectou')
    app.listen(3000)

}).catch(err =>{

    console.log(err)
})


