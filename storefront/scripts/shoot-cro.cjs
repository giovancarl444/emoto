const { chromium } = require('playwright-core')
const OUT = '/tmp/claude-0/-home-user-emoto/5463c581-33a7-52e1-b545-1ef1c74252e7/scratchpad/shots'
const BASE = process.env.BASE || 'http://localhost:3210'
;(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox','--disable-gpu','--disable-dev-shm-usage'] })
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: 'dark' })
  const page = await ctx.newPage()
  // PDP top — financing, urgency, trust in flow
  await page.goto(BASE + '/sv/motorcyklar/ultra-bee', { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: OUT + '/cro-pdp-top.png' })
  // PDP scrolled — sticky ATC should slide up
  await page.evaluate(() => window.scrollTo(0, 1400))
  await page.waitForTimeout(700)
  await page.screenshot({ path: OUT + '/cro-pdp-sticky.png' })
  await ctx.close(); await b.close(); console.log('done')
})().catch(e => { console.error(e); process.exit(1) })
