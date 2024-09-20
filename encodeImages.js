const fs = require("fs")
const path = require("path")

// Read wiemantheme.theme.css and assets directory
const cssFilePath = path.join(__dirname, "wiemantheme.theme.css")
const assetsDir = path.join(__dirname, "src", "assets")
let cssContent = fs.readFileSync(cssFilePath, "utf8")

// Find all occurrences of "${encode:*}" in the CSS file
const encodePattern = /(["'])\$\{encode:([^}]+)}\1/g
let match

// Replace each occurrence with url("data:image/svg+xml,<encoded_image>") image
while ((match = encodePattern.exec(cssContent)) !== null) {
    const fileName = match[2]
    const filePath = path.join(assetsDir, fileName)

    if (!fs.existsSync(filePath)) {
        console.error(`ERROR: can't read file from ${filePath}`)
        continue
    }

    const fileData = fs.readFileSync(filePath)
    const base64Data = `data:image/svg+xml,${encodeURIComponent(fileData)}`
    cssContent = cssContent.replace(match[0], `url("${base64Data}")`)

    console.log(`> encoded ${fileName}`)
}

// Write updated content back to wiemantheme.theme.css
fs.writeFileSync(cssFilePath, cssContent, "utf8")
