const fs = require('fs');
const path = require('path');
const uglifycss = require('uglifycss');
const JavaScriptObfuscator = require('javascript-obfuscator');
const chokidar = require('chokidar');

// Function to obfuscate JavaScript files
function obfuscateJS(file) {
    const inputFile = file;
    const outputFile = file.replace("-preugly.js", ".js");

    const code = fs.readFileSync(inputFile, 'utf8');
    const result = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        debugProtectionInterval: 0,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        stringArray: true,
        stringArrayEncoding: [],
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
    });

    fs.writeFileSync(outputFile, result.getObfuscatedCode());
}

// Function to minify CSS files
function minifyCSS(file) {
    const inputFile = file;
    const outputFile = file.replace("-preugly.css", ".css");

    const code = fs.readFileSync(inputFile, 'utf8');
    const result = uglifycss.processString(code);
    fs.writeFileSync(outputFile, result);
}

// Main function to process files
function processFile(file) {
        if (file.endsWith('.js')) {
            obfuscateJS(file);
        } else if (file.endsWith('.css')) {
            minifyCSS(file);
        }
}

// Watch all JS and CSS files on the server
const serverDirectory = 'path/to/server/directory'; // Update this with your server directory
const watcher = chokidar.watch(serverDirectory, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    depth: 99 // Set depth to watch nested directories
});

watcher.on('change', (filePath) => {
    if (filePath.search("-preugly") == -1) return;

    const ext = path.extname(filePath);
    if (ext === '.js' || ext === '.css') {
        console.log(`File ${filePath} has been changed!`);
        processFile(filePath);
    }
});