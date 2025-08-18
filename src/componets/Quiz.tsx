import React, { useState } from 'react';
import { Tema, RespuestaUsuario, ResultadoQuiz } from '../types';
import SaberMasModal from './SaberMasModal';

interface QuizProps {
  tema: Tema;
  materiaNombre: string;
  onVolverTemas: () => void;
  onVolverHome: () => void;
}

const Quiz: React.FC<QuizProps> = ({ tema, materiaNombre, onVolverTemas, onVolverHome }) => {
  const [respuestasUsuario, setRespuestasUsuario] = useState<RespuestaUsuario[]>([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState<number[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [mostrarSaberMas, setMostrarSaberMas] = useState(false);

  const pregunta = tema.preguntas[preguntaActual];
  const esUltimaPregunta = preguntaActual === tema.preguntas.length - 1;

  const manejarSeleccionOpcion = (indiceOpcion: number) => {
    if (mostrarResultado) return;

    setOpcionesSeleccionadas(prev => {
      if (prev.includes(indiceOpcion)) {
        return prev.filter(i => i !== indiceOpcion);
      } else {
        return [...prev, indiceOpcion];
      }
    });
  };

  const verificarRespuesta = () => {
    if (opcionesSeleccionadas.length === 0) return;

    const respuestasCorrectas = pregunta.respuestasCorrectas.sort();
    const seleccionadas = opcionesSeleccionadas.sort();
    const esCorrecta = JSON.stringify(respuestasCorrectas) === JSON.stringify(seleccionadas);

    const nuevaRespuesta: RespuestaUsuario = {
      preguntaId: pregunta.id,
      opcionesSeleccionadas: opcionesSeleccionadas,
      esCorrecta
    };

    setRespuestasUsuario(prev => [...prev, nuevaRespuesta]);
    setMostrarResultado(true);
  };

  const siguientePregunta = () => {
    if (esUltimaPregunta) {
      setQuizFinalizado(true);
    } else {
      setPreguntaActual(prev => prev + 1);
      setOpcionesSeleccionadas([]);
      setMostrarResultado(false);
    }
  };

  const calcularResultado = (): ResultadoQuiz => {
    const aciertos = respuestasUsuario.filter(r => r.esCorrecta).length;
    const fallos = respuestasUsuario.length - aciertos;
    const total = respuestasUsuario.length;
    const porcentaje = total > 0 ? Math.round((aciertos / total) * 100) : 0;

    return { aciertos, fallos, total, porcentaje };
  };

  const obtenerFraseMotivadora = (porcentaje: number): string => {
    if (porcentaje === 100) return "¡Perfecto! Has demostrado un dominio excepcional del tema.";
    if (porcentaje >= 80) return "¡Excelente trabajo! Tienes un muy buen conocimiento del tema.";
    if (porcentaje >= 60) return "¡Bien hecho! Has mostrado un buen entendimiento del tema.";
    if (porcentaje >= 40) return "Buen esfuerzo. Te recomendamos revisar algunos conceptos.";
    return "¡No te desanimes! El aprendizaje es un proceso continuo.";
  };

  const reiniciarQuiz = () => {
    setRespuestasUsuario([]);
    setPreguntaActual(0);
    setOpcionesSeleccionadas([]);
    setMostrarResultado(false);
    setQuizFinalizado(false);
  };

  if (quizFinalizado) {
    const resultado = calcularResultado();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header de navegación */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onVolverTemas}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a {materiaNombre}
            </button>
            <button
              onClick={onVolverHome}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </button>
          </div>

          {/* Resultados */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completado</h2>
              <p className="text-lg text-gray-600">{tema.nombre}</p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">{resultado.aciertos}</div>
                <div className="text-green-800 font-medium">Aciertos</div>
              </div>
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <div className="text-3xl font-bold text-red-600 mb-2">{resultado.fallos}</div>
                <div className="text-red-800 font-medium">Fallos</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">{resultado.porcentaje}%</div>
                <div className="text-blue-800 font-medium">Puntuación</div>
              </div>
            </div>

            {/* Frase motivadora */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 mb-8">
              <p className="text-lg text-gray-700 font-medium">
                {obtenerFraseMotivadora(resultado.porcentaje)}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reiniciarQuiz}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                Repetir Quiz
              </button>
              <button
                onClick={onVolverTemas}
                className="px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Otros Temas
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header de navegación */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onVolverTemas}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a {materiaNombre}
          </button>
          <button
            onClick={onVolverHome}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Inicio
          </button>
        </div>

        {/* Progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Pregunta {preguntaActual + 1} de {tema.preguntas.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((preguntaActual + 1) / tema.preguntas.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((preguntaActual + 1) / tema.preguntas.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Introducción (solo en la primera pregunta) */}
        {preguntaActual === 0 && !mostrarResultado && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Introducción al tema</h2>
            <p className="text-gray-600 leading-relaxed">{tema.introduccion}</p>
          </div>
        )}

        {/* Pregunta */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {pregunta.pregunta}
          </h2>

          {/* Opciones */}
          <div className="space-y-4 mb-8">
            {pregunta.opciones.map((opcion, index) => {
              const estaSeleccionada = opcionesSeleccionadas.includes(index);
              const esCorrecta = pregunta.respuestasCorrectas.includes(index);
              
              let claseBoton = "w-full p-4 text-left rounded-xl border transition-all duration-300 ";
              
              if (mostrarResultado) {
                if (esCorrecta) {
                  claseBoton += "bg-green-50 border-green-300 text-green-800";
                } else if (estaSeleccionada && !esCorrecta) {
                  claseBoton += "bg-red-50 border-red-300 text-red-800";
                } else {
                  claseBoton += "bg-gray-50 border-gray-200 text-gray-600";
                }
              } else {
                if (estaSeleccionada) {
                  claseBoton += "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 text-blue-800 shadow-md";
                } else {
                  claseBoton += "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => manejarSeleccionOpcion(index)}
                  className={claseBoton}
                  disabled={mostrarResultado}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      mostrarResultado
                        ? esCorrecta
                          ? 'border-green-500 bg-green-500'
                          : estaSeleccionada && !esCorrecta
                          ? 'border-red-500 bg-red-500'
                          : 'border-gray-300'
                        : estaSeleccionada
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {((mostrarResultado && esCorrecta) || (!mostrarResultado && estaSeleccionada)) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {mostrarResultado && estaSeleccionada && !esCorrecta && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium">{opcion}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explicación (mostrar después de verificar) */}
          {mostrarResultado && (
            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">Explicación:</h3>
              <p className="text-blue-800">{pregunta.explicacion}</p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {!mostrarResultado ? (
              <>
                <button
                  onClick={() => setMostrarSaberMas(true)}
                  className="underline text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  Saber más
                </button>
                <button
                  onClick={verificarRespuesta}
                  disabled={opcionesSeleccionadas.length === 0}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verificar Resultado
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setMostrarSaberMas(true)}
                  className="underline text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  Saber más
                </button>
                <button
                  onClick={siguientePregunta}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                >
                  {esUltimaPregunta ? 'Ver Resultados' : 'Siguiente Pregunta'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal Saber Más */}
      <SaberMasModal
        saberMas={tema.saberMas}
        isOpen={mostrarSaberMas}
        onClose={() => setMostrarSaberMas(false)}
      />
    </div>
  );
};

export default Quiz;
