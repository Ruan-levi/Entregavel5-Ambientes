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
