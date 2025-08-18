import { useState, useEffect } from 'react';
import { QuizData } from '../types';

export const useQuizData = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const response = await fetch('/codigo.json');
        if (!response.ok) {
          throw new Error('Error al cargar los datos del quiz');
        }
        const data: QuizData = await response.json();
        setQuizData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);

  return { quizData, loading, error };
};
