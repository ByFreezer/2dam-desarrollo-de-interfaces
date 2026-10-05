# dam2-productos (Ionic + Angular Standalone)

Proyecto completo de la actividad guiada. NO está compilado todavía:
solo tienes que instalar dependencias y arrancarlo.

## 1. Arrancar

```bash
npm install
npm start
```

Se abre en http://localhost:8100
(si prefieres el CLI de Ionic: `npm install -g @ionic/cli` y luego `ionic serve`).

Comprueba: `/inicio`, el botón "Ver productos", la tabla en `/productos`,
el botón de volver, y recargar directamente en `/productos`.

Para comprobar que compila para producción:

```bash
npm run build
```

Genera la carpeta `www/`.

## 2. Git y rama desarrollo

```bash
git init
git add .
git commit -m "Creación inicial de aplicación Ionic Standalone"
git checkout -b desarrollo
git branch --show-current
```

Crea en GitHub un repositorio vacío llamado `dam2-productos` y:

```bash
git remote add origin https://github.com/TU_USUARIO/dam2-productos.git
git push -u origin desarrollo
```

## 3. Vercel

1. vercel.com → Add New Project → Import Git Repository → dam2-productos.
2. `vercel.json` ya indica build (`npm run build`), carpeta de salida (`www`)
   y el rewrite para que `/productos` funcione al recargar.
3. Settings → Git → Production Branch = `desarrollo`, y redeploy.
4. Prueba la URL raíz y `https://TU-APP.vercel.app/productos` directamente.
