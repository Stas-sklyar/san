const puppeteer = require('puppeteer')
const fs = require('fs')

async function generatePDF(data) {
    try {
        const browser = await puppeteer.launch({
            headless: false
        })

        const page = await browser.newPage()

        // fs.writeFileSync('template/data.json', JSON.stringify(data), 'utf8')

        const html = fs.readFileSync('template/index.html', 'utf-8')
        await page.setContent(html, { waitUntil: 'load' })

        await page.emulateMediaType('screen')

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true
        })

        // await browser.close()

        return { pdfBuffer, error: null }
    } catch (error) {
        console.error(error)
        return { pdfBuffer: null, error }
    }
}

module.exports = { generatePDF }