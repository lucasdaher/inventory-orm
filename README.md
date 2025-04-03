# Gerenciador de Inventário com ORM

Este é um sistema de gerenciamento de inventário desenvolvido com TypeScript e TypeORM, utilizando MySQL como banco de dados.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL Server
- Yarn (gerenciador de pacotes)

## Instalação do Yarn

### Windows
1. Abra o PowerShell como administrador
2. Execute o seguinte comando:
```bash
npm install -g yarn
```

### macOS
1. Abra o Terminal
2. Execute o seguinte comando:
```bash
npm install -g yarn
```

## Configuração do Projeto

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd orm
```

2. Instale as dependências:
```bash
yarn install
```

3. Configure o banco de dados:
   - Crie um banco de dados MySQL chamado `inventario_db`
   - Ou execute o script `database.sql` fornecido no projeto

4. Configure as credenciais do banco de dados:
   - Abra o arquivo `src/data-source.ts`
   - Ajuste as configurações de conexão conforme necessário:
     ```typescript
     host: "localhost",
     port: 3306,
     username: "seu_usuario",
     password: "sua_senha",
     ```

## Executando o Projeto

### Modo Desenvolvimento
```bash
yarn dev
```

### Modo Produção
1. Compile o projeto:
```bash
yarn build
```

2. Execute o projeto:
```bash
yarn start
```

## Funcionalidades

- Gerenciamento de Categorias
  - Criar categoria
  - Listar categorias
  - Buscar categoria
  - Atualizar categoria
  - Remover categoria

- Gerenciamento de Produtos
  - Criar produto
  - Listar produtos
  - Buscar produto
  - Atualizar produto
  - Remover produto

## Estrutura do Projeto

```
src/
├── entities/         # Entidades do banco de dados
├── services/         # Serviços de negócio
├── data-source.ts    # Configuração do TypeORM
└── index.ts          # Ponto de entrada da aplicação
```

## Tecnologias Utilizadas

- TypeScript
- TypeORM
- MySQL
- Node.js
- Yarn
