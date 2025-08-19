# 📁 Estructura del Proyecto - Quizzes Educativos

## 🏗️ Arquitectura de Carpetas para GitHub

```
quizzes-educativos/
├── 📄 README.md                    # Documentación del proyecto
├── 📄 package.json                 # Dependencias y scripts de Node.js
├── 📄 pnpm-lock.yaml              # Lockfile de dependencias
├── 📄 index.html                   # Punto de entrada HTML
├── 📄 vite.config.ts               # Configuración de Vite
├── 📄 tailwind.config.js           # Configuración de Tailwind CSS
├── 📄 postcss.config.js            # Configuración de PostCSS
├── 📄 eslint.config.js             # Configuración de ESLint
├── 📄 components.json              # Configuración de componentes UI
├── 📄 tsconfig.json                # Configuración principal TypeScript
├── 📄 tsconfig.app.json            # Configuración TypeScript para app
├── 📄 tsconfig.node.json           # Configuración TypeScript para Node.js
│
├── 📁 public/                      # Archivos estáticos públicos
│   ├── 📄 codigo.json              # ✨ TU ARCHIVO DE CONTENIDO
│   ├── 📄 quiz-icon.svg            # Icono del quiz
│   └── 📄 use.txt                  # Archivo de uso
│
├── 📁 src/                         # Código fuente principal
│   ├── 📄 main.tsx                 # Punto de entrada de la aplicación
│   ├── 📄 App.tsx                  # Componente raíz de la aplicación
│   ├── 📄 App.css                  # Estilos específicos de App
│   ├── 📄 index.css                # Estilos globales
│   ├── 📄 vite-env.d.ts           # Definiciones de tipos de Vite
│   │
│   ├── 📁 components/              # Componentes reutilizables
│   │   ├── 📄 MateriasHome.tsx     # Página principal con 4 materias
│   │   ├── 📄 TemasLista.tsx       # Lista de temas por materia
│   │   ├── 📄 Quiz.tsx             # Componente principal del quiz
│   │   ├── 📄 SaberMasModal.tsx    # Modal "Saber más"
│   │   ├── 📄 LoadingSpinner.tsx   # Spinner de carga
│   │   ├── 📄 ErrorMessage.tsx     # Mensajes de error
│   │   └── 📄 ErrorBoundary.tsx    # Manejo de errores
│   │
│   ├── 📁 hooks/                   # Custom hooks de React
│   │   ├── 📄 useQuizData.ts       # Hook para manejar datos del quiz
│   │   └── 📄 use-mobile.tsx       # Hook para detectar dispositivos móviles
│   │
│   ├── 📁 types/                   # Definiciones de tipos TypeScript
│   │   └── 📄 index.ts             # Tipos principales del proyecto
│   │
│   └── 📁 lib/                     # Utilidades y librerías
│       └── 📄 utils.ts             # Funciones de utilidad
│
└── 📁 dist/                        # Archivos de build (generados)
    ├── 📄 index.html               # HTML de producción
    ├── 📄 codigo.json              # Datos de contenido
    ├── 📄 quiz-icon.svg            # Recursos estáticos
    └── 📁 assets/                  # Assets compilados (CSS/JS)
        ├── 📄 index-BUU57za1.js    # JavaScript compilado
        └── 📄 index-B4mtX8k6.css   # CSS compilado
```

## 🎯 Archivos Clave para Personalización

### 📄 `public/codigo.json` ⭐ **ARCHIVO PRINCIPAL**
- **Función:** Contiene todo el contenido de los quizzes
- **Modificable:** SÍ - Aquí agregarás tu contenido educativo
- **Estructura:** JSON con materias, temas, preguntas y respuestas

### 📁 `src/components/` 
- **MateriasHome.tsx:** Página principal con botones de materias
- **TemasLista.tsx:** Lista de temas específicos por materia
- **Quiz.tsx:** Lógica principal del sistema de quiz
- **SaberMasModal.tsx:** Ventanas flotantes "Saber más"

### 📁 `src/types/`
- **index.ts:** Definiciones de tipos para el contenido del quiz

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install
# o
pnpm install

# Modo desarrollo
npm run dev
# o  
pnpm dev

# Build para producción
npm run build
# o
pnpm build

# Preview del build
npm run preview
# o
pnpm preview
```

## 📋 Tecnologías Utilizadas

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Linting:** ESLint
- **Package Manager:** pnpm

## 🎨 Características de Diseño

- ✅ Botones con degradado azul a lila
- ✅ Feedback visual verde/rojo
- ✅ Diseño responsive
- ✅ Efectos de sombreado
- ✅ Animaciones suaves
- ✅ Modales interactivos

---

**📝 Nota:** Para agregar contenido, edita únicamente el archivo `public/codigo.json` con tus materias, temas, preguntas y respuestas específicas.