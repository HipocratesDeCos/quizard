import React from 'react';
import { QuizData } from '../types';

interface MateriasHomeProps {
  quizData: QuizData;
  onSelectMateria: (materiaId: string) => void;
}

const MateriasHome: React.FC<MateriasHomeProps> = ({ quizData, onSelectMateria }) => {
  const materias = Object.values(quizData.materias);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Quizzes Educativos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecciona una materia para comenzar tu aprendizaje interactivo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {materias.map((materia) => {
            const iconos = {
              'contabilidad-financiera': '📊',
              'analisis-economico-financiero': '📈',
              'economia': '💰',
              'marketing': '🎯'
            };

            return (
              <button
                key={materia.id}
                onClick={() => onSelectMateria(materia.id)}
                className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 text-left overflow-hidden"
              >
                {/* Fondo degradado sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Contenido */}
                <div className="relative z-10">
                  <div className="text-4xl mb-4">
                    {iconos[materia.id as keyof typeof iconos] || '📚'}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {materia.nombre}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {materia.descripcion}
                  </p>
                  
                  {/* Indicador de temas */}
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {Object.keys(materia.temas).length} tema(s) disponible(s)
                  </div>
                </div>

                {/* Botón visual degradado */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-500 to-purple-500 rounded-tl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              </button>
            );
          })}
        </div>

        {/* Información adicional */}
        <div className="mt-16 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Metodología de Aprendizaje
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cada quiz incluye preguntas interactivas con feedback inmediato, 
              explicaciones detalladas y contenido enriquecido para profundizar tu conocimiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriasHome;
