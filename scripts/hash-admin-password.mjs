import { scryptSync, randomBytes } from 'node:crypto'

const password = process.argv[2]
const username = process.argv[3]

if (!password) {
  console.error('Usage: node scripts/hash-admin-password.mjs "your strong password" [username]')
  process.exit(1)
}

const salt = randomBytes(16).toString('base64url')
const hash = scryptSync(password, salt, 64).toString('base64url')

const passwordHash = `scrypt:${salt}:${hash}`

console.log(`ADMIN_PASSWORD_HASH=${passwordHash}`)

if (username) {
  console.log(`ADMIN_USERS entry: ${username}=${passwordHash}`)
}
