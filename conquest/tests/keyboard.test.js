import { describe, expect, it } from 'vitest';
import { isEditableKeyboardTarget } from '../src/game/keyboard.js';

describe('Teclado do jogo e formulários React', () => {
  const target = tagName => ({ tagName, closest: selector => /input|textarea|select/.test(selector) && /^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? {} : null });
  it('não captura letras WASD ao digitar em login, cadastro e perfil', () => {
    for (const tag of ['INPUT','TEXTAREA','SELECT']) {
      expect(isEditableKeyboardTarget({target:target(tag)})).toBe(true);
    }
  });
  it('respeita regiões editáveis aninhadas', () => {
    expect(isEditableKeyboardTarget({target:{tagName:'SPAN',closest:s=>s.includes('[contenteditable]')?{}:null}})).toBe(true);
    expect(isEditableKeyboardTarget({tagName:'DIV',isContentEditable:true})).toBe(true);
  });
  it('mantém atalhos disponíveis no canvas e elementos normais', () => {
    expect(isEditableKeyboardTarget({target: {tagName:'CANVAS',closest:()=>null}})).toBe(false);
    expect(isEditableKeyboardTarget({tagName:'DIV',closest:()=>null})).toBe(false);
    expect(isEditableKeyboardTarget(null)).toBe(false);
  });
});
