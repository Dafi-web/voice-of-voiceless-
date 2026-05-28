import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

function run(cmd) {
  execSync(cmd, { cwd: root, stdio: 'inherit' })
}

// Render often uses only `npm install` at repo root — install workspace deps here.
run('npm install --prefix frontend')
run('npm install --prefix backend')

if (process.env.RENDER) {
  run('npm run build --prefix frontend')
}
