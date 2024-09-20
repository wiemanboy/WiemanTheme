const fs = require("fs")
const path = require("path")

// Read command-line arguments
const args = require("minimist")(process.argv.slice(2))
const params = args._.reduce((acc, param) => {
    const [key, value] = param.split("=")
    acc[key] = value
    return acc
}, {})
const { name, author, description, source } = params

// Read package.json
const packageJsonPath = path.join(__dirname, "package.json")
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
const version = packageJson.version

// Read wiemantheme.theme.css
const targetPath = path.join(__dirname, "wiemantheme.theme.css")
let targetContent = fs.readFileSync(targetPath, "utf8")

// Replace placeholders
targetContent = targetContent.replace(/\${name}/g, name)
targetContent = targetContent.replace(/\${author}/g, author)
targetContent = targetContent.replace(/\${description}/g, description)
targetContent = targetContent.replace(/\${source}/g, source)
targetContent = targetContent.replace(/\${version}/g, version)

// Write updated content back to wiemantheme.theme.css
fs.writeFileSync(targetPath, targetContent, "utf8")

console.log(`> compiled with version v${version}`)
