// Importe os módulos e componentes necessários.
import './App.css';
import React, { useState } from 'react';
import Axios from "axios";
import ListaProdutos from "./components/listar/listar";

// Defina o componente CadastroProduto.
function CadastroProduto() {
  // Defina os estados iniciais para 'values', 'nomeProduto' e 'valor'.
  const [values, setValues] = useState({ nomeProduto: '', valor: '', dataVenda: ''});
  const [nomeProduto, setNomeProduto] = useState('');
  const [valor, setValor] = useState('');
  const [dataVenda, setDataVenda] = useState('');
  
  // Exiba no console os valores do estado 'values'.
  console.log(values);

  // Função para manipular a mudança nos campos de entrada e atualizar o estado 'values'.
  const handleChangeValues = (value) => {
    setDataVenda(value.target.value);
    // Use a função de atualização do estado para garantir que os valores antigos sejam preservados.
    setValues(prevValue => ({
      ...prevValue, // Mantém os valores antigos do objeto.
      [value.target.name]: value.target.value, // Atualiza o campo correspondente com o novo valor.
    }))
  };
   // Função para salvar a data e fazer algo com ela (por exemplo, enviar para um servidor)
   const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para salvar os dados
    console.log('Data da Venda:', dataVenda);
  };

  // Função para lidar com o clique no botão de cadastro.
  const handleClickButton = () => {
    // Faça uma solicitação POST para a URL especificada com os dados do produto.
    Axios.post("http://localhost:3001/register", {
      nomeProduto: values.nomeProduto,
      valor: values.valor
    }).then((response) => {
      console.log(response); // Exiba a resposta da solicitação no console.
    })
  }

  // Renderize o formulário de cadastro de produto.
  return (
    
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Cadastro de Produto</h2>
          <form onSubmit={handleClickButton}>
            <div className="form-group">
              <label htmlFor="nomeProduto">NomeProduto:</label>
              <input
                type="text"
                className="form-control"
                id="nomeProduto"
                name='nomeProduto'
                onChange={handleChangeValues}
              />
            </div>
            <div className="form-group">
              <label htmlFor="valor">Valor:</label>
              <input
                type="text"
                name='valor'
                className="form-control"
                id="valor"
                onChange={handleChangeValues}
              />
            </div>
            <div className="form-group">
            <label htmlFor="dataVenda">Data da Venda:</label>
          <input
            type='text'
            name='dataVenda'
            className='form-control'
            id='dataVenda'
            value={dataVenda}
            onChange={handleChangeValues}
          />
            </div>
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
      
      {/* Renderize o componente ListaProdutos para exibir a lista de produtos cadastrados. */}
      <ListaProdutos/>
    </div>
    
  );
  
}


// Exporte o componente CadastroProduto para uso em outros lugares.
export default CadastroProduto;

