const { chromium } = require('playwright-core')
const OUT='/tmp/claude-0/-home-user-emoto/5463c581-33a7-52e1-b545-1ef1c74252e7/scratchpad/shots'
;(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--disable-gpu']})
 const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2})
 await p.goto('http://localhost:3222/sv',{waitUntil:'networkidle'}); await p.waitForTimeout(600)
 await p.screenshot({path:OUT+'/header-crop.png',clip:{x:0,y:0,width:1440,height:90}})
 // footer logo (dark? footer is grey) + mobile
 await b.close(); console.log('header shot')
})().catch(e=>{console.error(e);process.exit(1)})
