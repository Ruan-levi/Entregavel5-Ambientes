# Entregável 6: estrutura própria, sem duplicar o jogo

A Entregável 6 continua utilizando o CONQUEST da Entregável 5 e adiciona apenas a documentação e os ambientes solicitados.

- **Portal navegável:** `public/entregavel6/index.html`, publicado em [GitHub Pages](https://ruan-levi.github.io/Entregavel5-Ambientes/entregavel6/).
- **Testes ponta a ponta:** `tests/test_browser.py`, executados em Chrome/Selenium.
- **Configuração do Selenium:** `requirements.txt`.
- **Prints de teste:** `evidencias/*.png` são gerados pelo workflow, **não** versionados no Git.
- **CI:** `.github/workflows/selenium.yml` na raiz.
- **Gestão:** [GitHub Issues](https://github.com/Ruan-levi/Entregavel5-Ambientes/issues).
- **Protótipo:** [Figma](https://www.figma.com/design/Gir9pqcDf92GYOmacmwmfO).
- **IDE:** [VS Code](../.vscode).
- **Banco:** [Migrações Nhost](../nhost/migrations).
- **Documentação detalhada:** [ENTREGAVEL6.md](../docs/ENTREGAVEL6.md), [Arquitetura](../docs/ARQUITETURA_E6.md) e [Testes](../docs/PLANO_TESTES_E6.md).

O jogo não foi copiado novamente para evitar dois motores 3D divergentes. O frontend 3D permanece no diretório `src/` compartilhado pelas Entregáveis 5 e 6. O CONQUEST Nuvem original não foi modificado.
