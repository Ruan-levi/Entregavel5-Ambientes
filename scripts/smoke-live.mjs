import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';

const credentials = Object.fromEntries(
  readFileSync('/root/cantinaflow-demo-credentials', 'utf8')
    .trim()
    .split('\n')
    .map((line) => line.split(': '))
);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1';

async function request(method, path, data, token) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(data === undefined ? {} : { body: JSON.stringify(data) }),
  });
  const result = await response.json();
  return { status: response.status, result };
}

const adminLogin = await request('POST', '/api/login', {
  username: 'admin', password: credentials['CantinaFlow admin'],
});
const operatorLogin = await request('POST', '/api/login', {
  username: 'operador', password: credentials['CantinaFlow operador'],
});
assert.equal(adminLogin.status, 200, 'Login de administrador');
assert.equal(operatorLogin.status, 200, 'Login de operador');
const admin = adminLogin.result.token;
const operator = operatorLogin.result.token;

const forbidden = await request('POST', '/api/products', {
  name: 'Acesso indevido', sku: `DENY-${randomUUID()}`, price_cents: 100, stock: 1,
}, operator);
assert.equal(forbidden.status, 403, 'Permissões de operador');

const product = await request('POST', '/api/products', {
  name: 'Produto verificação AWS', sku: `TEST-${randomUUID()}`,
  unit: 'un', price_cents: 350, stock: 12,
}, admin);
assert.equal(product.status, 200, 'Cadastro de produtos');

const customer = await request('POST', '/api/customers', {
  name: 'Cliente de verificação AWS', state: 'CE', city: 'Fortaleza',
}, operator);
assert.equal(customer.status, 200, 'Cadastro de clientes');

const cashSale = await request('POST', '/api/sales', {
  customer_id: customer.result.id, payment_type: 'vista',
  items: [{ product_id: product.result.id, quantity: 2 }],
}, operator);
assert.equal(cashSale.status, 200, 'Venda à vista');

const creditSale = await request('POST', '/api/sales', {
  customer_id: customer.result.id, payment_type: 'prazo', due_date: '2026-12-10',
  items: [{ product_id: product.result.id, quantity: 1 }],
}, operator);
assert.equal(creditSale.status, 200, 'Venda a prazo');

const products = await request('GET', '/api/products', undefined, admin);
assert.equal(products.result.find((p) => p.id === product.result.id).stock, 9, 'Baixa do estoque');

const receivables = await request('GET', '/api/receivables', undefined, admin);
const credit = receivables.result.find((r) => r.sale_id === creditSale.result.id);
assert.ok(credit, 'Conta a receber');
const payment = await request('POST', `/api/receivables/${credit.id}/pay`, {}, operator);
assert.equal(payment.status, 200, 'Baixa de pagamento');

const report = await request('GET', '/api/reports/top-customers?from=2026-11-01&to=2026-11-30', undefined, admin);
assert.equal(report.status, 200, 'Relatório de clientes');
assert.ok(report.result.some((row) => row.id === customer.result.id));

console.log(JSON.stringify({
  status: 'OK', admin_login: 200, operator_login: 200, forbidden_action: 403,
  product_registration: 200, customer_registration: 200, cash_sale: 200,
  credit_sale: 200, stock_after_sales: 9, payment_settlement: 200,
  top_customers_report: 200,
  note: 'Os registros criados são dados fictícios para demonstração.',
}, null, 2));