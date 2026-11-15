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

Umsetzung, gezielte Korrekturen und Browserabnahme sind abgeschlossen. Der zuletzt visuell geprüfte Funktionsstand ist `e4fcbc63bbfd58ec484b356e7aa6f9fa10839d8a`; Pages-Run `43693937117` ist erfolgreich. Die folgenden Abschnitte dokumentieren die einzelnen gesicherten Schritte und ihre jeweils damaligen offenen Punkte.

## Erster funktionsfähiger Zwischenstand

- Bühne über die gesamte Fensterbreite und -höhe; Kopfzeile und Kapitelleiste ziehen sich für das Finale zurück und bleiben per Tastatur erreichbar.
- Auftakt „Jetzt.“ mit bewusstem Start inklusive Ton, freier Bildraum während Zündung/Aufstieg und RocketLight-Schlussaussage aus dem letzten Filmbild.
- Zurückhaltende Bedienung am Bildrand; Zeitregler und Wiederholung im aufklappbaren Menü „Steuerung“. Nativer Scrollfluss, Filmzeit und Reduced-Motion-Verhalten bleiben erhalten.
- Fester Bildausschnitt 52 % / 25 % wurde anhand echter Filmframes für Desktop, Hochformat und breite Fenster gewählt. Extrem breite Fenster erhalten das gesamte Fahrzeug mit seitlich auslaufendem Bild.
- JavaScript-Syntax und Patch-Whitespace geprüft. Browserprüfung und endgültige Veröffentlichungskontrolle stehen für diesen Zwischenstand noch aus.

## Browserdurchlauf und gezielte Korrekturen

- Erster Funktionsstand `90d4d7077368f9c61c988206c7176e86ba380daa` über Pages-Run `43693119647` erfolgreich ausgeliefert; HTML und die drei geänderten CSS/JS-Dateien bytegleich live bestätigt.
- Chromium bei 1363 × 936: randfüllende Bühne ohne horizontalen Überstand, zurücktretende Navigation, bewusster Start mit Ton, laufender Aufstieg und tatsächliches letztes Bild mit Schlussaussage beobachtet. Zeitregler im aufklappbaren Menü pausiert und wechselt das Filmbild.
- Feinkorrekturen: Scrollhinweis erhält eindeutig seine kleine Schrift; Pfeile als konsistente SVGs; Mausklick erzwingt keine dauerhaft helle Steuerung.
- Kurze reduzierte Fenster erhalten mehr natürliche Dokumenthöhe, damit Abschluss und Masthead sich nicht überschneiden.
- Beim Verlassen des Finales nach oben wird der Film zurückgesetzt; ein erneuter Pitchdurchlauf beginnt wieder am Anfang. Die Scrollanker innerhalb der Stage bleiben erhalten. Gezielte Zustandsproben und JS-Syntax bestanden.
- Browserprüfung des schmalen/kurzen und reduzierten Modus sowie der erneuten Einfahrt folgt auf diesem korrigierten Stand.

## Direkteinstieg bei sehr flachen Fenstern

- Korrigierter Stand `78228de9ebee8aed11559d80d1e40190eeea6cb8` über Pages-Run `43693385812` erfolgreich und bytegleich ausgeliefert.
- 909 × 624: Auftakt füllt den Viewport, Header und untere Rail zurückgezogen, Scrollhinweis korrekt klein, kein horizontaler Überstand.
- 545 × 374: reduzierte Darstellung im normalen Dokumentfluss; Film steht zunächst still. Bewusster Start mit Ton läuft bis zum tatsächlichen Schlussbild. 780px Stage trennt Masthead und Schlussaussage räumlich, Inhalte bleiben über natives Scrollen erreichbar.
- Beim ersten Direktaufruf #start wurde in dieser sehr flachen Ansicht ein Initialisierungsfehler sichtbar: später fertig aufgebaute statische Kapitel verschoben das Sprungziel. Hash-Wiederherstellung wartet nun auf alle defer-Skripte und zwei stabile Layoutintervalle; Nutzereingaben brechen die einmalige Wiederherstellung ab. Isolierte Ablaufprüfung und Syntaxprüfung bestanden; neuer Browser-Direktaufruf wird nach Veröffentlichung geprüft.

## Abschließende Abnahme

Geprüfter Funktionsstand: [`e4fcbc63bbfd58ec484b356e7aa6f9fa10839d8a`](https://github.com/Pogoner/InnovationManagement/commit/e4fcbc63bbfd58ec484b356e7aa6f9fa10839d8a). Zugehörige Veröffentlichung: [Pages-Run 43693937117](https://github.com/Pogoner/InnovationManagement/actions/runs/43693937117), `completed / success`. Live-HTML und `pitch.js` waren bytegleich mit dem Checkout; die geänderten Finale-Dateien wurden bereits auf dem vorigen Funktionsstand bytegleich bestätigt.

[Geprüfter Direkteinstieg](https://pogoner.github.io/InnovationManagement/pitch/?variante=A&v=e4fcbc63#start) – der Versionsparameter verhindert einen alten HTML-Cache.

| Ansicht | Beobachtetes Ergebnis |
| --- | --- |
| 1363 × 936 | Randfüllender Auftakt, freie Zündung/Aufstieg, Schlussaussage im tatsächlichen letzten Frame; Header und Rail treten zurück. Kein horizontaler Überstand. |
| 909 × 624 | Randfüllende Szene mit korrekt kleiner Scrollhilfe und vollständig erreichbarer Randbedienung. Untere Kapitelrail tritt während des Finales zurück. |
| 545 × 374 | Reduzierter Modus im normalen Dokumentfluss. Frischer Direktaufruf liegt nach fertigem Aufbau exakt am Finale (Abweichung unter 1 CSS-Pixel). Kein automatisches Abspielen; bewusst gestarteter Film erreicht das Schlussbild. Kein horizontaler Überstand. |

- „Mit Ton erleben“ startet vom Anfang mit `muted=false`. Der laufende Film lässt die Intro-Schrift verschwinden.
- Abschluss bei `currentTime=26.966666`, `paused=true`, Zustand `complete`: tatsächliches letztes Filmbild, sichtbare und zugängliche Schlussaussage.
- Aufklappbare Steuerung, Seek und Pause im Browser geprüft. Nativer Scrollschritt übernimmt den pausierten Medienfortschritt und führt ihn weiter.
- Schlusslink führt zum Auftakt des Pitchs. Header/Rail erscheinen wieder; der Film wird auf Zeit 0 zurückgesetzt. Erneuter Einstieg zeigt „Jetzt.“ mit aktivem Startknopf und ohne hängenden Schlusszustand.
- Screenshots von Auftakt, Aufstieg, Schluss, offener Steuerung und kompakten Ansichten im Prüflauf visuell kontrolliert. Die neuen Screenshots liegen nicht als dauerhafte Bilddateien in diesem Repository; vorhandene ältere Bilder sind kein Nachweis dieser Revision.

### Prüfgrenzen

Chromium-Desktop; die kompakten CSS-Größen entstanden über Browserzoom. Keine Abnahme auf physischen Mobilgeräten, Safari oder Firefox. Hochformat- und sehr breite Zuschnitte wurden anhand echter Videoframes beurteilt, nicht als zusätzliche Live-Browsergrößen. Keine erneute komplette Prüfung aller acht fachlichen Kapitel oder Fassaden: diese Revision verändert die Finale-Inszenierung und die einmalige initiale Ankerwiederherstellung. Finanzdaten, Varianten, Originalunterlagen und Gebäudegrafiken bleiben unverändert.

### Fortsetzen nach einer Unterbrechung

Nicht neu aufbauen. Code, Medien und Fortschritt liegen auf `main`. Zuerst den aktuellen Main-Commit und den zugehörigen Pages-Lauf bestätigen. Diese Revision ist abgeschlossen; weitere gestalterische Änderungen auf konkretes neues Feedback ausrichten.
