## Desafio Back end Brisalabs :computer:

- O desafio consiste no desenvolvimento de uma API REST utilizando as tecnologias listadas abaixo.
- Caso não termine desenvolver todo o desafio, envia o que conseguir que nós avaliaremos com muito prazer.
- Crie um repositório público no GitHub e envie o link para o e-mail `deusimardamiao@grupobrisanet.com.br` com assunto `Desafio Back end Brisalabs`.

## Tecnologias :rocket:

  - [NestJS](https://nestjs.com/) ou [Express](https://expressjs.com/pt-br/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Typeorm](https://typeorm.io/#/)
  - [Postgres](https://www.postgresql.org/)
  - [Insomnia](https://insomnia.rest/)
  - REST

## Sobre o desafio :pushpin:
- O desafio consiste em desenvolver uma API REST para o sistema de transações do BrisaPIX.

- **Básico**
  - O sistema deve ser capaz de estabelecar uma conexão com um banco de dados Postgres.
  - O sistema deve ser capaz de lidar com requisições com formato de dados do tipo `JSON`.
  - O sistema deve ser capaz de cadastrar usuários.
  - O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.

- **Intermediário**
 
  - O sistema deve ser capaz de cadastrar chaves de PIX para os usuários já cadastrados.
  - Uma chave não poderá ser cadastrada mais de uma vez.
  - Cada usuário poderá ter no máximo 3 chaves.
  - O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.

- **Avançado**

  - O sistema deve ser capaz de realizar transações PIX.
  - Cada transação deve ser identificada de forma única por um id.
  - Cada transação deve conter a identificação do usuário que envia e do usuário que recebe o PIX, além do valor, claro.
  - O sistema deve ser capaz de persistir essas informações em um banco de dados relacional.

- **Bonus**
  - Adicionar um `docker-compose` e um `Dockerfile`.
  - Disponibilizar no repositório o arquivo JSON referente às rotas da aplicação.
  - Adicionar testes unitários.
  - Adicionar tratação de erros de maneira global.

## Entidades :pencil2:
  - Usuários
    - O usuário deve possuir nome (nome do usuário), telefone (telefone do usuário) e um id.
  - Chaves.
    - A entidade chaves deve possuir um valor (referente a chave a ser salva), id e a relação com o usuário dono da chave.
  - Transações.
    - A transação deve possuir um valor (referente ao valor em R$ da transação), relação com quem envia e quem recebe o PIX (usuário que envia e usuário que recebe o PIX) e um id.

## Critérios de avaliação :memo:
- Arquitetura
- Clean code
- Clareza
- Ausência de bugs

## Original Repo: https://github.com/brisalabs/challenge-back-end

The insomania json file `Insomnia_2021-03-12.json`

## Common:
- Set up the .env files according to example files

## How To Execute Tests:
- First you need to put up the database for testing and development enviromnent: `docker-compose -f docker-compose.dev.yml up -d --build` (the same for dev enviromnent)
- Second you need to run `yarn` and `yarn test`

## How to Put Up the Development Enviromnent (Only database on Docker Container, api runing on host):
- First you need to put up the database for testing and development enviromnent: `docker-compose -f docker-compose.dev.yml up -d --build`
- Second you need to run `yarn` and `yarn dev`

## How to Put Up the Production Environment (Database and API runing on docker containers):
- First: `docker-compose up -d --build`