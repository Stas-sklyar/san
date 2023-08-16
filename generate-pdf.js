const puppeteer = require('puppeteer')
const fs = require('fs')
const globals = require('./config.js')

async function generatePDF(data) {
    try {
        // pasteTerapistDataIntoTemplate(data)

        const browser = await puppeteer.launch({
            headless: true
        })
        const page = await browser.newPage()
        const html = fs.readFileSync(globals.pathToHTMLTemplate, 'utf8')

        await page.setContent(html, {
            waitUntil: 'load'
        })

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        })

        await browser.close()

        return { pdfBuffer, error: null }
    } catch (error) {
        console.error(error)
        return { pdfBuffer: null, error }
    }
}


// эта функция не особо сейчас нужна
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