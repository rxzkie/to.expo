import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../../../store';
import { setAnswer } from '../../../store/slices/miniMentalTestSlice';

// Preguntas del Mini-Mental Test
const questions = [
  '¿En qué año estamos?',
  '¿En qué mes estamos?',
  '¿Dónde estamos ahora?',
  '¿Cuál es su nombre completo?',
  '¿Qué día de la semana es hoy?',
];

export default function MiniMentalTest() {
  const dispatch = useDispatch();
  const answers = useSelector((state: RootState) => state.test.answers);
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [response, setResponse] = useState('');

  useEffect(() => {
    setResponse(answers[questions[currentQuestion]] || '');
  }, [currentQuestion, answers]);

  const navigateToQuestion = (index: number) => {
    dispatch(setAnswer({ question: questions[currentQuestion], answer: response }));
    setCurrentQuestion(index);
  };

  const handleFinish = () => {
    dispatch(setAnswer({ question: questions[currentQuestion], answer: response }));
    router.push('/mini-mental-test/hoja-de-respuestas'); // Ruta corregida: sin '/' inicial
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Mini Mental Test</Text>
        <TouchableOpacity
          className="bg-red-500 p-2 rounded"
          onPress={() => router.back()}
        >
          <Text className="text-white text-center">Volver</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center mb-4">
        {questions.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigateToQuestion(index)}
            className={`mx-1 p-2 w-8 h-8 rounded-full ${
              index === currentQuestion ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <Text className="text-white text-center">{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-lg font-semibold mb-4">{`${currentQuestion + 1}. ${
        questions[currentQuestion]
      }`}</Text>

      <TextInput
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Escribe tu respuesta..."
        value={response}
        onChangeText={setResponse}
        multiline
      />

      <View className="flex-row justify-between">
        <TouchableOpacity
          className={`p-4 rounded ${
            currentQuestion === 0 ? 'bg-gray-300' : 'bg-gray-500'
          }`}
          onPress={() => navigateToQuestion(currentQuestion - 1)}
          disabled={currentQuestion === 0}
        >
          <Text className="text-white text-center">Anterior</Text>
        </TouchableOpacity>

        {currentQuestion < questions.length - 1 ? (
          <TouchableOpacity
            className="bg-blue-500 p-4 rounded"
            onPress={() => navigateToQuestion(currentQuestion + 1)}
          >
            <Text className="text-white text-center">Siguiente</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-green-500 p-4 rounded"
            onPress={handleFinish}
          >
            <Text className="text-white text-center">Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
