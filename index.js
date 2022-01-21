const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const routes = require('./routes')
const cors = require('cors')
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'renovadosCVC'
}

const app = express()
app.set('port', process.env.PORT || 8080)

app.use(cors())
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use('/', routes)

app.listen(app.get('port'), ()=>{
    console.log('servidor corriendo')
})
