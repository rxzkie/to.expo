import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { useRouter } from 'expo-router';
import { resetTest } from '@/store/slices/miniMentalTestSlice';

export default function HojaDeRespuestas() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const answers = useSelector((state: RootState) => state.test.answers);

  const handleFinish = () => {
    // Si deseas limpiar el test para un nuevo intento
    dispatch(resetTest());
    router.push('/');
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Hoja de Respuestas</Text>

      {/* Lista de todas las respuestas */}
      {Object.entries(answers).map(([question, answer], index) => (
        <View key={index} className="mb-4">
          <Text className="font-bold">{`${index + 1}. ${question}`}</Text>
          <Text className="ml-2 text-gray-700">
            Respuesta: {answer || 'No respondida'}
          </Text>
        </View>
      ))}

      <TouchableOpacity
        className="bg-green-500 p-4 rounded"
        onPress={handleFinish}
      >
        <Text className="text-white text-center">Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}
