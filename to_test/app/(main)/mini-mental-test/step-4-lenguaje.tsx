import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setAnswer } from '@/store/slices/miniMentalTestSlice';

export default function Step4Lenguaje() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [repeticion, setRepeticion] = useState('');
  const [comprension, setComprension] = useState('');

  const handleNext = () => {
    dispatch(setAnswer({ question: 'Repetir la frase', answer: repeticion }));
    dispatch(setAnswer({ question: 'Órdenes simples', answer: comprension }));
    router.push('/(main)/mini-mental-test/step-5-dibujo');
  };

  return (
    <View>
      <Text className="text-xl font-bold mb-2">Paso 4: Lenguaje</Text>

      <Text className="mb-1">Repetir la frase: "Tres tristes tigres..."</Text>
      <TextInput
        placeholder="Respuesta..."
        value={repeticion}
        onChangeText={setRepeticion}
        className="border border-gray-300 mb-4 p-2 rounded"
      />

      <Text className="mb-1">Obedece la orden: "Toca tu nariz"</Text>
      <TextInput
        placeholder="¿Lo realizó correctamente?"
        value={comprension}
        onChangeText={setComprension}
        className="border border-gray-300 mb-4 p-2 rounded"
      />

      <TouchableOpacity
        className="bg-blue-500 p-3 rounded mt-4"
        onPress={handleNext}
      >
        <Text className="text-white text-center">Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}
