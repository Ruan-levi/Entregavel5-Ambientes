/* Gerado automaticamente por npm run build. */
(function () {
  'use strict';
  const factories = {
"src/validacoes.js": function(require, module, exports) {
/** Valida valores inteiros sem perder precisao numerica no JavaScript. */
function validarInteiroSeguro(valor, nome = "valor") {
  if (typeof valor !== "number" || !Number.isFinite(valor) || !Number.isInteger(valor)) {
    throw new TypeError(nome + " deve ser um número inteiro.");
  }
  if (!Number.isSafeInteger(valor)) {
    throw new RangeError(nome + " deve ser um inteiro seguro.");
  }
}

/** Valida listas numericas; um vetor vazio e permitido. */
function validarListaNumeros(numeros, nome = "numeros") {
  if (!Array.isArray(numeros)) {
    throw new TypeError(nome + " deve ser um array.");
  }
  for (let indice = 0; indice < numeros.length; indice += 1) {
    const numero = numeros[indice];
    if (typeof numero !== "number" || !Number.isFinite(numero)) {
      throw new TypeError(nome + "[" + indice + "] deve ser um número finito.");
    }
  }
}

module.exports = { validarInteiroSeguro, validarListaNumeros };

},
"src/algoritmos/numeroPrimo.js": function(require, module, exports) {
const { validarInteiroSeguro } = require("../validacoes");

function ehPrimo(numero) {
  validarInteiroSeguro(numero, "numero");
  if (numero <= 1) return false;
  if (numero === 2) return true;
  if (numero % 2 === 0) return false;
  const limite = Math.sqrt(numero);
  for (let divisor = 3; divisor <= limite; divisor += 2) {
    if (numero % divisor === 0) return false;
  }
  return true;
}

module.exports = { ehPrimo };

},
"src/algoritmos/somatorio.js": function(require, module, exports) {
const { validarListaNumeros } = require("../validacoes");

function somatorio(numeros) {
  validarListaNumeros(numeros);
  let resultado = 0;
  for (const numero of numeros) {
    resultado += numero;
    if (!Number.isFinite(resultado)) {
      throw new RangeError("A soma ultrapassou o limite de números finitos.");
    }
  }
  return resultado;
}

module.exports = { somatorio };

},
"src/algoritmos/fibonacci.js": function(require, module, exports) {
const { validarInteiroSeguro } = require("../validacoes");

function gerarFibonacci(quantidade) {
  validarInteiroSeguro(quantidade, "quantidade");
  if (quantidade < 0 || quantidade > 79) {
    throw new RangeError("quantidade deve estar entre 0 e 79.");
  }
  const sequencia = [];
  let anterior = 0;
  let atual = 1;
  for (let indice = 0; indice < quantidade; indice += 1) {
    sequencia.push(anterior);
    if (indice < quantidade - 1) {
      const proximo = anterior + atual;
      anterior = atual;
      atual = proximo;
    }
  }
  return sequencia;
}

module.exports = { gerarFibonacci };

},
"src/algoritmos/mdc.js": function(require, module, exports) {
const { validarInteiroSeguro } = require("../validacoes");

function mdc(primeiroNumero, segundoNumero) {
  validarInteiroSeguro(primeiroNumero, "primeiroNumero");
  validarInteiroSeguro(segundoNumero, "segundoNumero");
  let a = Math.abs(primeiroNumero);
  let b = Math.abs(segundoNumero);
  if (a === 0 && b === 0) {
    throw new RangeError("O MDC de 0 e 0 não está definido.");
  }
  while (b !== 0) {
    const resto = a % b;
    a = b;
    b = resto;
  }
  return a;
}

module.exports = { mdc };

},
"src/algoritmos/quickSort.js": function(require, module, exports) {
const { validarListaNumeros } = require("../validacoes");

function medianaDeTres(primeiro, segundo, terceiro) {
  if ((primeiro <= segundo && segundo <= terceiro) ||
      (terceiro <= segundo && segundo <= primeiro)) return segundo;
  if ((segundo <= primeiro && primeiro <= terceiro) ||
      (terceiro <= primeiro && primeiro <= segundo)) return primeiro;
  return terceiro;
}

function quickSort(numeros) {
  validarListaNumeros(numeros);
  const ordenados = [...numeros];
  const intervalos = [[0, ordenados.length - 1]];
  while (intervalos.length > 0) {
    const [inicio, fim] = intervalos.pop();
    if (inicio >= fim) continue;
    const meio = Math.floor((inicio + fim) / 2);
    const pivo = medianaDeTres(ordenados[inicio], ordenados[meio], ordenados[fim]);
    let menores = inicio;
    let atual = inicio;
    let maiores = fim;
    while (atual <= maiores) {
      if (ordenados[atual] < pivo) {
        [ordenados[menores], ordenados[atual]] = [ordenados[atual], ordenados[menores]];
        menores += 1;
        atual += 1;
      } else if (ordenados[atual] > pivo) {
        [ordenados[atual], ordenados[maiores]] = [ordenados[maiores], ordenados[atual]];
        maiores -= 1;
      } else {
        atual += 1;
      }
    }
    if (inicio < menores - 1) intervalos.push([inicio, menores - 1]);
    if (maiores + 1 < fim) intervalos.push([maiores + 1, fim]);
  }
  return ordenados;
}

module.exports = { quickSort };

},
"src/algoritmos/contagemInteiros.js": function(require, module, exports) {
const { validarListaNumeros } = require("../validacoes");

function contarInteiros(numeros) {
  validarListaNumeros(numeros);
  let quantidadeDeInteiros = 0;
  for (const numero of numeros) {
    if (Number.isInteger(numero)) quantidadeDeInteiros += 1;
  }
  return quantidadeDeInteiros;
}

module.exports = { contarInteiros };

},
"src/index.js": function(require, module, exports) {
const { ehPrimo } = require("./algoritmos/numeroPrimo");
const { somatorio } = require("./algoritmos/somatorio");
const { gerarFibonacci } = require("./algoritmos/fibonacci");
const { mdc } = require("./algoritmos/mdc");
const { quickSort } = require("./algoritmos/quickSort");
const { contarInteiros } = require("./algoritmos/contagemInteiros");

module.exports = { ehPrimo, somatorio, gerarFibonacci, mdc, quickSort, contarInteiros };

}
  };
  const cache = {};
  function load(id) {
    if (cache[id]) return cache[id].exports;
    if (!Object.prototype.hasOwnProperty.call(factories, id)) throw new Error('Modulo nao encontrado: ' + id);
    const module = { exports: {} };
    cache[id] = module;
    function localRequire(relative) {
      const base = id.split('/').slice(0, -1);
      for (const part of relative.split('/')) {
        if (part === '..') base.pop();
        else if (part !== '.' && part !== '') base.push(part);
      }
      return load(base.join('/') + '.js');
    }
    factories[id](localRequire, module, module.exports);
    return module.exports;
  }
  window.Algoritmos = Object.freeze(load('src/index.js'));
})();
