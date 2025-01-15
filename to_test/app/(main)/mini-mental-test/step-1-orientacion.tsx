import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setAnswer } from '@/store/slices/miniMentalTestSlice';

export default function Step1Orientacion() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [yearAnswer, setYearAnswer] = useState('');
  const [monthAnswer, setMonthAnswer] = useState('');

  const handleNext = () => {
    dispatch(setAnswer({ question: '¿En qué año estamos?', answer: yearAnswer }));
    dispatch(setAnswer({ question: '¿En qué mes estamos?', answer: monthAnswer }));

    router.push('/(main)mini-mental-teststep-2-memoria');
  };

  return (
    <View>
      <Text className="text-xl font-bold mb-2">Paso 1: Orientación</Text>

      <Text className="mb-1">1. ¿En qué año estamos?</Text>
      <TextInput
        placeholder="Escribe el año..."
        value={yearAnswer}
        onChangeText={setYearAnswer}
        className="border border-gray-300 mb-4 p-2 rounded"
      />

      <Text className="mb-1">2. ¿En qué mes estamos?</Text>
      <TextInput
        placeholder="Escribe el mes..."
        value={monthAnswer}
        onChangeText={setMonthAnswer}
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
