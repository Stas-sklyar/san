const puppeteer = require('puppeteer')
const fs = require('fs')
const globals = require('./config.js')

async function generatePDF(data) {
    try {
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

module.exports = { generatePDF }