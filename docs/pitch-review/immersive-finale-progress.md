# Revision: Das Finale als Teil der Website

## Anlass und bestätigter Ausgangspunkt

15. November 2026. Der Nutzer beurteilt die technisch funktionierende Fassung als eingebettetes Video; es fehlt die gestalterische Vision. Ausgangsstand: `ec533d5ed800bd3b79be547cd8413a1dec5715db`, Branch `main`. Film, Poster, Glasfassaden und gemeinsame Medien-/Scrollsteuerung bleiben als Basis erhalten.

## Regie

1. **Erwartung:** Das erste reale Filmbild übernimmt den gesamten Bildraum. Eine einzige große Aussage – „Jetzt.“ – bündelt den Abschluss der acht Kapitel. „Mit Ton erleben“ startet die Aufnahme und das Sounddesign bewusst gemeinsam; Scrollen bleibt möglich.
2. **Ereignis:** Zur Zündung verschwinden die große Schrift und die vorher dominante Webnavigation. Die echte Aufnahme trägt Bewegung, Feuer, Rauch und Kameraführung. Kein zusätzlicher Raketenzoom, künstlicher Countdown oder dekoratives Dauerwackeln.
3. **Nachklang:** Im letzten Teil derselben Aufnahme erscheint die RocketLight-Marke mit „Dinieren, wenn die Zukunft abhebt.“ Der Schluss bleibt auf dem echten letzten Bild.

## Darstellung und Bedienung

- Randfüllende Stage einschließlich bisheriger Header-/Rail-Fläche; keine separate Playerzone.
- Pause und Ton klein am Bildrand; Zeitregler, Zeitcode und Wiederholung in einer ausdrücklich aufklappbaren Steuerung. Tastatur und Touch bleiben bedienbar.
- Header und Kapitelrail werden nur im aktiven Finale zurückgenommen und erscheinen außerhalb wieder; kein Scroll-Lock. Tastaturfokus kann die Navigation sichtbar halten.
- Native reduzierte Bewegung behält einen ruhigen Einstieg und ausdrücklich startbare Wiedergabe; kein automatischer Ton.
- Desktop-, Portrait- und breite Ausschnitte gegen reale Frames prüfen.

## Aktueller Sicherungsstand

Die Regie ist dokumentiert. Umsetzung und neue Browserprüfung sind noch offen. Der vorherige Funktionsstand ist vollständig auf GitHub erhalten. Nächster Sicherungsschritt: die zusammen funktionierenden HTML-/CSS-/Controlleränderungen samt Versionsparametern.

## Erster funktionsfähiger Zwischenstand

- Bühne über die gesamte Fensterbreite und -höhe; Kopfzeile und Kapitelleiste ziehen sich für das Finale zurück und bleiben per Tastatur erreichbar.
- Auftakt „Jetzt.“ mit bewusstem Start inklusive Ton, freier Bildraum während Zündung/Aufstieg und RocketLight-Schlussaussage aus dem letzten Filmbild.
- Zurückhaltende Bedienung am Bildrand; Zeitregler und Wiederholung im aufklappbaren Menü „Steuerung“. Nativer Scrollfluss, Filmzeit und Reduced-Motion-Verhalten bleiben erhalten.
- Fester Bildausschnitt 52 % / 25 % wurde anhand echter Filmframes für Desktop, Hochformat und breite Fenster gewählt. Extrem breite Fenster erhalten das gesamte Fahrzeug mit seitlich auslaufendem Bild.
- JavaScript-Syntax und Patch-Whitespace geprüft. Browserprüfung und endgültige Veröffentlichungskontrolle stehen für diesen Zwischenstand noch aus.
