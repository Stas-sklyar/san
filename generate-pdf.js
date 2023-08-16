const puppeteer = require('puppeteer')
const fs = require('fs')
const globals = require('./config.js')

async function generatePDF(data) {
    try {
        // pasteTerapistDataIntoTemplate(data)

        const browser = await puppeteer.launch({
            headless: false
        })

        const page = await browser.newPage()
        await page.goto(globals.URLToOpenedHTMLTemplate)

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        })

        // await browser.close()

        return { pdfBuffer, error: null }
    } catch (error) {
        console.error(error)
        return { pdfBuffer: null, error }
    }
}

function pasteTerapistDataIntoTemplate(newData) {
    const filePath = 'data.js';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const updatedData = data.replace('const data = {};', `const data = ${JSON.stringify(newData)};`);

        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
        });
    });
}

module.exports = { generatePDF }