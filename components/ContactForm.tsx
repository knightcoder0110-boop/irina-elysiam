'use client'

import { useState } from 'react'

type FormStatus = {
  type: 'success' | 'error'
  message: string
}

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<FormStatus | null>(null)

  const canSend = name.trim().length > 1 && email.includes('@') && message.trim().length > 5

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSend) return

    setIsSending(true)
    setStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          source: 'contact-page',
        }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error || 'We could not send this message right now.')
      }

      setStatus({
        type: 'success',
        message: data?.message || 'Your message was received. We will reply soon.',
      })
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'We could not send this message right now.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {status && (
        <div
          className={`rounded-2xl border px-5 py-4 text-sm leading-relaxed ${
            status.type === 'success'
              ? 'border-gold-primary/30 bg-gold-champagne/30 text-emerald-deep'
              : 'border-red-900/20 bg-red-50 text-red-900'
          }`}
        >
          {status.message}
        </div>
      )}

      <div>
        <label className="form-label">YOUR NAME</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="form-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div>
        <label className="form-label">EMAIL ADDRESS</label>
        <input
          type="email"
          placeholder="your@email.com"
          className="form-input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div>
        <label className="form-label">PHONE NUMBER</label>
        <input
          type="tel"
          placeholder="(720) 555-0100"
          className="form-input"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>

      <div>
        <label className="form-label">MESSAGE</label>
        <textarea
          placeholder="How can we help you?"
          rows={4}
          className="form-input resize-y"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={!canSend || isSending}
        className={`btn-primary w-full ${!canSend || isSending ? 'opacity-45 cursor-not-allowed' : ''}`}
      >
        {isSending ? 'SENDING...' : 'SEND MESSAGE'}
      </button>
    </form>
  )
}
