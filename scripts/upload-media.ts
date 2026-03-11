import { config } from 'dotenv'
config({ path: '.env.local' })

import { put } from '@vercel/blob'
import { readFileSync } from 'fs'
import { join } from 'path'

const files = [
  {
    src: join(process.cwd(), 'public/loveland-reservoir-drone-opt.mp4'),
    blobPath: 'media/loveland-reservoir-drone.mp4',
    contentType: 'video/mp4',
  },
]

async function main() {
  for (const { src, blobPath, contentType } of files) {
    const buffer = readFileSync(src)
    const blob = await put(blobPath, buffer, {
      access: 'public',
      contentType,
      allowOverwrite: true,
    })
    console.log(`${blobPath}\n  → ${blob.url}\n`)
  }
}

main()
