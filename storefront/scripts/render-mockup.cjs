const { chromium } = require('playwright-core')
const OUT='/tmp/claude-0/-home-user-emoto/5463c581-33a7-52e1-b545-1ef1c74252e7/scratchpad/shots'
;(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox','--disable-gpu']})
  for(const [name,w,h,dsf] of [['light-desktop',1440,900,2],['light-mobile',390,844,2]]){
    const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dsf})
    const p=await ctx.newPage()
    await p.goto('file:///tmp/preview/mockup.html',{waitUntil:'networkidle',timeout:30000})
    await p.evaluate(()=>document.fonts.ready)
    await p.waitForTimeout(800)
    await p.screenshot({path:OUT+'/'+name+'.png',fullPage:true})
    console.log('shot',name); await ctx.close()
  }
  await b.close()
})().catch(e=>{console.error(e);process.exit(1)})
