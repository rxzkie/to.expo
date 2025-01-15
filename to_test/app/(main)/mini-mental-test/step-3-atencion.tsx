import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setAnswer } from '@/store/slices/miniMentalTestSlice';

export default function Step3Atencion() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [calculo, setCalculo] = useState('');

  const handleNext = () => {
    dispatch(
      setAnswer({
        question: 'Atención y cálculo (100 - 7...)',
        answer: calculo,
      })
    );
    router.push('/(main)mini-mental-teststep-4-lenguaje');
  };

  return (
    <View>
      <Text className="text-xl font-bold mb-2">Paso 3: Atención y Cálculo</Text>

      <Text className="mb-1">Resta 7 sucesivamente, iniciando en 100:</Text>
      <TextInput
        placeholder="Ej: 93, 86, 79..."
        value={calculo}
        onChangeText={setCalculo}
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
