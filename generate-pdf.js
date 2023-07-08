const puppeteer = require('puppeteer')
const fs = require('fs')
const globals = require('./config.js')

async function generatePDF(data) {
    try {
        const fileName = 'file'
        const browser = await puppeteer.launch({
            headless: true
        })
        const page = await browser.newPage()
        const html = fs.readFileSync(globals.pathToHTMLTemplate, 'utf8')

        await page.setContent(html, {
            waitUntil: 'domcontentloaded'
        })

        const pdfBuffer = await page.pdf({
            format: 'A4'
        })

        await browser.close()

        return { fileName, pdfBuffer }
    } catch (error) {
        console.error(error)
        return { fileName: null, pdfBuffer: null, error }
    }
}

module.exports = { generatePDF }