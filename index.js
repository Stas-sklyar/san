const express = require('express')
const { generatePDF } = require('./generate-pdf-for-therapist.js')
const { generatePDFForClinic } = require('./generate-pdf-for-clinic.js')
const app = express()
const globals = require('./config.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.post('/therapist', async (req, res) => {
    console.log(req.body)
    const { pdfBuffer, error } = await generatePDF(req.body)

    handleError(error)
    setHeaders(res)

    res.send(pdfBuffer)
})

app.post('/clinic', async (req, res) => {
    const { pdfBuffer, error } = await generatePDFForClinic(req.body)

    handleError(error)
    setHeaders(res)

    res.send(pdfBuffer)
})

app.listen(globals.port, () => {
    console.log(`Server running on port ${globals.port}`)
})

const setHeaders = (res) => {
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment')
    res.header('Access-Control-Allow-Origin', '*')
}

const handleError = (error) => {
    if (error) {
        console.error(error)
        res.status(500).send('An error occurred during the generation of the PDF file');
        return
    }
}