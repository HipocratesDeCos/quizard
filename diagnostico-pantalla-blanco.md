# 🔍 DIAGNÓSTICO COMPLETO - PANTALLA EN BLANCO EN GITHUB PAGES

## 🚨 PROBLEMAS COMUNES Y SOLUCIONES

### 1️⃣ VERIFICAR CONFIGURACIÓN DE GITHUB PAGES

**❓ ¿Dónde tienes configurado GitHub Pages?**

```
Ir a tu repositorio → Settings → Pages
```

**✅ CONFIGURACIONES CORRECTAS:**

#### OPCIÓN A: Despliegue desde /dist
- **Source:** Deploy from a branch
- **Branch:** main (o master)
- **Folder:** `/dist`

#### OPCIÓN B: Despliegue desde raíz
- **Source:** Deploy from a branch  
- **Branch:** main (o master)
- **Folder:** `/ (root)`

---

### 2️⃣ VERIFICAR ESTRUCTURA DE ARCHIVOS

**❓ ¿Qué estructura tienes en tu repositorio?**

**✅ ESTRUCTURA CORRECTA OPCIÓN A (desde /dist):**
```
tu-repositorio/
├── README.md
├── package.json
├── vite.config.ts  (con base: './')
├── src/
├── public/
└── dist/           ← CARPETA PARA GITHUB PAGES
    ├── index.html  ← DEBE EXISTIR
    ├── codigo.json
    ├── quiz-icon.svg
    └── assets/
        ├── index-[hash].js
        └── index-[hash].css
```

**✅ ESTRUCTURA CORRECTA OPCIÓN B (desde raíz):**
```
tu-repositorio/
├── index.html      ← EN LA RAÍZ
├── codigo.json
├── quiz-icon.svg
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── package.json
├── src/
└── public/
```

---

### 3️⃣ VERIFICAR CONTENIDO DE index.html

**❓ ¿Tiene tu index.html rutas relativas?**

**❌ INCORRECTO (rutas absolutas):**
```html
<link rel="icon" href="/quiz-icon.svg" />
<script src="/assets/index.js"></script>
```

**✅ CORRECTO (rutas relativas):**
```html
<link rel="icon" href="./quiz-icon.svg" />
<script src="./assets/index.js"></script>
```

---

### 4️⃣ VERIFICAR ARCHIVOS ESPECIALES

**✅ ARCHIVOS QUE DEBEN EXISTIR:**

#### En la carpeta de despliegue:
- `.nojekyll` (archivo vacío, evita procesamiento Jekyll)
- `index.html` (punto de entrada)
- `codigo.json` (tus datos)
- `assets/` (archivos CSS/JS compilados)

---

### 5️⃣ VERIFICAR vite.config.ts

**✅ CONFIGURACIÓN CORRECTA:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',  // ← CRÍTICO para GitHub Pages
  plugins: [react()],
  // resto de configuración...
})
```

---

## 🛠️ SOLUCIONES PASO A PASO

### SOLUCIÓN 1: Verificar y corregir configuración

1. **Verifica GitHub Pages:**
   - Settings → Pages
   - Anota qué carpeta tienes seleccionada

2. **Verifica que existe index.html:**
   - En la carpeta que seleccionaste en Pages
   - Abre el archivo y verifica las rutas

3. **Verifica .nojekyll:**
   - Debe estar en la misma carpeta que index.html

### SOLUCIÓN 2: Método de raíz (más simple)

1. **Copia archivos de dist/ a raíz:**
   ```bash
   # En tu repositorio local
   cp -r dist/* .
   cp dist/.nojekyll .  # Archivo oculto
   ```

2. **Configura GitHub Pages:**
   - Source: Deploy from a branch
   - Branch: main
   - Folder: `/ (root)`

3. **Sube cambios:**
   ```bash
   git add .
   git commit -m "Deploy: Archivos en raíz"
   git push
   ```

### SOLUCIÓN 3: Rebuild con configuración correcta

1. **Verifica vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: './',  // OBLIGATORIO
     // ...
   })
   ```

2. **Rebuild:**
   ```bash
   npm run build
   # o
   pnpm build
   ```

3. **Sube nuevo build:**
   ```bash
   git add dist/
   git commit -m "Fix: Build con rutas relativas"
   git push
   ```

---

## 🔍 DIAGNÓSTICO AVANZADO

### Paso 1: Abrir consola del navegador
- Presiona F12 en tu página de GitHub Pages
- Ve a la pestaña "Console"
- Busca errores 404 o de JavaScript

### Paso 2: Verificar Network
- Pestaña "Network" en F12
- Recarga la página
- Verifica qué archivos fallan al cargar

### Paso 3: Verificar archivos en GitHub
- Ve a tu repositorio en GitHub.com
- Navega a la carpeta que configuraste en Pages
- Verifica que TODOS los archivos estén presentes

---

## ⚡ SOLUCIÓN RÁPIDA GARANTIZADA

**Si nada funciona, usa esta estructura simple:**

1. **Crea estos archivos en la RAÍZ de tu repositorio:**
   - `index.html` (con rutas relativas)
   - `codigo.json`
   - `quiz-icon.svg`
   - `assets/` (carpeta con CSS/JS)
   - `.nojekyll` (archivo vacío)

2. **Configura GitHub Pages:**
   - Folder: `/ (root)`

3. **Espera 5-10 minutos**

---

## 📞 INFORMACIÓN NECESARIA PARA AYUDARTE

Para diagnosticar mejor, necesito saber:
1. ¿Qué carpeta tienes seleccionada en GitHub Pages?
2. ¿Existe el archivo index.html en esa carpeta?
3. ¿Qué errores ves en la consola del navegador (F12)?
4. ¿Cuál es la URL de tu repositorio GitHub?

---

**🎯 CON ESTA GUÍA, TU PROBLEMA SE SOLUCIONARÁ DEFINITIVAMENTE**