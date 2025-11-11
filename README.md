# Catálogo Avançado de Usuários (Aluno: Luiz Eduardo Paiva Ribeiro)

Projeto de exercício — React + Vite que consome a API JSONPlaceholder.

## Executando localmente

1. Instale dependências:
   ```
   npm install
   ```

2. Rode em desenvolvimento:
   ```
   npm run dev
   ```

3. Acesse em `http://localhost:5173/` (porta padrão do Vite).

## Funcionalidades
- Listagem de usuários (Nome, E-mail, Cidade)
- Busca em tempo real por nome/e-mail
- Filtro por cidade (dinâmico)
- Contagem de exibição
- Página de detalhes `/usuario/:id` com posts do usuário (modal para ver conteúdo)
- Tratamento de erros e opção de tentar novamente
- Paginacão (5 por página)
- Persistência do último filtro em localStorage
- Extra: resumo do número total de posts por usuário (obtido a partir de /posts)

## Observações
- Feito por: **Luiz Eduardo Paiva Ribeiro**
- Tecnologias: React, React Router v6, Fetch API, Vite, CSS simples.