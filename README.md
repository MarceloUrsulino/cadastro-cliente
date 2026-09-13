# Cadastro de Clientes - API

API REST para cadastro de clientes com preenchimento automático de endereço a partir do CEP, utilizando a integração com a API pública do ViaCEP.

## Funcionalidades

- Cadastro de cliente (POST) com busca automática de endereço via CEP
- Listagem de todos os clientes (GET)
- Atualização parcial de cliente (PUT) — envia apenas os campos que deseja alterar
- Exclusão de cliente (DELETE)
- Validação de campos obrigatórios
- Validação de e-mail duplicado
- Validação de formato de CEP
- Tratamento de erros de integração externa (CEP inválido ou inexistente)

## Tecnologias utilizadas

- Node.js
- Express
- Sequelize
- MySQL
- Axios (consumo da API ViaCEP)
- Dotenv

## Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/MarceloUrsulino/cadastro-cliente.git
```

2. Acesse a pasta do projeto:
```bash
cd cadastro-cliente/backend
```

3. Instale as dependências:
```bash
npm install
```

4. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
DB_NAME=cadastrocliente
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
```

5. Crie o banco de dados no MySQL com o mesmo nome definido em `DB_NAME`.

6. Rode o projeto:
```bash
npx nodemon index.js
```

O servidor sobe por padrão em `http://localhost:3000`.

## Endpoints da API

### Criar cliente
```
POST /cliente
```
Body:
```json
{
  "nome": "João Silva",
  "email": "joao@teste.com",
  "cep": "01310-100",
  "numero": 123,
  "complemento": "Apto 45"
}
```
Os campos `rua`, `bairro`, `cidade` e `estado` são preenchidos automaticamente pela API do ViaCEP a partir do CEP informado.

### Listar clientes
```
GET /clientes
```

### Atualizar cliente (parcial)
```
PUT /atualizar/cliente/:id
```
Body (envie apenas os campos que deseja alterar):
```json
{
  "numero": 456
}
```

### Excluir cliente
```
DELETE /excluir/cliente/:id
```

## Marcelo Ursulino
- [GitHub](https://github.com/MarceloUrsulino)
- [LinkedIn](https://linkedin.com/in/marceloursulino)
