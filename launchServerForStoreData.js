const express = require('express')
const path = require('path')
const globals = require('./config.js')
const {generatePDF} = require("./generate-pdf")
const fs = require('fs')
const cors = require("cors")

const app = express()
const port = globals.portForStoreData

app.use(cors())

app.get('', (req, res) => {
    fs.readFile('template/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err)
            res.status(500).send('Ошибка сервера')
            return
        }

        res.header('Access-Control-Allow-Origin', '*')

        try {
            const jsonData = JSON.parse(data)
            res.json(jsonData)
        } catch (parseError) {
            console.error('Ошибка при разборе JSON:', parseError)
            res.status(500).send('Ошибка сервера')
        }
    })
})


app.listen(port, () => {
    console.log(`Server for store data running on port ${port}`)
})