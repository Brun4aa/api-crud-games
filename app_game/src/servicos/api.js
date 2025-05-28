import axios from 'axios';

const API_BASE_URL = 'https://apijogos-production-0fd9.up.railway.app/';

export async function fetchJogos() {
  try {
    const response = await axios.get(`${API_BASE_URL}/jogos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    return [];
  }
}

export async function adicionarJogo(jogo) {
  try {
    const response = await axios.post(`${API_BASE_URL}/jogos`, jogo);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar jogo:', error);
    throw error;
  }
}

export async function deletarJogo(id) {
  try {
    await axios.delete(`${API_BASE_URL}/jogos/${id}`);
    return true;
  } catch (error) {
    console.error('Erro ao deletar jogo:', error);
    throw error;
  }
}

export async function atualizarJogo(id, jogoAtualizado) {
  try {
    const response = await axios.put(`${API_BASE_URL}/jogos/${id}`, jogoAtualizado);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar jogo:', error);
    throw error;
  }
}
