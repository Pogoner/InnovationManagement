# RocketLight Dinner · Pitch

Semesterprojekt Innovationsmanagement (THWS, Trend2Business, Gruppe 2): Pitch zu SpaceX und der Idee „RocketLight Dinner“.

| Ordner | Inhalt |
|---|---|
| [`pitch/`](pitch/) | Die Präsentation (statische Scroll-Seite) und die Buchungsseite `buchen.html` für das Publikum |
| [`rechner/`](rechner/) | Innovationsrendite-Rechner nach Prof. Dr. Gerhard Hube (THWS) |
| [`quellen/`](quellen/) | Originaldokumente zu den Schritten 1–7 (Excel, PowerPoint) |
| [`server/`](server/) | Kleiner Node.js-Server für die Live-Buchungen, siehe [server/README.md](server/README.md) |

## Teil 6: aktueller Planstand

Seit dem 20.11.2026 plant Teil 6 einen festen Pavillon in Florida und langfristig einen zweiten festen Standort in Texas. Termine, Freigaben und die Grenze der bisherigen Budgetreferenz stehen im [Roadmap-Planstand](pitch/roadmap-planstand.md) und in den [aktuellen Roadmap-Folien](quellen/step-6-roadmap-fester-pavillon.pptx). Die übrigen Kapitel und der Finanzrechner behalten ihre bisherigen Annahmen. `quellen/step-6-roadmap-pavillon.pptx` dokumentiert das frühere mobile Konzept.

## Starten

```
npm start
```

Dann `http://localhost:8080/pitch/` öffnen (Rechner: `/rechner/`, Quellen: `/quellen/<datei>`). Ohne den Server funktionieren Präsentation und Rechner ebenfalls, nur die Live-Buchung nicht (z. B. mit `python -m http.server`).

## Veröffentlichung

- **Azure/Container:** `Dockerfile` im Stamm, Anleitung in [server/README.md](server/README.md).
- **GitHub Pages:** Branch `main`, Ordner `/ (root)`. Das Root-`index.html` leitet auf `pitch/` weiter, `.nojekyll` muss bleiben.

Nach Änderungen an eingebundenem CSS/JS die `?v=`-Version im jeweiligen HTML erneuern (erste zwölf Hex-Zeichen des SHA-256 der Datei).

Studentisches Konzept, kein Angebot von SpaceX.
