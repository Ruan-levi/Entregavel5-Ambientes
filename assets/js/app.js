(() => {
  'use strict';

  const algoritmos = window.Algoritmos;
  const $ = (id) => document.getElementById(id);
  const historyKey = 'algolab-history-v1';
  const definitions = {
    primo: { title: 'Número primo', category: 'TEORIA DOS NÚMEROS', glyph: '#', description: 'Descubra se um número possui exatamente dois divisores positivos.', insight: 'Um número primo é divisível somente por 1 e por ele mesmo. O algoritmo verifica divisores até a raiz quadrada do número.', fields: [{ id: 'numero', label: 'Número inteiro', placeholder: 'Ex.: 29', example: '29', type: 'number' }], execute: (v) => { const n = readInteger(v.numero, 'Número'); const prime = algoritmos.ehPrimo(n); return { value: prime ? 'É primo ✓' : 'Não é primo', detail: `${n} ${prime ? 'é' : 'não é'} um número primo.` }; } },
    somatorio: { title: 'Somatório', category: 'OPERAÇÕES COM LISTAS', glyph: 'Σ', description: 'Calcule a soma dos valores de uma sequência numérica.', insight: 'O somatório percorre cada valor da lista e acumula os números até chegar ao total.', fields: [{ id: 'lista', label: 'Lista de números', placeholder: 'Ex.: 2, 5, 8, 10, 15', example: '2, 5, 8, 10, 15' }], execute: (v) => { const lista = readList(v.lista); return { value: formatNumber(algoritmos.somatorio(lista)), detail: `Soma dos ${lista.length} valores: ${lista.map(formatNumber).join(' + ') || 'lista vazia'}.` }; } },
    fibonacci: { title: 'Fibonacci', category: 'SEQUÊNCIAS', glyph: 'φ', description: 'Gere os primeiros termos da famosa sequência de Fibonacci.', insight: 'Cada termo da sequência é a soma dos dois anteriores. O limite de 79 termos preserva a precisão numérica do JavaScript.', fields: [{ id: 'quantidade', label: 'Quantidade de termos (0 a 79)', placeholder: 'Ex.: 10', example: '10', type: 'number' }], execute: (v) => { const n = readInteger(v.quantidade, 'Quantidade'); const seq = algoritmos.gerarFibonacci(n); return { value: seq.length ? seq.join(' · ') : 'Sequência vazia', detail: `${seq.length} termo(s) gerado(s).` }; } },
    mdc: { title: 'Máximo divisor comum', category: 'ALGORITMO DE EUCLIDES', glyph: '÷', description: 'Encontre o maior número que divide dois inteiros sem deixar resto.', insight: 'O algoritmo de Euclides substitui repetidamente o par de valores pelo divisor e pelo resto até o resto ser zero.', fields: [{ id: 'a', label: 'Primeiro número', placeholder: 'Ex.: 87', example: '87', type: 'number' }, { id: 'b', label: 'Segundo número', placeholder: 'Ex.: 36', example: '36', type: 'number' }], execute: (v) => { const a = readInteger(v.a, 'Primeiro número'), b = readInteger(v.b, 'Segundo número'); return { value: formatNumber(algoritmos.mdc(a,b)), detail: `MDC calculado para ${a} e ${b}.` }; } },
    quicksort: { title: 'QuickSort', category: 'ESTRUTURAS DE DADOS', glyph: '↕', description: 'Organize uma lista de números em ordem crescente.', insight: 'O QuickSort divide os dados em grupos menores, iguais e maiores que um pivô, sem alterar a lista original.', fields: [{ id: 'lista', label: 'Lista de números', placeholder: 'Ex.: 9, 3, 7, 1, 4', example: '9, 3, 7, 1, 4' }], execute: (v) => { const lista = readList(v.lista); return { value: algoritmos.quickSort(lista).map(formatNumber).join(' · ') || 'Lista vazia', detail: `${lista.length} valor(es) ordenado(s) em ordem crescente.` }; } },
    contagem: { title: 'Contagem de inteiros', category: 'ANÁLISE DE DADOS', glyph: '∑', description: 'Conte quantos valores inteiros existem em uma lista mista.', insight: 'Valores decimais não são contados. Entradas inválidas são rejeitadas para evitar resultados incorretos.', fields: [{ id: 'lista', label: 'Lista de números', placeholder: 'Ex.: 1, 2.5, 3, 4.2, 8', example: '1, 2.5, 3, 4.2, 8' }], execute: (v) => { const lista = readList(v.lista); const n = algoritmos.contarInteiros(lista); return { value: `${n} inteiro(s)`, detail: `Foram encontrados ${n} inteiros entre ${lista.length} valores.` }; } },
    calculadora: { title: 'Calculadora', category: 'OPERAÇÕES MATEMÁTICAS', glyph: '±', description: 'Execute as quatro operações estudadas na aplicação Express da Entregável 3.', insight: 'Na Entregável 3, estas operações eram processadas por rotas POST do Express. Nesta hospedagem estática, o mesmo cálculo ocorre no navegador.', fields: [{ id: 'a', label: 'Primeiro valor', placeholder: 'Ex.: 18', example: '18', type: 'number' }, { id: 'b', label: 'Segundo valor', placeholder: 'Ex.: 6', example: '6', type: 'number' }, { id: 'operacao', label: 'Operação', example: 'soma', type: 'select', options: [['soma', 'Somar (+)'],['subtracao', 'Subtrair (−)'],['multiplicacao', 'Multiplicar (×)'],['divisao', 'Dividir (÷)']] }], execute: (v) => { const a = readNumber(v.a, 'Primeiro valor'), b = readNumber(v.b, 'Segundo valor'); const ops = { soma: (x,y)=>x+y, subtracao: (x,y)=>x-y, multiplicacao:(x,y)=>x*y, divisao:(x,y)=>x/y }; const symbols = {soma:'+',subtracao:'−',multiplicacao:'×',divisao:'÷'}; if(!Object.hasOwn(ops,v.operacao)) throw new Error('Selecione uma operação válida.'); if(v.operacao==='divisao' && b===0) throw new Error('Não é possível dividir por zero.'); const n=ops[v.operacao](a,b); if(!Number.isFinite(n)) throw new Error('O resultado está fora do limite numérico.'); return { value: formatNumber(n), detail: `${formatNumber(a)} ${symbols[v.operacao]} ${formatNumber(b)} = ${formatNumber(n)}` }; } }
  };

  function readNumber(raw, name) {
    if (!raw || !raw.trim()) throw new Error(`Preencha o campo ${name.toLowerCase()}.`);
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) throw new Error(`${name} deve ser um número válido.`);
    return parsed;
  }
  function readInteger(raw, name) {
    const n = readNumber(raw, name);
    if (!Number.isInteger(n) || !Number.isSafeInteger(n)) throw new Error(`${name} deve ser um número inteiro seguro.`);
    return n;
  }
  function readList(raw) {
    if (!raw || !raw.trim()) throw new Error('Informe pelo menos um número na lista.');
    const parts = raw.trim().split(/[,;\s]+/);
    const list = parts.map((part) => Number(part));
    if (list.some(n => !Number.isFinite(n))) throw new Error('Use apenas números separados por vírgula, espaço ou ponto e vírgula. Para decimais, use ponto: 2.5');
    if (list.length > 2000) throw new Error('Use até 2.000 valores por execução.');
    return list;
  }
  function formatNumber(value) {
    return String(value);
  }

  let current = 'primo';
  let history = [];
  try { const saved = JSON.parse(localStorage.getItem(historyKey) || '[]'); if (Array.isArray(saved)) history = saved.slice(0,6).filter(x => x && typeof x.title==='string' && typeof x.value==='string'); } catch { /* armazenamento opcional */ }

  function renderFields(config) {
    const wrapper = $('fields'); wrapper.replaceChildren();
    config.fields.forEach((field) => {
      const label = document.createElement('label'); label.className = 'field';
      const text = document.createElement('span'); text.className = 'field-label'; text.textContent = field.label;
      let control;
      if (field.type === 'select') {
        control = document.createElement('select');
        field.options.forEach(([value, title]) => { const option=document.createElement('option'); option.value=value; option.textContent=title; control.append(option); });
      } else {
        control = document.createElement('input'); control.type = field.type || 'text'; control.placeholder = field.placeholder; if (field.type === 'number') control.step = 'any';
      }
      control.id = 'input-' + field.id; control.name = field.id; control.autocomplete='off'; control.required=true; control.value = field.example;
      label.append(text, control); wrapper.append(label);
    });
  }

  function renderTool(id) {
    current=id; const config=definitions[id];
    $('active-category').textContent=config.category; $('active-title').textContent=config.title;
    $('active-description').textContent=config.description; $('active-insight').textContent=config.insight;
    $('workspace-glyph').textContent=config.glyph;
    document.querySelectorAll('[data-alg]').forEach((btn) => { const active=btn.dataset.alg===id; btn.classList.toggle('active',active); btn.setAttribute('aria-pressed',String(active)); });
    renderFields(config); clearOutput();
  }
  function clearOutput() {
    $('output-result').hidden=true; $('output-placeholder').hidden=false;
    $('output-placeholder').querySelector('p').textContent='Seu resultado aparecerá aqui após a execução.';
    $('console-output').classList.remove('error-output'); $('output-state').textContent='AGUARDANDO';
  }
  function showOutput(value, detail, error=false) {
    $('output-placeholder').hidden=true; $('output-result').hidden=false;
    $('output-caption').textContent=error?'ERRO DE VALIDAÇÃO':'RESULTADO';
    $('output-value').textContent=value; $('output-detail').textContent=detail;
    $('output-state').textContent=error?'ERRO':'CONCLUÍDO';
    $('console-output').classList.toggle('error-output',error);
  }
  function saveHistory(entry) {
    history.unshift(entry); history=history.slice(0,6);
    try { localStorage.setItem(historyKey,JSON.stringify(history)); } catch { /* armazenamento opcional */ }
    renderHistory();
  }
  function renderHistory() {
    const list=$('history-list'); list.replaceChildren();
    if (!history.length) { const empty=document.createElement('li');empty.className='history-empty';empty.textContent='Você ainda não executou nenhum algoritmo.';list.append(empty);return; }
    for (const item of history) {
      const li=document.createElement('li'); li.className='history-item';
      const name=document.createElement('strong');name.textContent=item.title;
      const result=document.createElement('span');result.textContent=item.value;
      const date=document.createElement('time');date.textContent=item.time;
      li.append(name,result,date);list.append(li);
    }
  }

  document.querySelectorAll('[data-alg]').forEach(btn => btn.addEventListener('click',()=>renderTool(btn.dataset.alg)));
  $('algorithm-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const config=definitions[current]; const fields={};
    config.fields.forEach(field=>{fields[field.id]=$('input-'+field.id).value;});
    try {
      const output=config.execute(fields);
      showOutput(output.value,output.detail);
      saveHistory({title:config.title,value:String(output.value).slice(0,100),time:new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit'}).format(new Date())});
    } catch(error) {showOutput('Não foi possível executar',error instanceof Error?error.message:'Verifique os dados informados.',true);}
  });
  $('example-button').addEventListener('click',()=>{definitions[current].fields.forEach(field=>{$('input-'+field.id).value=field.example;});$('algorithm-form').requestSubmit();});
  $('clear-history').addEventListener('click',()=>{history=[];try{localStorage.removeItem(historyKey);}catch{/* armazenamento opcional */}renderHistory();});

  if (!algoritmos) {showOutput('Algoritmos indisponíveis','Execute npm run build para gerar o arquivo do navegador.',true);}
  renderTool('primo'); renderHistory();
})();
