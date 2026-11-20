# RocketLight Dinner · Pitch

Semesterprojekt Innovationsmanagement: Pitch zu SpaceX und der Idee „RocketLight Dinner“.

**Live: [rocketlight-pitch.azurewebsites.net](http://rocketlight-pitch.azurewebsites.net/)**

## Inhalt

| Was | Online | Im Repository |
|---|---|---|
| Präsentation (Pitch) | [/pitch/](http://rocketlight-pitch.azurewebsites.net/pitch/) | [pitch/index.html](pitch/index.html) |
| Menü buchen (für das Publikum) | [/pitch/buchen.html](http://rocketlight-pitch.azurewebsites.net/pitch/buchen.html) | [pitch/buchen.html](pitch/buchen.html) |
| Quellen: Excel- und PowerPoint-Dokumente zu den Schritten 1–8 | [GitHub: quellen/](https://github.com/Pogoner/InnovationManagement/tree/main/quellen) | [quellen/](quellen/) |

Die Seiten sind statisch (HTML, CSS, JavaScript, kein Build-Schritt). Zum Ansehen genügt es, `pitch/index.html` im Browser zu öffnen. Nur die Live-Buchung braucht den Server.

## Team

Islam Abdalla · Matthias Dölker · Maren Ell · Asma Ul Haq · Alexander Lenard · Marius Riesle

## Teil 6: Roadmap & Umsetzung

Fester Pavillon in Titusville, Florida (Umsetzungshorizont 2026–2031): fünf Freigaben (G0–G4), vier Pilot-Dinner und ein Betriebsentscheid an G4. Plantermine und Ablauf stehen im [Roadmap-Planstand](pitch/roadmap-planstand.md); die vollständige Planung mit Ansprechpartnern, Budget- und Beschaffungsplanung und Quellenverzeichnis liegt als [Roadmap-Präsentation](quellen/Schritt_6_Roadmap.pptx) vor.

## Lokal mit Server starten

```
npm start
```

Dann `http://localhost:8080/pitch/` öffnen. Der Node.js-Server in [server/](server/) liefert `pitch/` und `quellen/` aus und speichert die Buchungen. Bereitstellung auf Azure: [server/README.md](server/README.md).

Studentisches Konzept, kein Angebot von SpaceX.
