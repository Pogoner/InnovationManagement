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

Seit dem 20.11.2026 plant Teil 6 einen festen Pavillon in Florida und langfristig einen zweiten festen Standort in Texas. Termine, Freigaben und die Grenze der bisherigen Budgetreferenz stehen im [Roadmap-Planstand](pitch/roadmap-planstand.md) und in den [aktuellen Roadmap-Folien](quellen/step-6-roadmap-fester-pavillon.pptx). Die übrigen Kapitel und der Finanzrechner behalten ihre bisherigen Annahmen. `quellen/step-6-roadmap-pavillon.pptx` dokumentiert das frühere mobile Konzept.

## Lokal mit Server starten

```
npm start
```

Dann `http://localhost:8080/pitch/` öffnen. Der Node.js-Server in [server/](server/) liefert `pitch/`, `rechner/` und `quellen/` aus und speichert die Buchungen. Bereitstellung auf Azure: [server/README.md](server/README.md).

Studentisches Konzept, kein Angebot von SpaceX.
