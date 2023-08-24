const puppeteer = require('puppeteer')
const fsPromises = require('fs').promises

async function generatePdfForTherapist(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                headless: true
            })

            const page = await browser.newPage()

            await fsPromises.writeFile('template/therapistData.json', JSON.stringify(data), 'utf8');

            const html = await fsPromises.readFile('template/therapistTemplate.html', 'utf-8')
            await page.setContent(html, { waitUntil: 'load' })
            await page.waitForTimeout(2000)

            await page.emulateMediaType('screen')

            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true
            })

            await browser.close()

            resolve({ pdfBuffer, error: null })
        } catch (error) {
            console.error(error)
            reject({ pdfBuffer: null, error })
        }
    })
}

module.exports = { generatePDF: generatePdfForTherapist }