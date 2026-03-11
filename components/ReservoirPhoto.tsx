'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ReservoirPhoto() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative rounded-lg h-40 w-full overflow-hidden mb-4 group block"
        aria-label="View full photo of Loveland Reservoir"
      >
        <Image
          src="/loveland-reservoir.jpg"
          alt="Loveland Reservoir"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <svg
            className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0zm-3-3v6m-3-3h6" />
          </svg>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] aspect-video">
            <Image
              src="/loveland-reservoir.jpg"
              alt="Loveland Reservoir"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
