import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname,resolve,sep} from 'node:path';
import {createApp} from './core.js';
const app=createApp(process.env.DB_FILE||'cantinaflow.sqlite');app.seed();
const root=resolve('public');const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{
 const origin=req.headers.origin;const allowed=(process.env.CORS_ORIGIN||'').split(',').filter(Boolean);if(origin&&allowed.includes(origin)){res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,OPTIONS');}if(req.method==='OPTIONS'){res.writeHead(204).end();return;}
 const parsedUrl=new URL(req.url,'http://localhost');const path=parsedUrl.pathname;const send=(status,obj)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(obj));};
 if(path==='/api/health'&&req.method==='GET'){send(200,{status:'ok',service:'CantinaFlow',database:'sqlite'});return;}
 if(path.startsWith('/api/')){try{let raw='';for await(const part of req){raw+=part;if(raw.length>1024*1024)throw Object.assign(new Error('Requisição muito grande'),{status:413});}const body=raw?JSON.parse(raw):{};const token=(req.headers.authorization||'').replace(/^Bearer /i,'');send(200,app.dispatch(req.method,path,body,token,Object.fromEntries(parsedUrl.searchParams)));}catch(e){const status=e.status||((e instanceof SyntaxError)?400:((e.code||'').startsWith('SQLITE_CONSTRAINT')?409:500));if(status===500)console.error(e);send(status,{error:status===500?'Erro interno':e.message});}return;}
 try{const file=resolve(root,'.'+(path==='/'?'/index.html':decodeURIComponent(path)));if(file!==root&&!file.startsWith(root+sep))throw Error('Forbidden');const content=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(content);}catch{res.writeHead(404).end('Not found');}
});
server.listen(Number(process.env.PORT||3000),()=>console.log(`CantinaFlow em http://localhost:${process.env.PORT||3000}`));
