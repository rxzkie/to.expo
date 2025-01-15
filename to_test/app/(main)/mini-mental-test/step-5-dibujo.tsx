import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setAnswer } from '@/store/slices/miniMentalTestSlice';

export default function Step5Dibujo() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [dibujo, setDibujo] = useState('');

  const handleFinish = () => {
    dispatch(
      setAnswer({
        question: 'Dibujo/Copia de figuras',
        answer: dibujo,
      })
    );
    router.push('/(main)/mini-mental-test/hoja-de-respuestas');
  };

  return (
    <View>
      <Text className="text-xl font-bold mb-2">Paso 5: Dibujo/Copia</Text>

      <Text className="mb-1">
        Indica si el paciente pudo copiar un pentágono, triángulo, etc.
      </Text>
      <TextInput
        placeholder="Descripción..."
        value={dibujo}
        onChangeText={setDibujo}
        className="border border-gray-300 mb-4 p-2 rounded"
      />

      <TouchableOpacity
        className="bg-green-500 p-3 rounded mt-4"
        onPress={handleFinish}
      >
        <Text className="text-white text-center">Finalizar Test</Text>
      </TouchableOpacity>
    </View>
  );
}
