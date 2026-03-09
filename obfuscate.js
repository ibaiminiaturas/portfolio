const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const inputDir = path.join(__dirname, 'assets/js'); // carpeta con tus JS originales
const outputDir = path.join(__dirname, 'assets/js-obfuscated'); // donde se guardan los ofuscados

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

fs.readdirSync(inputDir).forEach(file => {
    if (file.endsWith('.js')) {
        const filePath = path.join(inputDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        const obfuscated = JavaScriptObfuscator.obfuscate(content, {
            compact: true,
            controlFlowFlattening: true,
            stringArray: true,
            stringArrayEncoding: ['base64'], // <-- CORREGIDO
            numbersToExpressions: true
        }).getObfuscatedCode();

        fs.writeFileSync(path.join(outputDir, file), obfuscated, 'utf-8');
        console.log(`Ofuscado: ${file}`);
    }
});