const express = require('express')
const globals = require('./config.js')
const fs = require('fs')
const cors = require("cors")

const app = express()
const port = globals.portForStoreData

app.use(cors())

app.get('/therapist', (req, res) => {
    fs.readFile('template/therapistData.json', 'utf8', (err, data) => {
        if (err) {
            handleError(err, res)
            return;
        }

        res.header('Access-Control-Allow-Origin', '*')
        parseAndSendJson(data, res)
    })
})

app.get('/clinic', (req, res) => {
    fs.readFile('template/clinicData.json', 'utf8', (err, data) => {
        if (err) {
            handleError(err, res)
            return;
        }

        res.header('Access-Control-Allow-Origin', '*')
        parseAndSendJson(data, res)
    })
})


app.listen(port, () => {
    console.log(`Server for store data running on port ${port}`)
})

const handleError = (err, res) => {
    console.error('Error while reading a file:', err)
    res.status(500).send('Server error')
}

const parseAndSendJson = (data, res) => {
    try {
        const jsonData = JSON.parse(data)
        res.json(jsonData)
    } catch (parseError) {
        console.error('Error while parsing JSON:', parseError)
        res.status(500).send('Server error')
    }
}