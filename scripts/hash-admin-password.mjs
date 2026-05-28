import { scryptSync, randomBytes } from 'node:crypto'

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/hash-admin-password.mjs "your strong password"')
  process.exit(1)
}

const salt = randomBytes(16).toString('base64url')
const hash = scryptSync(password, salt, 64).toString('base64url')

console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt}:${hash}`)
