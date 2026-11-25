const base=process.env.CONQUEST_PAGES_URL||'https://ruan-levi.github.io/Entregavel5-Ambientes/';
const pat=/\/Entregavel5-Ambientes\/assets\/[^"' ]+\.js/;
let last='sem resposta';
for(let i=0;i<12;i++){
 try{
  const url=new URL(base);url.searchParams.set('check_e5',process.env.GITHUB_SHA||'latest');
  const res=await fetch(url,{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(12000)});
  const html=await res.text();const match=html.match(pat);
  if(res.ok&&match&&html.includes('portal-duel-open')&&html.includes('e5-react-open')&&!html.includes('src="/src/main.js"')){
    const asset=new URL(match[0],url.origin);
    const r=await fetch(asset,{signal:AbortSignal.timeout(12000)});
    if(r.ok){console.log('Entregável 5 publicado corretamente:',url.href,asset.pathname);process.exit(0);}
    last='JavaScript HTTP '+r.status;
  }else last='GitHub Pages serviu HTML bruto/Jekyll ou versão antiga: '+res.status;
 }catch(e){last=e.message;}
 if(i<11)await new Promise(r=>setTimeout(r,5000));
}
console.error(last);process.exit(1);
