import React from 'react';
import NavegacaoApp from './src/navegacao/NavegacaoApp';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <NavegacaoApp />
    </PaperProvider>
  );
}
