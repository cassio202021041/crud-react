import React, { useState, useEffect } from 'react';
import Axios from "axios";

function ListaProdutos() {
  // Defina o estado para armazenar a lista de produtos.
  const [produtos, setProdutos] = useState([]);
  
  // Adicione o estado 'editingProduto' para rastrear o produto atualmente em edição.
  const [editingProduto, setEditingProduto] = useState(null);

  // Defina o estado para armazenar a lista de produtos.
  const [dataVenda, setDataVenda] = useState([]);

  // Adicione o estado 'editedData' para rastrear os dados editados.
  const [editedData, setEditedData] = useState({ nomeProduto: '', valor: '', dataVenda:''});

  // Use o useEffect para fazer uma solicitação GET e obter a lista de produtos.
  useEffect(() => {
    Axios.get("http://localhost:3001/listar")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Função para lidar com a exclusão de um produto.
  const handleExcluirProduto = (produtoId) => {
    Axios.delete(`http://localhost:3001/excluir/${produtoId}`)
      .then((response) => {
        // Atualize a lista de produtos após a exclusão bem-sucedida.
        setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto.id !== produtoId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Função para lidar com o clique no botão "Editar".
  const handleEditClick = (produto) => {
    // Defina o produto atualmente em edição e seus dados atuais.
    setEditingProduto(produto);
    setEditedData({ nomeProduto: produto.nomeProduto, valor: produto.valor , dataVenda: produto.dataVenda});
  };

  // Função para lidar com o clique no botão "Salvar".
  const handleSaveClick = () => {
    // Envie uma solicitação PUT para a rota de edição com os novos dados.
    Axios.put(`http://localhost:3001/editar/${editingProduto.id}`, editedData)
      .then((response) => {
        console.log(response.data);
        // Atualize a lista de produtos após a edição bem-sucedida.
        setProdutos((prevProdutos) =>
          prevProdutos.map((produto) =>
            produto.id === editingProduto.id ? { ...produto, ...editedData } : produto
          )
        );
        // Limpe os estados de edição.
        setEditingProduto(null);
        setEditedData({ nomeProduto: '', valor: '', dataVenda: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Renderize a lista de produtos e os botões de edição/exclusão.
  return (
    <div className="mt-4">
      <h2>Lista de Produtos</h2>
      <ul className="list-group">
        {produtos.map((produto, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            <div>
              <strong>Nome Produto:</strong> {produto.nomeProduto}
              <br />
              <strong>Valor:</strong> {produto.valor}
              <br />
              <strong>data Venda:</strong> {produto.dataVenda}
            </div>
            {editingProduto && editingProduto.id === produto.id ? (
              // Renderize os campos de edição quando o produto estiver em edição.
              <div>
                <input
                  type="text"
                  value={editedData.nomeProduto}
                  onChange={(e) => setEditedData({ ...editedData, nomeProduto: e.target.value })}
                />
                <input
                  type="text"
                  value={editedData.valor}
                  onChange={(e) => setEditedData({ ...editedData, valor: e.target.value })}
                />
                <input
                  type="text"
                  value={editedData.dataVenda}
                  onChange={(e) => setEditedData({ ...editedData, dataVenda: e.target.value })}
                />
                <button className="btn btn-success btn-sm" onClick={handleSaveClick}>
                  Salvar
                </button>
              </div>
            ) : (
              // Renderize os botões de edição/exclusão quando o produto não estiver em edição.
              <div>
                <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(produto)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleExcluirProduto(produto.id)}>Excluir</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProdutos;