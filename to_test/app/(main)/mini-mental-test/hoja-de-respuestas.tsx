import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function HojaDeRespuestas() {
  const router = useRouter();
  const answers = useSelector((state: RootState) => state.test.answers);

  // Función para generar el contenido HTML del PDF
  const generateHTML = () => {
    let htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; color: #333; }
            .question { font-weight: bold; margin-top: 10px; }
            .answer { margin-left: 10px; color: #555; }
          </style>
        </head>
        <body>
          <h1>Hoja de Respuestas</h1>
    `;

    Object.entries(answers).forEach(([question, answer], index) => {
      htmlContent += `
        <div>
          <p class="question">${index + 1}. ${question}</p>
          <p class="answer">Respuesta: ${answer || 'No respondida'}</p>
        </div>
      `;
    });

    htmlContent += `
        </body>
      </html>
    `;

    return htmlContent;
  };

  // Función para generar y guardar el PDF
  const generatePDF = async () => {
    try {
      const html = generateHTML();

      // Generar el archivo PDF
      const result = await Print.printToFileAsync({ html });

      if (result && result.uri) {
        // Cambiar el nombre del archivo y moverlo a otra ubicación
        const newPath = `${FileSystem.documentDirectory}HojaDeRespuestas.pdf`;
        await FileSystem.moveAsync({
          from: result.uri,
          to: newPath,
        });

        Alert.alert('PDF Generado', 'El archivo se ha guardado en tu dispositivo.');

        // Compartir el archivo PDF
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(newPath);
        } else {
          Alert.alert(
            'Compartir no disponible',
            'El PDF fue generado pero no se puede compartir en este dispositivo.'
          );
        }
      } else {
        throw new Error('No se pudo generar el archivo PDF.');
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      Alert.alert('Error', 'No se pudo generar el PDF. Intenta nuevamente.');
    }
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
        className="bg-green-500 p-4 rounded mb-4"
        onPress={generatePDF}
      >
        <Text className="text-white text-center">Guardar como PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded"
        onPress={() => router.push('/')}
      >
        <Text className="text-white text-center">Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}
