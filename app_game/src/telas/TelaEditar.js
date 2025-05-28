import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from 'react-native';

import { atualizarJogo } from '../servicos/api';

export default function TelaEditar({ route, navigation }) {
  const { jogo } = route.params;

  const [nome, setNome] = useState(jogo.nome);
  const [data, setData] = useState(jogo.data);
  const [imagem, setImagem] = useState(jogo.imagem);

  async function salvarAlteracoes() {
    if (!nome || !data || !imagem) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const jogoAtualizado = {
      nome,
      data,
      imagem,
    };

    try {
      await atualizarJogo(jogo.id, jogoAtualizado);
      Alert.alert('Sucesso', 'Jogo atualizado com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o jogo');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Jogo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Jogo"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        value={imagem}
        onChangeText={setImagem}
      />

      <TouchableOpacity style={styles.botao} onPress={salvarAlteracoes}>
        <Text style={styles.textoBotao}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1B1726',
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2E2C3A',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#5D5A88',
    padding: 15,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
