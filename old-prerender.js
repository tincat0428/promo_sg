import puppeteer from 'puppeteer'
import fs from "fs"
import http from 'http'
import path from 'path';
/**  
@param routes 预渲染路由地址  
*/
const DIST_DIR = path.join(__dirname, 'dist');
const STATIC_PATH = path.join(process.cwd(), './dist');

const seoPrerender = ({ routes }) => {
    return {
        name: "viteSeoPrerender",
        async closeBundle() {
            const server = http.createServer((req, res) => {
                const { url } = req;
                const fileExt = path.extname(url).substring(1);
                const mimeType = MIME_TYPES[fileExt] || MIME_TYPES.html;
                res.writeHead(200, { 'Content-Type': mimeType });
                const stream = fileExt === '' ? serveFile('/index.html') : serveFile(url);
                if (stream) stream.pipe(res);
            });

            server.listen(3000, async () => {
                console.log(`Server running at http://localhost:3000`);
                const browser = await puppeteer.launch()
                const page = await browser.newPage()
                for (const key of routes) {
                    console.log('key', key)
                    // 遍历需渲染的路由   
                    await page.goto("http://localhost:3000" + key)
                    await page.setViewport({ width: 1024, height: 768 })
                    const content = await page.content()
                    const filePath = `./dist${key}/index.html` // 保存的html文件路径  
                    fs.writeFileSync(filePath, content)
                }
                await browser.close()
            })
        }
    }
}

const MIME_TYPES = {
    html: 'text/html; charset=UTF-8',
    js: 'application/javascript; charset=UTF-8',
    css: 'text/css',
    json: 'application/json',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
};

const serveFile = name => {
    const filePath = path.join(STATIC_PATH, name);
    console.log('filePath', filePath)
    if (!filePath.startsWith(STATIC_PATH)) {
        console.log(`Can't be served: ${name}`);
        return null;
    }
    const stream = fs.createReadStream(filePath);
    return stream;
};

export default seoPrerender