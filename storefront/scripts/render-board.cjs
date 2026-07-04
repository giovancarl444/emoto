const { chromium } = require('playwright-core')
const OUT='/tmp/claude-0/-home-user-emoto/5463c581-33a7-52e1-b545-1ef1c74252e7/scratchpad/shots'
;(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--disable-gpu']})
  const ctx=await b.newContext({viewport:{width:1400,height:1000},deviceScaleFactor:2})
  const p=await ctx.newPage()
  await p.goto('file:///tmp/preview/board.html',{waitUntil:'networkidle',timeout:30000})
  const loaded = await p.evaluate(async () => {
    const fams=['Lato','Sora','Plus Jakarta Sans','Inter','JetBrains Mono']
    await Promise.all(fams.flatMap(f=>[document.fonts.load(`700 40px "${f}"`),document.fonts.load(`900 40px "${f}"`)]))
    await document.fonts.ready
    return [...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+':'+f.weight)
  })
  console.log('loaded fonts:', JSON.stringify(loaded))
  await p.waitForTimeout(600)
  await p.screenshot({path:OUT+'/brand-board.png',fullPage:true})
  await b.close(); console.log('board rendered')
})().catch(e=>{console.error(e);process.exit(1)})
