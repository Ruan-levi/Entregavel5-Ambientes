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
