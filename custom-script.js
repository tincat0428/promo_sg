import fs from 'fs'
import minimist from 'minimist'
import path from 'path';
const { argv } = process;
const BUILD_DIR = "dist"
const args = minimist(argv.slice(2));
const base = args['base'];

// 修改路徑
const baseUrlFix = (filePath) => {
    try {
        const contents = fs.readFileSync(filePath, 'utf-8').toString();
        const output = contents.replace(/\/assets\//g, base + 'assets/');
        // 寫入資料
        fs.writeFileSync(filePath, output, 'utf-8')
    } catch (error) {
        console.log('[custom-script]', filePath, error)
    }
}

fs.readdir(BUILD_DIR, (err, dirs) => {
    if (err) {
        console.error('[custom-script] 讀取目錄失敗', err);
        return;
    }

    dirs.forEach(dir => {
        // 取得檔案基本資料
        const dirPath = path.join('.', BUILD_DIR, dir)
        const stats = fs.statSync(dirPath);

        if (stats.isFile() && path.extname(dir) === '.html') {
            baseUrlFix(dirPath)
        }

        if (stats.isDirectory()) {
            const fileIndex = path.join('.', BUILD_DIR, dir, 'index.html');
            if (fs.existsSync(fileIndex)) baseUrlFix(fileIndex);
        }
    })
});

