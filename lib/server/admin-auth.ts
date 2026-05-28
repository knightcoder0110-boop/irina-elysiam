import 'server-only'

import { scrypt as scryptCallback, timingSafeEqual, createHmac, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCallback)
const sessionCookieName = 'irina_admin_session'
const sessionMaxAgeSeconds = 60 * 60 * 12

type SessionPayload = {
  username: string
  expiresAt: number
}

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString('base64url')
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD_HASH || ''
}

function getCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get('cookie') || ''
  return cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1)
}

function sign(value: string) {
  const secret = getSessionSecret()
  if (!secret) return ''
  return createHmac('sha256', secret).update(value).digest('base64url')
}

function safeEqualString(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) return false
  return timingSafeEqual(leftBuffer, rightBuffer)
}

export async function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString('base64url')
  const derivedKey = await scrypt(password, salt, 64) as Buffer
  return `scrypt:${salt}:${derivedKey.toString('base64url')}`
}

async function verifyPassword(password: string, storedHash: string) {
  const [scheme, salt, hash] = storedHash.split(':')
  if (scheme !== 'scrypt' || !salt || !hash) return false

  const derivedKey = await scrypt(password, salt, 64) as Buffer
  return safeEqualString(derivedKey.toString('base64url'), hash)
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD_HASH && getSessionSecret())
}

export async function verifyAdminCredentials(username: string, password: string) {
  const configuredUsername = process.env.ADMIN_USERNAME
  const passwordHash = process.env.ADMIN_PASSWORD_HASH

  if (!configuredUsername || !passwordHash) return false
  if (!safeEqualString(username, configuredUsername)) return false

  return verifyPassword(password, passwordHash)
}

export function createAdminSession(username: string) {
  const payload: SessionPayload = {
    username,
    expiresAt: Date.now() + sessionMaxAgeSeconds * 1000,
  }
  const encodedPayload = base64Url(JSON.stringify(payload))
  const signature = sign(encodedPayload)

  return `${encodedPayload}.${signature}`
}

export function verifyAdminSession(token?: string) {
  if (!token || !getSessionSecret()) return false

  const [encodedPayload, signature] = token.split('.')
  if (!encodedPayload || !signature) return false

  const expectedSignature = sign(encodedPayload)
  if (!safeEqualString(signature, expectedSignature)) return false

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload
    return payload.expiresAt > Date.now() && payload.username === process.env.ADMIN_USERNAME
  } catch {
    return false
  }
}

export function adminCookieOptions() {
  return {
    name: sessionCookieName,
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: sessionMaxAgeSeconds,
  }
}

export function assertAdmin(request: Request) {
  if (!isAdminAuthConfigured()) {
    return Response.json({ error: 'Admin username/password is not configured.' }, { status: 503 })
  }

  if (!verifyAdminSession(getCookie(request, sessionCookieName))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null
}
