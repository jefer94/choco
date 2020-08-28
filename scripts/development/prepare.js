/* eslint-disable @typescript-eslint/no-var-requires */
const util = require('util')
const fs = require('fs')
const process = require('process')
const path = require('path')

// const lockfile = 'prepare.lock'
const rootDir = path.resolve(process.cwd(), '../..')
const libsDir = path.resolve(rootDir, 'libs')
const codemirrorDir = path.resolve(libsDir, 'codemirror')
// const rootPackageJson = path.resolve(rootDir, 'package.json')
const rootTsconfigJson = path.resolve(rootDir, 'tsconfig.json')
// const algorithmPackageJson = path.resolve(rootDir, 'services', 'algorithm', 'package.json')
// const algorithmTsconfigJson = path.resolve(rootDir, 'services', 'algorithm', 'tsconfig.json')
const codemirrorPackageJson = path.resolve(rootDir, 'libs', 'codemirror', 'package.json')
const codemirrorTsconfigJson = path.resolve(rootDir, 'libs', 'codemirror', 'tsconfig.json')

const packagePackageJson = (package) =>
  path.resolve(rootDir, 'libs', 'codemirror', package, 'package.json')

const packageTsconfigJson = (package) =>
  path.resolve(rootDir, 'libs', 'codemirror', package, 'tsconfig.json')

const packageTsconfigString = `{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "lib": ["DOM"]
  },
  "include": [
    "src/index.ts"
  ],
  "exclude": [
    "**/*.test.ts",
    "**/*.test.tsx"
  ]
}`

const exec = util.promisify(require('child_process').exec)

// const unlink = util.promisify(fs.unlink)
const writeFile = util.promisify(fs.writeFile)
const copyFile = util.promisify(fs.copyFile)
// const spawn = util.promisify(require('child_process').spawn);
// const { spawn, exec } = require('child_process')
// var isWin = require('os').platform().indexOf('ruby') > -1;

// function lockFileError() {
//   console.log('E: Could not get lock prepare hook')
// }

async function existCommand(command) {
  const { stderr } = await exec(`${command} --help`)
  if (stderr) console.log(`Unknown command: ${command}`)
  return !stderr
}

function installGlobalTypescript() {
  console.log('installing typescript')
  return exec('yarn global add typescript')
}

async function cloneCodemirror() {
  console.log('installing codemirror')
  // "type": "commonjs"

  if (!fs.existsSync(libsDir)) fs.mkdirSync(libsDir)
  process.chdir(libsDir)
  if (fs.existsSync(codemirrorDir)) fs.rmdirSync(codemirrorDir, { recursive: true })

  const codemirror = await exec('git clone https://github.com/codemirror/codemirror.next codemirror')
  process.chdir(codemirrorDir)
  await codemirror

  const tags = await exec('git describe --tags')
  const [tag] = tags.stdout.split('-')
  console.log(`tag ${tag}`)
  await exec(`git checkout ${tag}`)

  const rootTsconfigBuffer = fs.readFileSync(rootTsconfigJson)
  fs.writeFileSync(codemirrorTsconfigJson, rootTsconfigBuffer)

  const codemirrorPackageBuffer = fs.readFileSync(codemirrorPackageJson)
  fs.writeFileSync(codemirrorPackageJson, codemirrorPackageBuffer
    .toString()
    .replace('    "@codemirror/next": ".",\n', '')
    .replace('  "type": "module",\n', '')
    .replace('    "prepare": "bin/cm.js build",\n', ''))

  await exec('yarn')
  // await exec('yarn prepare')

  const directories = getDirectories(process.cwd())

  const baseDir = process.cwd()

  await Promise.all(directories.map(async (folder) => {
    const dir = `${baseDir}/${folder}`
    if (fs.existsSync(dir) && fs.existsSync(`${dir}/src`) && fs.existsSync(`${dir}/package.json`)) {
      process.chdir(dir)

      const packageBuffer = fs.readFileSync(packagePackageJson(folder))
      const f1 = writeFile(packagePackageJson(folder), packageBuffer
        .toString()
        .replace(',\n  "type": "module"\n', ''))

      await copyFile(codemirrorTsconfigJson, packageTsconfigJson(folder))

      const f2 = writeFile(packageTsconfigJson(folder), packageTsconfigString)

      await f1
      await f2

      const files = getFiles(`${baseDir}/${folder}/src`)

      if (files.indexOf('index.ts') < 0) {
        const indexTsString = files.reduce((acc, value) => {
          if (/\.ts/.test(value)) {
            const name = value.replace(/^(.+)\.ts$/, '$1')
            return `${acc}export * from './${name}'\n`
          }
          return acc
        }, '')
        await writeFile(`${baseDir}/${folder}/src/index.ts`, indexTsString)
      }
      try {
        const out = exec(`tsc --build ${packageTsconfigJson(folder)}`)
        process.chdir(codemirrorDir)
        await out
        // console.log(await out)
        return out
      }
      catch(e) {
        console.error(folder, e)
        return ''
      }
    }
    process.chdir(baseDir)
    return Promise.resolve()
  }))
}

const getDirectories = (source) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const getFiles = (source) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name)

async function main() {
  try {
    // if (fs.existsSync(lockfile)) return lockFileError()
    if (!existCommand('yarn')) return
    if (!existCommand('git')) return
    // writeFile(lockfile, '')

    const typescript = installGlobalTypescript()
    const codemirror = cloneCodemirror()

    await typescript
    await codemirror

    // console.log('packages')
    // process.chdir(rootDir)
    // const packages = ['configs', 'functional', 'env', 'i18n', 'keychain', 'algorithm-transpiler', 'components']
    // // Promise.all(packages.map((package) => exec('yarn build configs')))
    // for (let package of packages) {
    //   await exec(`yarn build ${package}`)
    // }
    // await exec('yarn build configs')
    // await exec('yarn build functional')
    // await exec('yarn build env')
    // await exec('yarn build i18n')
    // await exec('yarn build keychain')
    // await exec('yarn build algorithm-transpiler')
    // await exec('yarn build components')

    // console.log('fetch depedencies')
    // exec('yarn')
  }
  catch(e) { console.error(e) }
  // finally { unlink(lockfile) }
}

main()
