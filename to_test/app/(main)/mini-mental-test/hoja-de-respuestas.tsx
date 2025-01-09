import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useRouter } from 'expo-router';

export default function HojaDeRespuestas() {
  const answers = useSelector((state: RootState) => state.test.answers);
  const router = useRouter();

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Respuestas del Test</Text>
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded"
          onPress={() => router.back()}
        >
          <Text className="text-white text-center">Volver</Text>
        </TouchableOpacity>
      </View>

      {Object.entries(answers).map(([question, answer], index) => (
        <View key={index} className="mb-4">
          <Text className="font-bold">{`${index + 1}. ${question}`}</Text>
          <Text className="text-gray-700 ml-2">{`Respuesta: ${answer || 'No respondida'}`}</Text>
        </View>
      ))}

      <TouchableOpacity
        className="bg-green-500 p-4 rounded mt-4"
        onPress={() => router.push('/')} // Volver al inicio
      >
        <Text className="text-white text-center">Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}
