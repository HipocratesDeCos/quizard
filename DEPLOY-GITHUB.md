# 📋 INSTRUCCIONES RÁPIDAS - DESPLIEGUE EN GITHUB PAGES

## 🚨 PROBLEMA SOLUCIONADO:
La página en blanco se debía a rutas absolutas. Ya está corregido.

---

## 🚀 PASOS PARA DESPLEGAR:

### 1️⃣ OPCIÓN RECOMENDADA (Desde /docs):

```bash
# En tu carpeta del proyecto
cd quizzes-educativos

# Renombra dist a docs
mv dist docs

# Sube a GitHub
git add .
git commit -m "Fix: Rutas relativas para GitHub Pages"
git push
```

**Configuración en GitHub:**
- Settings → Pages
- Source: Deploy from a branch
- Branch: `main`
- Folder: `/docs`

---

### 2️⃣ ALTERNATIVA (Desde raíz):

```bash
# Copia archivos de dist a raíz
cp -r dist/* .

# Sube a GitHub
git add .
git commit -m "Deploy: App en raíz para GitHub Pages"
git push
```

**Configuración en GitHub:**
- Settings → Pages
- Branch: `main`
- Folder: `/ (root)`

---

## ✅ VERIFICACIÓN:

Tras el despliegue (esperar 5-10 minutos):
- ✅ Página carga correctamente
- ✅ Botones con degradado azul-lila visibles
- ✅ Sistema de navegación funcional
- ✅ Quizzes interactivos operativos

---

**🎯 ARCHIVOS CORREGIDOS:**
- `vite.config.ts` → Base path: './'
- `dist/index.html` → Rutas relativas
- `dist/.nojekyll` → Anti-Jekyll

**🌐 Tu aplicación funcionará correctamente!**