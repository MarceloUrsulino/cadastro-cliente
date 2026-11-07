# Cadastro de Clientes 

API REST para cadastro de clientes com preenchimento automático de endereço a partir do CEP, utilizando a API pública do [ViaCEP](https://viacep.com.br/).

## Funcionalidades

- Cadastro de cliente com busca automática de endereço via CEP
- Listagem de todos os clientes
- Atualização parcial de cliente (envie apenas os campos que deseja alterar)
- Exclusão de cliente
- Validação de campos obrigatórios
- Validação de e-mail duplicado
- Validação do formato do CEP (8 dígitos)
- Tratamento de erros da integração externa: CEP inválido, CEP inexistente e falha na consulta

## Tecnologias utilizadas

- Node.js
- Express
- Sequelize (ORM)
- MySQL
- Axios (consumo da API ViaCEP)
- Dotenv

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [MySQL](https://www.mysql.com/) instalado e em execução

## Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/MarceloUrsulino/cadastro-cliente.git
```

2. Acesse a pasta do backend:

```bash
cd cadastro-cliente/backend
```

3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env` dentro da pasta `backend` com as seguintes variáveis:

```env
DB_NAME=cadastrocliente
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
PORT=3000
```

> A variável `PORT` é opcional. Se não for definida, o servidor usa a porta 3000.

5. Crie o banco de dados no MySQL com o mesmo nome definido em `DB_NAME`. As tabelas são criadas automaticamente ao iniciar o servidor.

6. Inicie o servidor:

```bash
# desenvolvimento (reinicia automaticamente ao salvar)
npm run dev

# ou, para rodar normalmente
npm start
```

O servidor sobe em `http://localhost:3000`.

## Endpoints da API

| Método | Rota            | Descrição                                |
| ------ | --------------- | ---------------------------------------- |
| POST   | `/clientes`     | Cadastra um cliente                      |
| GET    | `/clientes`     | Lista todos os clientes                  |
| PUT    | `/clientes/:id` | Atualiza um cliente (parcial)            |
| DELETE | `/clientes/:id` | Exclui um cliente                        |

### Cadastrar cliente

`POST /clientes`

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

Os campos `rua`, `bairro`, `cidade` e `estado` são preenchidos automaticamente pelo ViaCEP a partir do CEP informado. O campo `complemento` é opcional.

Resposta de sucesso (`201`):

```json
{
  "message": "Cadastro criado."
}
```

### Listar clientes

`GET /clientes`

Retorna a lista de clientes cadastrados (`200`).

### Atualizar cliente

`PUT /clientes/:id`

Envie apenas os campos que deseja alterar:

```json
{
  "numero": 456
}
```

Resposta de sucesso (`200`):

```json
{
  "message": "Cadastro atualizado."
}
```

### Excluir cliente

`DELETE /clientes/:id`

Resposta de sucesso (`200`):

```json
{
  "message": "O cadastro foi excluído."
}
```

## Respostas de erro

| Status | Situação                                                                 |
| ------ | ------------------------------------------------------------------------ |
| 422    | Campo obrigatório não preenchido                                         |
| 409    | E-mail já cadastrado                                                     |
| 422    | Cliente não encontrado (atualização e exclusão)                          |
| 400    | CEP com formato inválido (diferente de 8 dígitos)                        |
| 400    | CEP não encontrado no ViaCEP                                             |
| 400    | Falha na consulta ao ViaCEP                                              |
| 500    | Erro interno ao cadastrar, listar, atualizar ou excluir                  |

## Autor

**Marcelo Ursulino**

- [GitHub](https://github.com/MarceloUrsulino)
- [LinkedIn](https://linkedin.com/in/marceloursulino)
