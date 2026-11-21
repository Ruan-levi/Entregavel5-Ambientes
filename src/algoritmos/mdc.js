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
