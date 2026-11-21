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
