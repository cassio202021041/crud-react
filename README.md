# crud-react
CRUD REACT 
Criação de crud com bd relacional
insira os dado abaixo no gerenciador de banco de dados 

create database crudreact

use crudreact

create table produtos(
id int Primary Key auto_increment,
nomeProduto char(80),
valor decimal,
dataVenda date
);

cloana o projeto 
extrair projeto

no terminal  e nos diretórios a segui digite os comando a seguir

# istalar node module no diretorio cliente
entrar na pasta cliente de dar o comamdo npm i;

# istalar node module no diretorio server
entrar na pasta server de dar o comamdo npm i;

# inicia o server na porta (http://localhost:3001/)
entrar na pasta server de dar o comamdo npm init;

# inicia o client na porta http://localhost:3000/
entrar na pasta cliente de dar o comamdo npm start;