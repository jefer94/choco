const util = require('util')
const fs = require('fs')
const process = require('process');

const lockfile = 'prepare.lock'
const rootDir = process.cwd()
const libsDir = `${rootDir}/libs`
const codemirrorDir = `${libsDir}/codemirror`
const exec = util.promisify(require('child_process').exec)
const unlink = util.promisify(fs.unlink)
const writeFile = util.promisify(fs.writeFile)
const copyFile = util.promisify(fs.copyFile)
// const spawn = util.promisify(require('child_process').spawn);
// const { spawn, exec } = require('child_process')
// var isWin = require('os').platform().indexOf('ruby') > -1;

function lockFileError() {
  console.log('E: Could not get lock prepare hook')
}

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
  console.log(`tag ${tags.stdout}`)
  await exec(`git checkout ${tags.stdout}`)

  const tsconfigBaseJson = fs.readFileSync(`${codemirrorDir}/tsconfig.base.json`)
  const f1 = writeFile(`${codemirrorDir}/tsconfig.base.json`, tsconfigBaseJson
    .toString()
    .replace(/ "es6"/g, ' "es5"')
    .replace(/"compilerOptions": \{\n/g, '"compilerOptions": {\n    "module": "commonjs",\n'))

  const packageJson = fs.readFileSync(`${codemirrorDir}/package.json`)
  const f2 = writeFile(`${codemirrorDir}/package.json`, packageJson
    .toString()
    .replace('    "@codemirror/next": ".",\n', '')
    .replace('  "type": "module",\n', '  "type": "commonjs",\n'))

  await f1
  await f2

  await exec('yarn')
  await exec('yarn prepare')

  const tsconfigJson = fs.readFileSync(`${codemirrorDir}/tsconfig.json`)
  await writeFile(`${codemirrorDir}/tsconfig.json`, tsconfigJson
    .toString()
    .replace('"compilerOptions": {\n', '"compilerOptions": {\n    "outDir": "./dist",\n'))

  const directories = getDirectories(process.cwd())

  const baseDir = process.cwd()
  await Promise.all(directories.map(async (folder) => {
    const dir = `${baseDir}/${folder}`
    if (fs.existsSync(dir) && fs.existsSync(`${dir}/src`) && fs.existsSync(`${dir}/package.json`)) {
      process.chdir(dir)

      const packageJson = fs.readFileSync(`${dir}/package.json`)
      const f1 = writeFile(`${dir}/package.json`, packageJson
        .toString()
        .replace(' "module"', ' "commonjs"'))

      await copyFile(`${codemirrorDir}/tsconfig.json`, `${dir}/tsconfig.json`)

      const tsconfigJson = fs.readFileSync(`${dir}/tsconfig.json`)
      const f2 = writeFile(`${dir}/tsconfig.json`, tsconfigJson
        .toString()
        .replace('"*/', '"')
        .replace(', "test/*.ts"', '')
        .replace(', "demo/demo.ts"', ''))

      const f3 = copyFile(`${codemirrorDir}/tsconfig.base.json`, `${dir}/tsconfig.base.json`)

      await f1
      await f2
      await f3

      const package = exec(`tsc --build ${dir}/tsconfig.json`)
      process.chdir(codemirrorDir)
      return package
    }
    process.chdir(baseDir)
    return Promise.resolve()
  }))
}

const getDirectories = (source) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
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

    console.log('packages')
    process.chdir(rootDir)
    const packages = ['configs', 'functional', 'env', 'i18n', 'keychain', 'algorithm-transpiler', 'components']
    // Promise.all(packages.map((package) => exec('yarn build configs')))
    for (let package of packages) {
      await exec(`yarn build ${package}`)
    }
    // await exec('yarn build configs')
    // await exec('yarn build functional')
    // await exec('yarn build env')
    // await exec('yarn build i18n')
    // await exec('yarn build keychain')
    // await exec('yarn build algorithm-transpiler')
    // await exec('yarn build components')

    console.log('fetch depedencies')
    // exec('yarn')
  }
  catch(e) { console.error(e) }
  // finally { unlink(lockfile) }
}

main()
