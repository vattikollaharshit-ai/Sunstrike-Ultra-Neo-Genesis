# Sunstrike Ultra — HUD (GitHub-ready)

Solo-Leveling HUD theme, GTA mode, Practice, Calculations, Progress graphs (CDN).

Files: index.html, practice.html, gta.html, calc.html, progress.html, tests.html, utils.js, styles.css

To deploy:
1. Push these files to a GitHub repo (main branch).
2. In repo Settings → Pages → Source: main, root.
3. Visit https://<your-username>.github.io/<repo>/index.html

Notes:
- Charts use Chart.js CDN (included in progress.html).
- Excel exports use SheetJS CDN (included where needed).
- All data is stored in browser `localStorage` (so it persists between sessions on the same browser).