import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setAnswer, resetTest } from '../../store/slices/testSlice';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Sharing from 'expo-sharing';

export default function MiniMentalTest() {
  const dispatch = useDispatch();
  const answers = useSelector((state: RootState) => state.test.answers);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [response, setResponse] = useState('');

  const questions = [
    '¿En qué año estamos?',
    '¿En qué mes estamos?',
    '¿Dónde estamos ahora?',
    '¿Cuál es su nombre completo?',
    '¿Qué día de la semana es hoy?',
  ];

  const handleNext = () => {
    if (response.trim()) {
      dispatch(setAnswer({ question: questions[currentQuestion], answer: response }));
      setResponse('');
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleFinish = async () => {
    dispatch(setAnswer({ question: questions[currentQuestion], answer: response }));

    const htmlContent = `
      <h1>Resultados del Mini-Mental Test</h1>
      ${Object.entries(answers)
        .map(([question, answer]) => `<p><strong>${question}:</strong> ${answer}</p>`)
        .join('')}
    `;

    const file = await RNHTMLtoPDF.convert({
      html: htmlContent,
      fileName: 'mini-mental-results',
      base64: false,
    });

    await Sharing.shareAsync(file.filePath || '');
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Mini-Mental Test</Text>

      {currentQuestion < questions.length ? (
        <>
          <Text className="text-lg mb-4">{questions[currentQuestion]}</Text>
          <TextInput
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Tu respuesta..."
            value={response}
            onChangeText={setResponse}
          />
          <TouchableOpacity
            className="bg-blue-500 p-4 rounded w-full"
            onPress={currentQuestion === questions.length - 1 ? handleFinish : handleNext}
          >
            <Text className="text-white text-center text-lg">
              {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity className="bg-green-500 p-4 rounded w-full" onPress={handleFinish}>
          <Text className="text-white text-center text-lg">Ver resultados en PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
