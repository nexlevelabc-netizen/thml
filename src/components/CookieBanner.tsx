import { useEffect, useState } from 'react'

const CONSENT_KEY = 'thml-cookie-consent'

type Consent = 'accepted' | 'declined' | null

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function refresh() {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored === 'accepted' || stored === 'declined') {
        setConsent(stored)
        setVisible(false)
      } else {
        setConsent(null)
        setVisible(true)
      }
    }
    refresh()
    window.addEventListener('thml-cookie-reset', refresh)
    return () => window.removeEventListener('thml-cookie-reset', refresh)
  }, [])

  function choose(value: 'accepted' | 'declined') {
    localStorage.setItem(CONSENT_KEY, value)
    setConsent(value)
    setVisible(false)
  }

  if (!visible || consent) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#2a2e2c] bg-black px-5 py-4 text-white shadow-2xl sm:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-[#d8d5cf]">
          We use cookies to make this website work properly and to understand how it is used.
          You can accept all cookies or continue with only the essential ones needed for the site to function.{' '}
          <a href="#/cookies" className="underline underline-offset-2 hover:text-white">
            Read our Cookie Policy
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose('declined')}
            className="border border-[#555b58] px-4 py-2 text-sm text-[#d8d5cf] transition-colors hover:border-white hover:text-white"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="bg-[#1d6151] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2b7a66]"
          >
            Accept all cookies
          </button>
        </div>
      </div>
    </div>
  )
}

export function resetCookieConsent() {
  localStorage.removeItem(CONSENT_KEY)
  window.dispatchEvent(new Event('thml-cookie-reset'))
}
