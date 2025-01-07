import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setAnswer, resetTest } from '../../store/slices/testSlice';
import * as FileSystem from 'expo-file-system';
import { PDFDocument, PDFPage } from 'react-native-pdf-lib';

const questions = [
  '¿En qué año estamos?',
  '¿En qué mes estamos?',
  '¿Dónde estamos ahora?',
  '¿Cuál es su nombre completo?',
  '¿Qué día de la semana es hoy?',
] as const;

type Question = typeof questions[number];

const correctAnswers: Record<Question, string> = {
  '¿En qué año estamos?': '2023',
  '¿En qué mes estamos?': 'enero',
  '¿Dónde estamos ahora?': 'casa',
  '¿Cuál es su nombre completo?': 'nombre completo',
  '¿Qué día de la semana es hoy?': 'lunes',
};

export default function MiniMentalTest() {
  const dispatch = useDispatch();
  const answers = useSelector((state: RootState) => state.test.answers);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [response, setResponse] = useState('');

  const isAnswerCorrect = (question: Question) =>
    answers[question] === correctAnswers[question];

  const navigateToQuestion = (index: number) => {
    if (response.trim()) {
      dispatch(setAnswer({ question: questions[currentQuestion], answer: response }));
    }
    setCurrentQuestion(index);
    setResponse(answers[questions[index]] || '');
  };

  const handleFinish = async () => {
    if (response.trim()) {
      dispatch(setAnswer({ question: questions[currentQuestion], answer: response }));
    }

    try {
      const pdfPath = FileSystem.documentDirectory + 'MiniMentalTestResults.pdf';

      // Crear el documento PDF proporcionando la ruta
      const pdfDoc = PDFDocument.create(pdfPath);

      // Crear la página PDF
      const page = PDFPage.create()
        .setMediaBox(600, 800);

      // Agregar contenido a la página sin encadenar
      page.drawText('Resultados del Mini-Mental Test', { x: 50, y: 750, fontSize: 20 });
      page.drawText(`Fecha: ${new Date().toLocaleDateString()}`, { x: 50, y: 720, fontSize: 16 });

      let yPosition = 680;
      questions.forEach((question, index) => {
        const answer = answers[question as Question] || 'No respondida';
        const result = isAnswerCorrect(question as Question) ? 'Correcta' : 'Incorrecta';

        page.drawText(`${index + 1}. ${question}`, { x: 50, y: yPosition, fontSize: 14 });
        yPosition -= 20;
        page.drawText(`Respuesta: ${answer}`, { x: 50, y: yPosition, fontSize: 12 });
        yPosition -= 20;
        page.drawText(
          `Resultado: ${result}`,
          { 
            x: 50, 
            y: yPosition, 
            fontSize: 12, 
            color: result === 'Correcta' ? '#00FF00' : '#FF0000' // Usar colores hexadecimales
          }
        );
        yPosition -= 30;
      });

      // Verificar que la página se ha creado correctamente
      if (!page) {
        throw new Error('La página PDF no se ha creado correctamente.');
      }

      // Agregar la página al documento PDF
      pdfDoc.addPages([page]);

      // Escribir el PDF en el sistema de archivos
      await pdfDoc.write();

      console.log('PDF guardado en:', pdfPath);
      Alert.alert('Éxito', 'El PDF se guardó correctamente en la memoria del dispositivo.');
      
      // Opcional: Resetear el test después de finalizar
      dispatch(resetTest());
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      Alert.alert('Error', 'No se pudo generar el PDF.');
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row justify-center mb-4">
        {questions.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigateToQuestion(index)}
            className={`mx-1 p-2 w-8 h-8 rounded-full ${
              index === currentQuestion
                ? 'bg-blue-500'
                : isAnswerCorrect(questions[index] as Question)
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
          >
            <Text className="text-white text-center">{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-2xl font-bold mb-4">{`${currentQuestion + 1}. ${questions[currentQuestion]}`}</Text>

      <TextInput
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Escribe tu respuesta..."
        value={response}
        onChangeText={setResponse}
      />

      <View className="flex-row justify-between">
        <TouchableOpacity
          className="bg-gray-500 p-4 rounded"
          onPress={() => navigateToQuestion(currentQuestion - 1)}
          disabled={currentQuestion === 0}
        >
          <Text className="text-white">Anterior</Text>
        </TouchableOpacity>

        {currentQuestion < questions.length - 1 ? (
          <TouchableOpacity
            className="bg-blue-500 p-4 rounded"
            onPress={() => navigateToQuestion(currentQuestion + 1)}
          >
            <Text className="text-white">Siguiente</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="bg-green-500 p-4 rounded" onPress={handleFinish}>
            <Text className="text-white">Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
