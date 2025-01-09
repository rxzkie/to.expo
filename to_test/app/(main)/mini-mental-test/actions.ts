// Importaciones necesarias
import { AppDispatch } from '@/store'; // Asegúrate de tener correctamente el tipo de dispatch en tu store
import { setAnswer, resetTest } from '@/store/slices/miniMentalTestSlice';

// Función para establecer una respuesta
export const setAnswerAction = (question: string, answer: string) => (dispatch: AppDispatch) => {
  dispatch(setAnswer({ question, answer }));
};

// Función para resetear las respuestas
export const resetTestAction = () => (dispatch: AppDispatch) => {
  dispatch(resetTest());
};
