const express = require('express')
const { generatePDF } = require('./generate-pdf.js')
const app = express()
const globals = require('./config.js')

app.get('', async (req, res) => {
    const { fileName, pdfBuffer, error } = await generatePDF('some test data')
    const options = {
        type: 'application/pdf'
    }

    if (error) {
        console.error(error)
        res.status(500).send('An error occurred during the generation of the PDF file');
        return
    }

    res.attachment(`${fileName}.pdf`)
    res.set(options)
    res.send(pdfBuffer)
})

app.listen(globals.port, () => {
    console.log(`Server running on port ${globals.port}`)
})