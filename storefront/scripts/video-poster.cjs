const { chromium } = require('playwright-core')
;(async () => {
  const b = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-gpu', '--autoplay-policy=no-user-gesture-required'],
  })
  const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 })
  const url = 'file://' + process.argv[2]
  await p.setContent(`<body style="margin:0;background:#0B0C0E"><video id=v src="${url}" muted playsinline style="width:1280px;height:720px;object-fit:cover"></video></body>`)
  const decoded = await p.evaluate(async () => {
    const v = document.getElementById('v')
    await v.play().catch(() => {})
    await new Promise((res) => {
      v.onseeked = res
      setTimeout(res, 3000)
      try { v.currentTime = 1.2 } catch (e) { res() }
    })
    return { w: v.videoWidth, h: v.videoHeight }
  })
  console.log('videoSize:', JSON.stringify(decoded))
  const v = await p.$('#v')
  if (v) await v.screenshot({ path: process.argv[3] })
  await b.close()
})().catch((e) => { console.error(String(e)); process.exit(1) })
