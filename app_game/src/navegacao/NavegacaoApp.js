import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaInicial from "../telas/TelaInicial";
import TelaAdicionar from "../telas/TelaAdicionar";
import TelaEditar from "../telas/TelaEditar";

const Stack = createNativeStackNavigator();

export default function NavegacaoApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Camisas"
          component={TelaInicial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Editar"
          component={TelaEditar}
          options={{ title: "Editar Camisa" }}
        />
        <Stack.Screen
          name="Adicionar"
          component={TelaAdicionar}
          options={{ title: "Adicionar Camisa" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
