# CONQUEST — Entregável 5 | Ambientes de Desenvolvimento de Software

## 🎮 [JOGAR CONQUEST NA AWS](http://3.149.254.9/)

**Aplicação oficial da Entregável 5:** [CONQUEST — Vale dos Conjuntos](https://github.com/Ruan-levi/Conquest-nuvem), jogo educacional 3D de desafios de Teoria dos Conjuntos. Este repositório documenta a entrega e **reutiliza o código-fonte do repositório principal**, sem duplicá-lo. A aplicação anterior CantinaFlow foi substituída; sua versão foi preservada na branch [backup-cantinaflow-2026](../../tree/backup-cantinaflow-2026).

| Recurso | Endereço |
| --- | --- |
| **Jogar na AWS EC2** | http://3.149.254.9/ |
| **API REST e SQLite — saúde** | http://3.149.254.9/api/health |
| **Código completo e histórico Git** | https://github.com/Ruan-levi/Conquest-nuvem |
| **Implementação acadêmica** | https://github.com/Ruan-levi/Conquest-nuvem/blob/main/docs/ENTREGAVEL5.md |
| **Testes externos aprovados** | https://github.com/Ruan-levi/Conquest-nuvem/actions/runs/45266190687 |
| **CI/CD do jogo** | https://github.com/Ruan-levi/Conquest-nuvem/actions |

## Requisitos da atividade e evidências

A atividade permite jogos e exige, para equipe de duas pessoas, pelo menos duas transações por integrante. O projeto contém: HTML/CSS/JavaScript e Babylon.js no jogo, **React** no painel de progresso, **Node.js com rotas REST**, autenticação e autorização, **SQLite**, GitHub e testes formais.

**Transações demonstráveis:** cadastro de jogador, login, alteração de nome público, registro de pontuação após a campanha, consulta de histórico e encerramento de sessão. Veja a matriz de E/S e a divisão entre integrantes na [documentação da Entregável 5 do Conquest](https://github.com/Ruan-levi/Conquest-nuvem/blob/main/docs/ENTREGAVEL5.md).

O modo visitante permite jogar sem login; a função **Progresso AWS** cadastra o jogador e salva o resultado no SQLite. O ranking e os duelos Nhost do projeto original são uma integração separada, sujeitos à configuração do serviço.

## Infraestrutura AWS

Servidor Amazon EC2 `t3.micro`, região `us-east-2`; Nginx na porta 80, Node.js na porta interna 4000 e banco SQLite persistido em EBS. O CantinaFlow está com o serviço desativado e seus dados preservados no disco.

**Atenção:** a URL utiliza HTTP, sem TLS, e o IP EC2 poderá mudar se a instância for parada. Use apenas dados e senhas fictícios durante a demonstração. Instância, IPv4, armazenamento e tráfego podem consumir créditos AWS ou gerar custos conforme o plano. Não há garantia de custo zero.

## Desenvolvimento

```bash
git clone https://github.com/Ruan-levi/Conquest-nuvem.git
cd Conquest-nuvem
npm ci
npm test
npm run build
```

A documentação integral do jogo, os módulos, os testes e os scripts estão no repositório original: https://github.com/Ruan-levi/Conquest-nuvem
