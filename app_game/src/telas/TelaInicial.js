import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';

import {
  fetchJogos,
  adicionarJogo,
  deletarJogo,
  atualizarJogo,
} from '../servicos/api';

export default function TelaInicial() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [jogos, setJogos] = useState([]);
  const [editandoJogo, setEditandoJogo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    carregarJogos();
  }, []);

  async function carregarJogos() {
    try {
      setRefreshing(true);
      const dados = await fetchJogos();
      setJogos(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os jogos.');
    } finally {
      setRefreshing(false);
    }
  }

  async function adicionarOuAtualizarJogo() {
    if (!nome.trim() || !data.trim() || !imagemUrl.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const novoJogo = {
      nome: nome.trim(),
      data: data.trim(),
      imagem: imagemUrl.trim(),
    };

    try {
      if (editandoJogo) {
        await atualizarJogo(editandoJogo.id, novoJogo);
        setEditandoJogo(null);
      } else {
        await adicionarJogo(novoJogo);
      }

      await carregarJogos();

      setNome('');
      setData('');
      setImagemUrl('');
      setModalVisivel(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o jogo.');
    }
  }

  function cancelarEdicao() {
    setNome('');
    setData('');
    setImagemUrl('');
    setEditandoJogo(null);
    setModalVisivel(false);
  }

  async function deletarJogoHandler(id) {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja deletar este jogo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletarJogo(id);
              await carregarJogos();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível deletar o jogo.');
            }
          },
        },
      ]
    );
  }

  function iniciarEdicao(jogo) {
    setNome(jogo.nome);
    setData(jogo.data);
    setImagemUrl(jogo.imagem);
    setEditandoJogo(jogo);
    setModalVisivel(true);
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
      </View>

      <FlatList
        data={jogos}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        onRefresh={carregarJogos}
        refreshing={refreshing}
        ListEmptyComponent={
          <Text style={styles.semJogos}>Nenhum jogo encontrado.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Image
              source={{
                uri:
                  item.imagem ||
                  'https://via.placeholder.com/400x400?text=Sem+Imagem',
              }}
              style={styles.imagem}
            />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.data}>{item.data}</Text>
            </View>
            <View style={styles.icones}>
              <TouchableOpacity
                onPress={() => iniciarEdicao(item)}
                style={{ marginRight: 15 }}
              >
                <Image
                  source={require('../assets/editar.png')}
                  style={styles.iconeAcao}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarJogoHandler(item.id)}>
                <Image
                  source={require('../assets/deletar.png')}
                  style={styles.iconeAcao}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.barraInferior}>
        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <Image
            source={require('../assets/mais.png')}
            style={styles.iconeBarra}
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={cancelarEdicao}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>
              {editandoJogo ? 'Editar jogo' : 'Adicionar jogo'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do Jogo"
              placeholderTextColor="#AAA"
              value={nome}
              onChangeText={setNome}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Data"
              placeholderTextColor="#AAA"
              value={data}
              onChangeText={setData}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="URL da Imagem"
              placeholderTextColor="#AAA"
              value={imagemUrl}
              onChangeText={setImagemUrl}
              autoCorrect={false}
              autoCapitalize="none"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelarEdicao}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addButton}
                onPress={adicionarOuAtualizarJogo}
              >
                <Text style={styles.buttonText}>
                  {editandoJogo ? 'Salvar' : 'Adicionar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1726',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#fff',
  },
  cartao: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    elevation: 4,
  },
  imagem: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  info: {
    marginBottom: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 14,
    color: '#333',
  },
  icones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconeAcao: {
    width: 24,
    height: 24,
  },
  barraInferior: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    backgroundColor: '#1B1726',
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  iconeBarra: {
    width: 30,
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: '#1C1B29',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  input: {
    backgroundColor: '#2E2C3A',
    color: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2E2C3A',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#5D5A88',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#5D5A88',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logo: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  semJogos: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});
