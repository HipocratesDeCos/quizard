import React, { useState } from 'react';
import { useQuizData } from './hooks/useQuizData';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import MateriasHome from './components/MateriasHome';
import TemasLista from './components/TemasLista';
import Quiz from './components/Quiz';

type Vista = 'home' | 'temas' | 'quiz';

interface EstadoNavegacion {
  vista: Vista;
  materiaId?: string;
  temaId?: string;
}

function App() {
  const { quizData, loading, error } = useQuizData();
  const [navegacion, setNavegacion] = useState<EstadoNavegacion>({
    vista: 'home'
  });

  // Handlers de navegación
  const irAHome = () => {
    setNavegacion({ vista: 'home' });
  };

  const irATemas = (materiaId: string) => {
    setNavegacion({ vista: 'temas', materiaId });
  };

  const irAQuiz = (temaId: string) => {
    setNavegacion({ 
      vista: 'quiz', 
      materiaId: navegacion.materiaId, 
      temaId 
    });
  };

  const volverATemas = () => {
    setNavegacion({ 
      vista: 'temas', 
      materiaId: navegacion.materiaId 
    });
  };

  // Estados de carga y error
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !quizData) {
    return <ErrorMessage message={error || 'Error al cargar los datos'} />;
  }

  // Renderizado según la vista actual
  switch (navegacion.vista) {
    case 'home':
      return (
        <MateriasHome 
          quizData={quizData}
          onSelectMateria={irATemas}
        />
      );

    case 'temas':
      if (!navegacion.materiaId) {
        return <ErrorMessage message="Error: Materia no especificada" />;
      }
      
      const materia = quizData.materias[navegacion.materiaId];
      if (!materia) {
        return <ErrorMessage message="Error: Materia no encontrada" />;
      }

      return (
        <TemasLista 
          materia={materia}
          onSelectTema={irAQuiz}
          onVolverHome={irAHome}
        />
      );

    case 'quiz':
      if (!navegacion.materiaId || !navegacion.temaId) {
        return <ErrorMessage message="Error: Tema no especificado" />;
      }

      const materiaQuiz = quizData.materias[navegacion.materiaId];
      if (!materiaQuiz) {
        return <ErrorMessage message="Error: Materia no encontrada" />;
      }

      const tema = materiaQuiz.temas[navegacion.temaId];
      if (!tema) {
        return <ErrorMessage message="Error: Tema no encontrado" />;
      }

      return (
        <Quiz 
          tema={tema}
          materiaNombre={materiaQuiz.nombre}
          onVolverTemas={volverATemas}
          onVolverHome={irAHome}
        />
      );

    default:
      return <ErrorMessage message="Error: Vista no reconocida" />;
  }
}

export default App;
