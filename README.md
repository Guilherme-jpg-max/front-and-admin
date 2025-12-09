# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Instalar todas as dependências (se ainda não instalou)

npm install

# Rodar em modo desenvolvimento

npm run dev

```

O projeto vai abrir em `http://localhost:5173`

## **PASSO 20: Testar o Backoffice**

### **Login:**
- URL: `http://localhost:5173/login`
- Use QUALQUER email e senha (está em modo mock)
- Exemplo: `admin@test.com` / `123456`

### **Funcionalidades para testar:**

1. **Dashboard** (`/`):
   - Ver estatísticas
   - Ver pedidos recentes
   - Clicar em um pedido para ver detalhes

2. **Produtos** (`/products`):
   - ✅ Listar todos os produtos
   - ✅ Buscar produtos
   - ✅ Criar novo produto
   - ✅ Editar produto existente
   - ✅ Excluir produto

3. **Pedidos** (`/orders`):
   - ✅ Listar pedidos
   - ✅ Filtrar por status
   - ✅ Ver detalhes do pedido
   - ✅ Atualizar status do pedido

4. **Configurações** (`/settings`):
   - Editar informações da empresa
   - Toggle de notificações

## **RESUMO DO QUE FOI CRIADO:**
```

✅ Projeto React + TypeScript + Vite
✅ Tailwind CSS configurado
✅ React Router com rotas protegidas
✅ Sistema de autenticação mock
✅ CRUD completo de Produtos (mockado)
✅ Gerenciamento de Pedidos (mockado)
✅ Dashboard com estatísticas
✅ Componentes reutilizáveis (Button, Input, Modal, etc)
✅ Notificações com toast
✅ Layout responsivo (mobile e desktop)
✅ Sidebar com navegação
✅ Formatação de moeda e datas
✅ TypeScript com tipagem completa

# SuperMercado Admin - Backoffice

Painel administrativo para gerenciamento de supermercado online.

## 🚀 Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Hot Toast
- Lucide React (ícones)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🔐 Login (Mock)

Use qualquer email e senha para entrar. Exemplos:

- Email: `admin@supermercado.com`
- Senha: `qualquer_senha`

## 📱 Funcionalidades

### ✅ Implementado (com dados mockados)

- **Dashboard**

  - Estatísticas em tempo real
  - Vendas do dia
  - Pedidos pendentes
  - Produtos em estoque
  - Lista de pedidos recentes

- **Produtos**

  - Listar todos os produtos
  - Buscar produtos
  - Adicionar novo produto
  - Editar produto existente
  - Excluir produto
  - Visualizar estoque

- **Pedidos**

  - Listar todos os pedidos
  - Filtrar por status
  - Visualizar detalhes do pedido
  - Atualizar status do pedido
  - Ver histórico de itens

- **Configurações**
  - Dados da empresa
  - Notificações
  - Preferências do sistema

### 🔄 Em desenvolvimento

- Clientes
- Promoções
- Relatórios
- Integração com API real

## 🗂️ Estrutura do Projeto

```
src/
├── components/
│   ├── common/           # Componentes reutilizáveis
│   ├── dashboard/        # Componentes do dashboard
│   ├── layout/           # Layout e navegação
│   ├── orders/           # Componentes de pedidos
│   └── products/         # Componentes de produtos
├── pages/                # Páginas da aplicação
├── services/             # Serviços e API mockada
├── types/                # Tipos TypeScript
├── utils/                # Utilitários (formatters, constants)
└── App.tsx               # Componente principal
```

## 🔌 Preparação para API Real

Quando a API estiver pronta:

1. Atualize a variável de ambiente:

```env
VITE_API_URL=https://sua-api.com/api
```

2. Substitua `src/services/mockApi.ts` por chamadas reais usando axios

3. Os tipos TypeScript já estão prontos para integração

## 📝 Scripts Úteis

```bash
# Desenvolvimento
npm run dev

# Linter (se configurado)
npm run lint

# Type checking
npx tsc --noEmit

# Build
npm run build
```

## 🎨 Personalização

### Cores do Tailwind

Edite `tailwind.config.js` para personalizar as cores do tema.

### Logo

Substitua o logo em `src/assets/` e atualize o Sidebar.

## 📄 Licença

Projeto privado - Todos os direitos reservados

```

## **PASSO 25: Criar arquivo .gitignore**

**`.gitignore`**:
```

# Dependências

node_modules/
/.pnp
.pnp.js

# Produção

/dist
/build

# Ambiente

.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs

npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log\*

# Editor

.vscode/
.idea/
_.swp
_.swo
\*~

# OS

.DS_Store
Thumbs.db

# Testes

coverage/
.nyc_output/

# Outros

\*.log
.cache/
