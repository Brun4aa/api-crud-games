# api-crud-games

# 🎮 MyGameList - Coleção de Jogos (Mobile App & API)

Este é um projeto que consiste em um aplicativo mobile desenvolvido com React Native (Expo) e uma API com SpringBoot para gerenciar uma coleção de jogos. O aplicativo permite visualizar, adicionar, editar, e excluir jogos, com uma interface de usuário moderna inspirada em designs intuitivos.

## ✨ Features Principais

### Frontend (Aplicativo Mobile)
* **Listagem de Jogos:** Visualize todos os jogos em uma interface amigável com imagens, nomes e datas de lançamento.
* **Adicionar Novo Jogo:** Formulário intuitivo para incluir novos jogos na sua coleção.
* **Edição de Jogo:** Atualize os detalhes de jogos existentes.
* **Excluir Jogo:** Remova jogos da sua coleção com uma confirmação de segurança.
* **Design Moderno:** Interface escura e limpa, inspirada em designs de gerenciamento de jogos, com ícones e botões flutuantes.
* **Separação de Estilos:** Códigos de estilo organizados em arquivos separados para melhor manutenção (`gamelistStyles.js`, `gameformStyles.js`).
* **Navegação Integrada:** Utiliza `expo-router` para um roteamento eficiente entre as telas.

### Backend (API RESTful)
* **Gerenciamento de Jogos:** Endpoints para operações CRUD (Criar, Ler, Atualizar, Deletar) de jogos.
* **Persistência de Dados:** (Mysql).

## 🚀 Tecnologias Utilizadas

### Frontend
* **React Native:** Framework para desenvolvimento de aplicativos móveis.
* **Expo:** Plataforma para desenvolvimento React Native, facilitando a configuração e o build.
* **Expo Router:** Sistema de roteamento baseado em arquivos para Expo.
* **Axios:** Cliente HTTP para comunicação com a API.
* **`@expo/vector-icons` (AntDesign):** Biblioteca de ícones para uma interface rica.
* **`@react-navigation/native` (`useFocusEffect`):** Para recarregar dados quando a tela entra em foco.

### Backend
* **SpringBoot:** Ambiente de execução JavaScript.


## 📦 Estrutura do Projeto

O projeto é dividido em duas partes principais: `frontend` (o aplicativo React Native) e `api-colecao-jogos` (SpringBoot
).
