import * as FileSystem from 'expo-file-system';
import { PDFDocument, PDFPage } from 'react-native-pdf-lib';

export const generatePdf = async (answers: Record<string, string>, questions: string[]) => {
  try {
    const pdfPath = FileSystem.documentDirectory + 'MiniMentalTestResults.pdf';

    // Crear el documento PDF
    const pdfDoc = PDFDocument.create(pdfPath);

    // Crear la página PDF
    const page = PDFPage.create().setMediaBox(600, 800);

    // Agregar contenido a la página
    page.drawText('Resultados del Mini-Mental Test', { x: 50, y: 750, fontSize: 20 });
    page.drawText(`Fecha: ${new Date().toLocaleDateString()}`, { x: 50, y: 720, fontSize: 16 });

    let yPosition = 680;
    questions.forEach((question, index) => {
      const answer = answers[question] || 'No respondida';
      const result = answer === 'Correcta' ? 'Correcta' : 'Incorrecta';

      page.drawText(`${index + 1}. ${question}`, { x: 50, y: yPosition, fontSize: 14 });
      yPosition -= 20;
      page.drawText(`Respuesta: ${answer}`, { x: 50, y: yPosition, fontSize: 12 });
      yPosition -= 20;
      page.drawText(`Resultado: ${result}`, {
        x: 50,
        y: yPosition,
        fontSize: 12,
        color: result === 'Correcta' ? '#00FF00' : '#FF0000',
      });
      yPosition -= 30;
    });

    // Añadir la página al documento
    pdfDoc.addPages([page]);

    // Guardar el PDF
    await pdfDoc.write();
    return pdfPath;
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    throw error;
  }
};
