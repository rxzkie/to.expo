import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setAnswer } from '@/store/slices/miniMentalTestSlice';

export default function Step2Memoria() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [words, setWords] = useState('');

  const handleNext = () => {
    dispatch(setAnswer({ question: 'Memoria de 3 palabras', answer: words }));
    router.push('/(main)mini-mental-teststep-3-atencion');
  };

  return (
    <View>
      <Text className="text-xl font-bold mb-2">Paso 2: Memoria</Text>

      <Text className="mb-1">Recuerda 3 palabras y escríbelas aquí:</Text>
      <TextInput
        placeholder="Ej: 'Perro, Casa, Árbol'..."
        value={words}
        onChangeText={setWords}
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
