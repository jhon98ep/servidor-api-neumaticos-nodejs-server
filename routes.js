const express = require('express')
const routes = express.Router()

routes.get('/md', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        console.log('peticion recibida')
        conn.query('SELECT DISTINCT medida FROM renovados ORDER BY medida ASC', (err, rows) =>{
            if(err) return res.send(err)
            res.json({datos: rows})
        }) 
    })
})

routes.get('/an/:medida', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT DISTINCT ancho FROM renovados WHERE medida = ? ORDER BY ancho ASC', [req.params.medida], (err, rows) =>{
            if(err) return res.send(err)

            res.json({datos: rows})
        }) 
    })
})

routes.get('/ds', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        let md = req.query.md
        let an = req.query.an
        conn.query('SELECT DISTINCT diseno FROM renovados WHERE medida = "'+md+'" AND ancho = "'+an+'" ORDER BY diseno ASC', (err, rows) =>{
            if(err) return res.send(err)

            res.json({datos: rows})
        }) 
    })
})

routes.get('/dt', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        let md = req.query.md
        let an = req.query.an
        let ds = req.query.ds
        conn.query('SELECT * FROM renovados WHERE medida = "'+md+'" AND ancho = "'+an+'" AND diseno = "'+ds+'"', (err, rows) =>{
            if(err) return res.send(err)
            let json = JSON.stringify(rows[0])
            let jsonParseado = JSON.parse(json)

            let md = jsonParseado['medida']
            let an = jsonParseado['ancho']
            let ds = jsonParseado['diseno']
            let img = 'http://192.168.0.109/API_CVC'+jsonParseado['imagen']
            let pr = jsonParseado['precio']
            res.json({datos: {medida: md, ancho: an, diseno: ds, imagen: img, precio: pr}})
            //res.json({datos: rows[0]})
        }) 
    })
})
module.exports = routes