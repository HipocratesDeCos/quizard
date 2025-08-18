export interface Pregunta {
  id: number;
  pregunta: string;
  opciones: string[];
  respuestasCorrectas: number[];
  explicacion: string;
}

export interface SaberMas {
  titulo: string;
  contenido: string;
}

export interface Tema {
  id: string;
  nombre: string;
  introduccion: string;
  preguntas: Pregunta[];
  saberMas: SaberMas;
}

export interface Materia {
  id: string;
  nombre: string;
  descripcion: string;
  temas: Record<string, Tema>;
}

export interface QuizData {
  materias: Record<string, Materia>;
}

export interface RespuestaUsuario {
  preguntaId: number;
  opcionesSeleccionadas: number[];
  esCorrecta: boolean;
}

export interface ResultadoQuiz {
  aciertos: number;
  fallos: number;
  total: number;
  porcentaje: number;
}
