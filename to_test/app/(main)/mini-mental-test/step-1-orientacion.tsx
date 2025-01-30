import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setAnswer } from '@/store/slices/miniMentalTestSlice';

export default function Step1Orientacion() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Estados locales para las respuestas
  const [yearAnswer, setYearAnswer] = useState('');
  const [monthAnswer, setMonthAnswer] = useState('');
  const [saved, setSaved] = useState(false); // Estado para mostrar que se guardó

  // Recuperar las respuestas guardadas desde Redux
  const savedAnswers = useSelector((state: RootState) => state.test.answers);

  const handleSave = () => {
    dispatch(setAnswer({ question: '¿En qué año estamos?', answer: yearAnswer }));
    dispatch(setAnswer({ question: '¿En qué mes estamos?', answer: monthAnswer }));
    setSaved(true); // Mostrar "Respuesta guardada"
  };

  const handleNext = () => {
    if (!saved) {
      alert("Guarda tu respuesta antes de continuar.");
      return;
    }
    router.push('/(main)/mini-mental-test/step-2-memoria');
  };

  return (
    <View className="flex-1 bg-rose-50 p-6">
      <Text className="text-2xl font-bold mb-4 text-rose-600">Paso 1: Orientación</Text>

      {/* Pregunta 1 */}
      <Text className="mb-2 text-yellow-700 font-semibold">1. ¿En qué año estamos?</Text>
      <TextInput
        placeholder="Escribe el año..."
        placeholderTextColor="#f59e0b" // Amarillo tenue
        value={yearAnswer}
        onChangeText={setYearAnswer}
        className="border border-yellow-300 bg-yellow-50 mb-4 p-3 rounded text-yellow-900"
      />
      {/* Mostrar la respuesta guardada */}
      {savedAnswers['¿En qué año estamos?'] && (
        <Text className="text-rose-500 italic mb-6">
          Respuesta guardada: {savedAnswers['¿En qué año estamos?']}
        </Text>
      )}

      {/* Pregunta 2 */}
      <Text className="mb-2 text-yellow-700 font-semibold">2. ¿En qué mes estamos?</Text>
      <TextInput
        placeholder="Escribe el mes..."
        placeholderTextColor="#f59e0b" // Amarillo tenue
        value={monthAnswer}
        onChangeText={setMonthAnswer}
        className="border border-yellow-300 bg-yellow-50 mb-4 p-3 rounded text-yellow-900"
      />
      {/* Mostrar la respuesta guardada */}
      {savedAnswers['¿En qué mes estamos?'] && (
        <Text className="text-rose-500 italic mb-6">
          Respuesta guardada: {savedAnswers['¿En qué mes estamos?']}
        </Text>
      )}

      {/* Contenedor de botones */}
      <View className="flex-row justify-between items-center mt-6">
        {/* Botón de Guardar (🎟️ Ticket) */}
        <TouchableOpacity
          className="bg-green-500 p-4 rounded-lg shadow-md flex-1 mr-2"
          onPress={handleSave}
        >
          <Text className="text-white font-semibold text-center">🎟️ Guardar</Text>
        </TouchableOpacity>

        {/* Botón de Siguiente */}
        <TouchableOpacity
          className="bg-rose-300 p-4 rounded-lg shadow-md flex-1 ml-2"
          onPress={handleNext}
        >
          <Text className="text-yellow-900 font-semibold text-center">Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
