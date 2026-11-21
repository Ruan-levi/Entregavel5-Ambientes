/**
 * Monta um bundle para o navegador a partir dos mesmos modulos CommonJS
 * utilizados nos testes Node.js. Sem dependencias externas.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const modulos = [
  'src/validacoes.js',
  'src/algoritmos/numeroPrimo.js',
  'src/algoritmos/somatorio.js',
  'src/algoritmos/fibonacci.js',
  'src/algoritmos/mdc.js',
  'src/algoritmos/quickSort.js',
  'src/algoritmos/contagemInteiros.js',
  'src/index.js'
];

const fabricas = [];
for (const id of modulos) {
  const fonte = await readFile(resolve(raiz, id), 'utf8');
  fabricas.push(`${JSON.stringify(id)}: function(require, module, exports) {\n${fonte}\n}`);
}

const bundle = `/* Gerado automaticamente por npm run build. */\n(function () {\n  'use strict';\n  const factories = {\n${fabricas.join(',\n')}\n  };\n  const cache = {};\n  function load(id) {\n    if (cache[id]) return cache[id].exports;\n    if (!Object.prototype.hasOwnProperty.call(factories, id)) throw new Error('Modulo nao encontrado: ' + id);\n    const module = { exports: {} };\n    cache[id] = module;\n    function localRequire(relative) {\n      const base = id.split('/').slice(0, -1);\n      for (const part of relative.split('/')) {\n        if (part === '..') base.pop();\n        else if (part !== '.' && part !== '') base.push(part);\n      }\n      return load(base.join('/') + '.js');\n    }\n    factories[id](localRequire, module, module.exports);\n    return module.exports;\n  }\n  window.Algoritmos = Object.freeze(load('src/index.js'));\n})();\n`;
await writeFile(resolve(raiz, 'assets/js/algoritmos.bundle.js'), bundle);
console.log('Bundle gerado: assets/js/algoritmos.bundle.js');
