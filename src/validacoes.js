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
