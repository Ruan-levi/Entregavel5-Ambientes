const test = require('node:test');
const assert = require('node:assert/strict');
const { ehPrimo, somatorio, gerarFibonacci, mdc, quickSort, contarInteiros } = require('../src');

test('Primo: identifica 2 e 29', () => { assert.equal(ehPrimo(2), true); assert.equal(ehPrimo(29), true); });
test('Primo: rejeita compostos e zero', () => { assert.equal(ehPrimo(21), false); assert.equal(ehPrimo(0), false); });
test('Primo: rejeita negativo', () => assert.equal(ehPrimo(-7), false));
test('Primo: rejeita decimal', () => assert.throws(() => ehPrimo(2.5), TypeError));
test('Primo: rejeita inteiro inseguro', () => assert.throws(() => ehPrimo(Number.MAX_SAFE_INTEGER + 1), RangeError));

test('Somatório: soma valores da Entregável 1', () => assert.equal(somatorio([2,5,8,10,15]), 40));
test('Somatório: aceita vetor vazio', () => assert.equal(somatorio([]), 0));
test('Somatório: aceita decimais e negativos', () => assert.equal(somatorio([-3,2.5,1.5]), 1));
test('Somatório: rejeita tipos inválidos', () => assert.throws(() => somatorio([1,'2']), TypeError));
test('Somatório: rejeita resultado infinito', () => assert.throws(() => somatorio([1e308,1e308]), RangeError));

test('Fibonacci: gera cinco termos', () => assert.deepEqual(gerarFibonacci(5), [0,1,1,2,3]));
test('Fibonacci: zero termos retorna vetor vazio', () => assert.deepEqual(gerarFibonacci(0), []));
test('Fibonacci: um termo é zero', () => assert.deepEqual(gerarFibonacci(1), [0]));
test('Fibonacci: admite limite superior', () => assert.equal(gerarFibonacci(79).length, 79));
test('Fibonacci: impede extrapolar limite', () => assert.throws(() => gerarFibonacci(80), RangeError));
test('Fibonacci: exige inteiro', () => assert.throws(() => gerarFibonacci(1.2), TypeError));

test('MDC: exemplo original', () => assert.equal(mdc(87,36), 3));
test('MDC: sinal negativo não interfere', () => assert.equal(mdc(-48,18), 6));
test('MDC: aceita um zero', () => assert.equal(mdc(0,15), 15));
test('MDC: zero-zero é indefinido', () => assert.throws(() => mdc(0,0), RangeError));
test('MDC: valida tipos', () => assert.throws(() => mdc('3',6), TypeError));

test('QuickSort: ordena corretamente', () => assert.deepEqual(quickSort([9,3,7,1,4]), [1,3,4,7,9]));
test('QuickSort: não altera o vetor original', () => { const a=[8,2,7]; quickSort(a); assert.deepEqual(a,[8,2,7]); });
test('QuickSort: aceita repetidos e negativos', () => assert.deepEqual(quickSort([1,-2,1,0]), [-2,0,1,1]));
test('QuickSort: lida com vetor vazio', () => assert.deepEqual(quickSort([]), []));
test('QuickSort: rejeita NaN', () => assert.throws(() => quickSort([1,NaN]), TypeError));

test('Contagem: conta inteiros na lista', () => assert.equal(contarInteiros([1,2.5,3,4.2,8]), 3));
test('Contagem: aceita negativos', () => assert.equal(contarInteiros([-1,-2.5,0]), 2));
test('Contagem: aceita lista vazia', () => assert.equal(contarInteiros([]), 0));
test('Contagem: rejeita string numérica', () => assert.throws(() => contarInteiros([1,'2']), TypeError));
test('Contagem: rejeita infinito', () => assert.throws(() => contarInteiros([Infinity]), TypeError));
