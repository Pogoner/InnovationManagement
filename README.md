# RocketLight Dinner · Pitch

Semesterprojekt Innovationsmanagement: Pitch zu SpaceX und der Idee „RocketLight Dinner“.

**Live: [rocketlight-pitch.azurewebsites.net](http://rocketlight-pitch.azurewebsites.net/)**

## Inhalt

| Was | Online | Im Repository |
|---|---|---|
| Präsentation (Pitch) | [/pitch/](http://rocketlight-pitch.azurewebsites.net/pitch/) | [pitch/index.html](pitch/index.html) |
| Menü buchen (für das Publikum) | [/pitch/buchen.html](http://rocketlight-pitch.azurewebsites.net/pitch/buchen.html) | [pitch/buchen.html](pitch/buchen.html) |
| Innovationsrendite-Rechner nach Prof. Dr. Gerhard Hube  | [/rechner/](http://rocketlight-pitch.azurewebsites.net/rechner/) | [rechner/index.html](rechner/index.html) |
| Quellen: Excel- und PowerPoint-Dokumente zu den Schritten 1–7 | [GitHub: quellen/](https://github.com/Pogoner/InnovationManagement/tree/main/quellen) | [quellen/](quellen/) |

Die Seiten sind statisch (HTML, CSS, JavaScript, kein Build-Schritt). Zum Ansehen genügt es, `pitch/index.html` oder `rechner/index.html` im Browser zu öffnen. Nur die Live-Buchung braucht den Server.

## Team

Islam Abdalla · Matthias Dölker · Maren Ell · Asma Ul Haq · Alexander Lenard · Marius Riesle

## Teil 6: aktueller Planstand

Seit dem 20.11.2026 plant Teil 6 einen festen Pavillon in Florida und langfristig einen zweiten festen Standort in Texas. [Roadmap-Planstand](pitch/roadmap-planstand.md), [aktuelle Roadmap-Folien](quellen/step-6-roadmap-fester-pavillon.pptx) und [Fünfjahresrechnung](quellen/step-4-rocketlight-fester-pavillon.xlsx) verwenden dasselbe studentische Florida-Arbeitsszenario: 13,38 Mio. USD für Investition und Anlauf, laufende Kosten zusätzlich. Die vier Piloten liegen in 2028–2029; der spätere Hochlauf ist eine Annahme. Website und Excel zeigen Cashflow und Sensitivität vor Finanzierung und Steuern. Bauumfang und Angebote müssen den Budgetansatz an G2 validieren; Texas ist separat.

Die Budgetüberleitung und fünf offiziell recherchierte Anlaufstellen mit Anschriften und Telefonnummern sind im Pitch aufklappbar und in der Roadmap-PPTX enthalten. Die ursprüngliche mobile Finanzrechnung bleibt im Kalkulator als Vorbewertung erkennbar; ihre 3,48 Mio. USD werden nicht hinzugerechnet. `quellen/step-6-roadmap-pavillon.pptx` und der frühere `pitch_pdf_export.pdf` dokumentieren ältere Stände. Für einen aktuellen Gesamtexport die Druckfunktion der Website verwenden.

`node quellen/verify-finance.mjs` prüft den gemeinsamen Zahlen- und Terminstand. Die aktuellen Office-Dateien lassen sich mit `quellen/build-finance.mjs` und `quellen/build-roadmap.mjs` nachvollziehbar erzeugen.

## Lokal mit Server starten

```
npm start
```

Dann `http://localhost:8080/pitch/` öffnen. Der Node.js-Server in [server/](server/) liefert `pitch/`, `rechner/` und `quellen/` aus und speichert die Buchungen. Bereitstellung auf Azure: [server/README.md](server/README.md).

Studentisches Konzept, kein Angebot von SpaceX.
