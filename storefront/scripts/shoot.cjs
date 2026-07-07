// Screenshot harness — renders key pages at mobile + desktop for design review.
const { chromium } = require('playwright-core')
const path = require('path')
const fs = require('fs')

const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const BASE = process.env.BASE || 'http://localhost:3200'
const OUT = process.env.OUT || '/tmp/claude-0/-home-user-emoto/5463c581-33a7-52e1-b545-1ef1c74252e7/scratchpad/shots'

const PAGES = [
  ['home', '/sv'],
  ['plp', '/sv/motorcyklar'],
  ['pdp', '/sv/motorcyklar/ultra-bee'],
  ['parts', '/sv/delar'],
  ['registration', '/sv/tjanster/registrering'],
  ['compare', '/sv/jamfor'],
]
const VIEWPORTS = [
  ['mobile', 390, 844, 2],
  ['desktop', 1440, 900, 1],
]

;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await chromium.launch({
    executablePath: EXE,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  })
  for (const [vname, w, h, dsf] of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: w, height: h },
      deviceScaleFactor: dsf,
      colorScheme: 'dark',
    })
    const page = await ctx.newPage()
    for (const [name, url] of PAGES) {
      await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 30000 })
      // Auto-scroll to trigger lazy-loaded (below-fold) images, then return to top.
      await page.evaluate(async () => {
        const step = window.innerHeight
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 120))
        }
        window.scrollTo(0, 0)
      })
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500) // fonts + reveal
      const file = path.join(OUT, `${name}-${vname}.png`)
      await page.screenshot({ path: file, fullPage: true })
      console.log('shot', file)
    }
    await ctx.close()
  }
  await browser.close()
  console.log('done')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
