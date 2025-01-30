import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function MainHome() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      {/* Título */}
      <Text className="text-2xl font-bold mb-6">Seleccionar Test</Text>

      {/* Botón para Mini-Mental */}
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg mb-4 w-4/5"
        onPress={() => router.push('/mini-mental-test/step-1-orientacion')} // Ruta correcta para Mini-Mental
      >
        <Text className="text-white text-lg text-center">Mini-Mental</Text>
      </TouchableOpacity>

      {/* Botón para Pfeiffer */}
      <TouchableOpacity
        className="bg-green-500 p-4 rounded-lg w-4/5"
        onPress={() => router.push('/pfeiffer-test')} // Ruta correcta para Pfeiffer
      >
        <Text className="text-white text-lg text-center">Pfeiffer</Text>
      </TouchableOpacity>
    </View>
  );
}
