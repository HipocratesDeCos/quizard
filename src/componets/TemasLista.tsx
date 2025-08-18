import React from 'react';
import { Materia } from '../types';

interface TemasListaProps {
  materia: Materia;
  onSelectTema: (temaId: string) => void;
  onVolverHome: () => void;
}

const TemasLista: React.FC<TemasListaProps> = ({ materia, onSelectTema, onVolverHome }) => {
  const temas = Object.values(materia.temas);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header con navegación */}
        <div className="flex items-center mb-8">
          <button
            onClick={onVolverHome}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors mr-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </button>
        </div>

        {/* Título de la materia */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {materia.nombre}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {materia.descripcion}
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {temas.length} tema(s) disponible(s)
          </div>
        </div>

        {/* Lista de temas */}
        <div className="grid gap-6">
          {temas.map((tema, index) => (
            <button
              key={tema.id}
              onClick={() => onSelectTema(tema.id)}
              className="group relative p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-left overflow-hidden"
            >
              {/* Fondo degradado */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Número del tema */}
              <div className="absolute top-4 right-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Contenido */}
              <div className="relative z-10 pr-16">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {tema.nombre}
                </h3>
                
                {/* Estadísticas del tema */}
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tema.preguntas.length} pregunta(s)
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Contenido enriquecido
                  </div>
                </div>

                {/* Descripción breve */}
                <p className="text-gray-600 line-clamp-2">
                  {tema.introduccion.substring(0, 120)}...
                </p>

                {/* Indicador de acción */}
                <div className="mt-4 flex items-center text-blue-600 font-medium">
                  Comenzar quiz
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Línea decorativa */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 w-0 group-hover:w-full transition-all duration-500"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemasLista;
