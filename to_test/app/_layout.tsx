import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Slot } from "expo-router";
import "../global.css"; // Asegúrate de importar correctamente el archivo global.css

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
