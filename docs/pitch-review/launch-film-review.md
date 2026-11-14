# Abnahme: kontinuierlicher Startfilm und Glasfassaden

Stand: 14. November 2026. Repository `Pogoner/InnovationManagement`, Branch `main`.

## Ergebnis

Der Pitch verwendet einen durchgängigen 27-Sekunden-Film statt der früheren verkleinerten Bildrakete mit anschließendem Motivwechsel. MP4-Bild und eingebettetes, zuschaltbares Sounddesign folgen einer Medienzeit. Die Überschrift tritt zur Zündung zurück; Bedienelemente bleiben unabhängig davon erreichbar. Der Film hält am Ende sein tatsächliches letztes Bild.

Beide Erdgeschosse verwenden gezielt transparente Glasflächen. Dach, Tragwerk und Möblierung werden nicht pauschal mit ausgeblendet. Dieselben Fassaden-Assets sind in Pitch und eigenständiger Roadmap eingebunden; deren veralteter JS-Cacheverweis wurde korrigiert.

## Veröffentlichungsnachweis des Funktionsstands

- Commit: [2be4001a36dae97c736b5fade6287c1937c9b053](https://github.com/Pogoner/InnovationManagement/commit/2be4001a36dae97c736b5fade6287c1937c9b053).
- Pages: [Lauf 43647907299](https://github.com/Pogoner/InnovationManagement/actions/runs/43647907299), completed/success.
- [Pitch](https://pogoner.github.io/InnovationManagement/pitch/#start), [Roadmap](https://pogoner.github.io/InnovationManagement/teil6/).
- `pitch/index.html`, `film-launch.js` und `film-launch.css` waren bei der Kontrolle bytegleich mit dem veröffentlichten Commit. MP4, Poster und beide Glas-SVGs waren bereits im vorherigen Medienstand live bytegleich; die MP4 wird mit HTTP 200, video/mp4 und Byte-Range-Unterstützung ausgeliefert.

## Tatsächlich geprüfte Browserzustände

| Prüfung | Beobachtung |
| --- | --- |
| MP4-Wiedergabe | 1280 × 672, 27 s; Zündung, Rauch, Abheben und kameraverfolgter Aufstieg aus derselben Aufnahme |
| Standardton | Stumm; Ton erst nach Betätigung des Tonschalters aktiviert |
| Filmende | Bei 26,9667 s pausiert, Status abgeschlossen; kein zusätzliches Schlussmotiv |
| Wiederholung | Startet die gleiche Aufnahme wieder bei 0 s |
| Pause und Scrollen | Pause hält die Medienzeit; weiterer Scrollschritt setzt daran an; vorwärts und rückwärts erreichbar |
| Zeitleiste | Nativer Range-Regler sucht direkt im Film, z. B. 52 % → 14,02 s |
| Reduzierte Bewegung | Zunächst stilles erstes Bild; ausdrücklicher Klick startet den Film auch in diesem Modus |
| Wechsel aus dem Finale | Film ist beim Besuch anderer Pitchkapitel pausiert |
| Fassaden A/B im Pitch | Gebauter Pavillon und Lounge in Bau-/Servicephase visuell geprüft; gläsernes EG, sichtbares Tragwerk und Tische |
| Fassaden A/B in Teil 6 | Beide Varianten in der Pilotphase angezeigt, zugehörige Originalplan-Inhalte wechseln mit |
| Breite Ansicht | 1363 × 936 CSS-px; Filmfläche und Bedienelemente gemeinsam sichtbar |
| Kompakte Ansicht | 909 × 624 CSS-px; vollständiger Filmausschnitt, erreichbare Steuerung |
| Schmale/flache Ansicht | 545 × 374 CSS-px; normaler Seitenfluss, umbruchfähige Steuerung, kein horizontaler Überlauf |

Die Größen unterhalb der Desktopansicht wurden über Browserzoom geprüft. Visuelle Browseraufnahmen wurden während der Prüfung erfasst. Die protokollierten Konsolenmeldungen betrafen die Browsererweiterung, nicht den Seitencode.

## Weitere Prüfungen und Grenzen

- JavaScript-Syntax von `pitch.js`, `film.js` und `film-launch.js` geprüft; `git diff --check` ohne Befund. Eingebundene CSS-/JS-Versionsparameter aus den jeweiligen SHA-256-Präfixen erneuert.
- Der Controller wurde zusätzlich mit isolierten DOM-/Medienstubs auf Scrollanker, Wiedergabe-/Pause-Übergänge, Replay, Ende, Ton und Pause bei verborgenem Tab geprüft. Das ist kein Ersatz für Browserprüfung.
- Ein tatsächlicher Wechsel in einen verborgenen Browser-Tab ließ sich mit dem verwendeten Fernbrowser nicht verlässlich herstellen; dieser Pfad ist durch Code- und Zustandsprüfung abgedeckt.
- Keine Tests auf physischen Mobilgeräten oder in Safari/Firefox. Der Tonschalter und die Medienzustände wurden geprüft, keine separate akustische Qualitätsabnahme durchgeführt.
- Herkunft und Bearbeitung des Films stehen in [launch-media.md](../../pitch/assets/launch-media.md). Das NASA-Material dokumentiert einen realen Start; die Gebäude- und Dinnerbilder bleiben Konzeptvisualisierungen.

## Sicherung

Die Wiederaufnahme wurde als eigener Dokumentationsstand `db46942` gesichert. Der erste vollständige Funktionsstand ist `2be4001`. Die abschließende Dokumentationsaktualisierung und der kleine Hinweistext-Fix folgen als weiterer separater Commit; dessen Identität ist aus der Repository-Historie ersichtlich. Kein erneuter Medienaufbau erforderlich.
