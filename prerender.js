import puppeteer from 'puppeteer'
import fs from "fs"
import path from 'path';
import express from 'express'

const seoPrerender = ({ routes, selector, base = '', outDir = 'dist' }) => {
    const DIST_DIR = path.join(__dirname, outDir);
    const OUTPUT_DIR = path.join(__dirname, outDir);

    return {
        name: "viteSeoPrerender",
        async closeBundle() {

            if (!routes) return;

            const app = express();

            app.use(express.static(path.join(DIST_DIR)));
            app.use(base + 'assets', express.static(path.join(DIST_DIR, 'assets')));
            app.get('*', function (request, response) {
                response.sendFile(path.join(DIST_DIR, 'index.html'));
            });

            app.listen(3000, async () => {
                console.log(`Server running at http://localhost:3000`);
                const browser = await puppeteer.launch()
                const page = await browser.newPage()
                for (const key of routes) {
                    console.log(base + key, '-------------')
                    // 需渲染的路由   
                    await page.evaluateOnNewDocument(() => {
                        Object.defineProperty(navigator, "language", {
                            get: function () {
                                return "en-US";
                            }
                        });
                    })
                    await page.goto("http://localhost:3000" + base + key)
                    await page.setViewport({ width: 1024, height: 768 })
                    await page.waitForSelector(selector, { timeout: 10000 });
                    const content = await page.content()
                    const filePath = path.join(OUTPUT_DIR, key, 'index.html')
                    if (!fs.existsSync(path.join(OUTPUT_DIR, key))) {
                        fs.mkdirSync(path.join(OUTPUT_DIR, key), { recursive: true });
                    }
                    fs.writeFileSync(filePath, content)
                    console.log('[Tina] prerender /' + key)
                }
                console.log('[Tina] SEO prerender Finish! ´-ω-)b')
                await browser.close();
                process.exit(0)
            })
        }
    }
}

export default seoPrerender