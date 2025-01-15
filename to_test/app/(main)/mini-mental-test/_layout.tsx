import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Slot, usePathname, useRouter } from 'expo-router';

/** Lista de pasos */
const steps = [
  { route: '/(main)/mini-mental-test/step-1-orientacion', label: 'Paso 1' },
  { route: '/(main)/mini-mental-test/step-2-memoria', label: 'Paso 2' },
  { route: '/(main)/mini-mental-test/step-3-atencion', label: 'Paso 3' },
  { route: '/(main)/mini-mental-test/step-4-lenguaje', label: 'Paso 4' },
  { route: '/(main)/mini-mental-test/step-5-dibujo', label: 'Paso 5' },
];

export default function MiniMentalTestLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Encuentra el índice del paso actual basado en la ruta
  const currentIndex = steps.findIndex(step => step.route === pathname);

  const navigateToStep = (route: string) => {
    router.push(route as any); // Forzamos el tipo si es necesario
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Encabezado */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-gray-800">Mini-Mental Test</Text>
        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded"
          onPress={() => router.back()}
        >
          <Text className="text-white font-medium">Volver</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de Progreso */}
      <View className="flex-row justify-center items-center mb-4">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToStep(step.route)}
              className={`mx-1 p-2 w-10 h-10 rounded-full flex items-center justify-center ${
                isActive ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <Text className="text-white font-bold">{index + 1}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Renderiza el contenido del paso actual */}
      <Slot />
    </View>
  );
}
