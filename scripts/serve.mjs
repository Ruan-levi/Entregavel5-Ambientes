import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tipo = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
const porta = Number(process.env.PORT || 3000);

createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return;
  }
  let caminho;
  try { caminho = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end('Requisicao invalida'); return; }
  const destino = resolve(raiz, '.' + (caminho === '/' ? '/index.html' : caminho));
  if (destino !== raiz && !destino.startsWith(raiz + sep)) {
    res.writeHead(403); res.end('Acesso negado'); return;
  }
  try {
    const arquivo = await stat(destino);
    if (!arquivo.isFile()) throw new Error('Nao e arquivo');
    res.writeHead(200, {'Content-Type':tipo[extname(destino)] || 'application/octet-stream','Cache-Control':'no-cache'});
    res.end(req.method === 'HEAD' ? undefined : await readFile(destino));
  } catch { res.writeHead(404); res.end('Nao encontrado'); }
}).listen(porta, () => console.log(`Aplicacao em http://localhost:${porta}`));
