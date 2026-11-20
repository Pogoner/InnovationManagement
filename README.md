# RocketLight Dinner · Pitch

Semesterprojekt Innovationsmanagement: Pitch zu SpaceX und der Idee „RocketLight Dinner“.

**Live: [rocketlight-pitch.azurewebsites.net](http://rocketlight-pitch.azurewebsites.net/)**

## Inhalt

| Was | Online | Im Repository |
|---|---|---|
| Präsentation (Pitch) | [/pitch/](http://rocketlight-pitch.azurewebsites.net/pitch/) | [pitch/index.html](pitch/index.html) |
| Menü buchen (für das Publikum) | [/pitch/buchen.html](http://rocketlight-pitch.azurewebsites.net/pitch/buchen.html) | [pitch/buchen.html](pitch/buchen.html) |
| Quellen: Excel- und PowerPoint-Dokumente zu den Schritten 1–8 | [GitHub: quellen/](https://github.com/Pogoner/InnovationManagement/tree/main/quellen) | [quellen/](quellen/) |

Die Seiten sind statisch (HTML, CSS, JavaScript, kein Build-Schritt). Zum Ansehen genügt es, die [index.html](index.html) im Projektordner (oder direkt `pitch/index.html`) per Doppelklick im Browser zu öffnen. Sie leitet auf den Pitch weiter. Nur die Live-Buchung braucht den Server.

## Team

Islam Abdalla · Matthias Dölker · Maren Ell · Asma Ul Haq · Alexander Lenard · Marius Riesle

## Lokal mit Server starten

```
npm start
```

Dann `http://localhost:8080/pitch/` öffnen. Der Node.js-Server in [server/](server/) liefert `pitch/` und `quellen/` aus und speichert die Buchungen. Bereitstellung auf Azure: [server/README.md](server/README.md).

Studentisches Konzept, kein Angebot von SpaceX.
