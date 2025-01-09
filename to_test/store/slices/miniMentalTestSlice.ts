import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definir el tipo de estado
type MiniMentalTestState = {
  answers: Record<string, string>; // Almacenar respuestas de las preguntas
};

const initialState: MiniMentalTestState = {
  answers: {}, // Inicializamos las respuestas como un objeto vacío
};

const miniMentalTestSlice = createSlice({
  name: 'miniMentalTest', // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    // Acción para guardar una respuesta
    setAnswer: (state, action: PayloadAction<{ question: string; answer: string }>) => {
      const { question, answer } = action.payload;
      state.answers[question] = answer; // Guardamos la respuesta en el estado
    },
    
    // Acción para resetear todas las respuestas
    resetTest: (state) => {
      state.answers = {}; // Resetear las respuestas
    },
  },
});

// Exportar las acciones para usarlas en los componentes
export const { setAnswer, resetTest } = miniMentalTestSlice.actions;

// Exportar el reducer para que se pueda usar en la configuración del store
export default miniMentalTestSlice.reducer;
