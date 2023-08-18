const express = require('express')
const globals = require('./config.js')
const fs = require('fs')
const cors = require("cors")

const app = express()
const port = globals.portForStoreData

app.use(cors())

app.get('', (req, res) => {
    fs.readFile('template/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error while reading a file:', err)
            res.status(500).send('Server error')
            return
        }

        res.header('Access-Control-Allow-Origin', '*')

        try {
            const jsonData = JSON.parse(data)
            res.json(jsonData)
        } catch (parseError) {
            console.error('Error while parsing JSON:', parseError)
            res.status(500).send('Server error')
        }
    })
})


app.listen(port, () => {
    console.log(`Server for store data running on port ${port}`)
})