# Meli Backend

Este projeto é uma API backend para interagir com a API do Mercado Livre (Meli). Ele é desenvolvido com Node.js e Express e utiliza Axios para fazer chamadas à API externa.

## Descrição

A API backend fornece endpoints para buscar itens, obter detalhes de um item e buscar categorias de itens no Mercado Livre. 

## Requisitos

- Node.js
- npm ou yarn

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/SVasconcellos-yssy/meli-back.git
   ```

2. Navegue até o diretório do projeto:
    ```bash 
        cd meli-backend
    ```
3. Intale as ddependências:
     ```bash 
        npm install
    ```
4. Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
    ```makefile
    BASE_API_MELI=<URL_DA_API_MERCADO_LIVRE>
    PORT=5000
    ALLOWED_ORIGIN=<URL_DE_ORIGEM_PERMITIDA>
    ```

## Scripts 

1. Iniciar o servidor 
     ```bash 
        npm start
    ```
## Endpoints

### 1. Obter Detalhes de um Item

- **URL:** `/api/items/:id`
- **Método:** GET
- **Parâmetros de URL:**
  - `id`: ID do item para obter detalhes.
- **Resposta de Sucesso:**
  - **Código HTTP:** 200
  - **Corpo:** Detalhes do item.
- **Resposta de Erro:**
  - **Código HTTP:** 500
  - **Corpo:** Mensagem de erro.

### 2. Buscar Itens

- **URL:** `/api/items`
- **Método:** GET
- **Parâmetros de Query:**
  - `q`: Termo de pesquisa para buscar itens.
- **Resposta de Sucesso:**
  - **Código HTTP:** 200
  - **Corpo:** Resultados da busca.
- **Resposta de Erro:**
  - **Código HTTP:** 500
  - **Corpo:** Mensagem de erro.

### 3. Buscar Categoria

- **URL:** `/api/items/category/:id`
- **Método:** GET
- **Parâmetros de URL:**
  - `id`: ID do item para buscar a categoria.
- **Resposta de Sucesso:**
  - **Código HTTP:** 200
  - **Corpo:** Categoria do item.
- **Resposta de Erro:**
  - **Código HTTP:** 500
  - **Corpo:** Mensagem de erro.



    