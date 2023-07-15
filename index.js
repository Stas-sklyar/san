const express = require('express')
const { generatePDF } = require('./generate-pdf.js')
const app = express()
const globals = require('./config.js')
const cors = require('cors');

app.use(cors());
app.post('', async (req, res) => {
    const { fileName, pdfBuffer, error } = await generatePDF('some test data')

    if (error) {
        console.error(error)
        res.status(500).send('An error occurred during the generation of the PDF file');
        return
    }

    res.attachment(`${fileName}.pdf`)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment')
    res.header('Access-Control-Allow-Origin', '*')
    res.send(pdfBuffer)
})

app.listen(globals.port, () => {
    console.log(`Server running on port ${globals.port}`)
})