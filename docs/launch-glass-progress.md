# Arbeitsstand: Glasfassaden und filmischer Raketenstart

## Auftrag

Das Erdgeschoss beider Gebäudevarianten soll durchgängig verglast sein. Dach, Tragwerk und einzelne Zweiertische behalten ihre Substanz; die Sicht zur Rakete muss durch den Raum hindurch nachvollziehbar werden. Das Pitch-Finale ersetzt die bisherige schrumpfende Bildrakete und den unpassenden Bildwechsel durch eine durchgängige reale Startaufnahme mit kohärenter Kamera, Feuer, Rauch und Licht. Scrollen, Echtzeitwiedergabe, Pause, Wiederholung, optionaler Ton und reduzierte Bewegung bleiben bedienbar.

## Gesicherter Ausgangspunkt

- Repository: `Pogoner/InnovationManagement`, Branch `main`.
- Überprüfter Ausgangscommit: `612dc8620dbeca149186de255cc0f80c4e9ce295`.
- Veröffentlichung: GitHub Pages aus `main`, `/ (root)`.
- Pitch: https://pogoner.github.io/InnovationManagement/pitch/
- Eigenständige Roadmap: https://pogoner.github.io/InnovationManagement/teil6/
- Bei Wiederaufnahme waren die früher angekündigten Film- und Glasänderungen weder auf `main` noch in den aktuellen Arbeitsdateien vorhanden. Die frühere Chat-Zusammenfassung ist keine Implementierungsbestätigung.

## Arbeitspakete der Wiederaufnahme (inzwischen erledigt)

1. Durchgängige NASA-Startaufnahme beschaffen, Herkunft und Nutzbarkeit dokumentieren, lokal komprimiert speichern.
2. Filmcontroller und Gestaltung in `pitch/film-launch.js`, `pitch/film-launch.css` und den bestehenden Zeitgeber integrieren; kein Autoplay-Ton, kein Austausch durch ein fremdes Schlussbild.
3. Beide Gebäude gezielt transparent komponieren; dieselben Assets im Pitch und in `teil6/` verwenden.
4. Tatsächliche Browserprüfung: Scrollen vorwärts/rückwärts, Abspielen, Pause, Ende/Wiederholung, Ton, A/B-Wechsel, schmale/flache Ansicht und reduzierte Bewegung.
5. Eigene Commit-SHAs und Pages-Veröffentlichung verifizieren.

## Sicherungsregel für diese Arbeit

Jeden funktionsfähigen Teil unmittelbar committen und pushen. Diese Notiz bei jedem Meilenstein aktualisieren. Assets und die sie ladende Oberfläche gemeinsam sichern; eingebundene CSS-/JS-Hashes gemäß `AGENTS.md` erneuern. Keine ausstehenden Änderungen ausschließlich im Chat dokumentieren.

## Meilenstein 1: Glasfassaden

Beide Gebäudekomposite sind in `teil6/pavilion-glass.svg` und `teil6/lounge-glass.svg` gespeichert und in Pitch sowie eigenständiger Roadmap eingebunden. Die Glasebenen lassen die dahinterliegende Landschaft durch; Dach, Pfosten, Geschossdecke, Boden und Möblierung bleiben deckend. Herkunft und Reproduktion stehen in `teil6/asset-notes.md` und `docs/pitch-review/build-glass-assets.mjs`. SVG-Rendervergleich und JavaScript-Syntax geprüft. Prüfung in der veröffentlichten Oberfläche steht noch aus.

## Meilenstein 2: Startfilm gesichert

Durchgängiger NASA-Auszug (27 Sekunden) mit eigenem zuschaltbarem Sounddesign ist lokal im Projekt gespeichert: `pitch/assets/starship-launch-27s.mp4` (3,94 MB). Poster: erstes Filmbild, kein fremdes Motiv. Herkunft und Bearbeitung: `pitch/assets/launch-media.md`. Filmzeit enthält bereits die synchronisierte AAC-Spur. Controller/Bedienelemente und Browserprüfung sind noch offen.

## Wiederaufnahme: gesicherter Stand erneut bestätigt

- `main` steht bei `04ee562a6478b42704cf87b0e67f7099073a918b`; die vorherigen Schritte sind diesmal erhalten.
- Glasfassaden: `7c06b273a2abdec5cba306f7a33597e48842c407`, in Pitch und eigenständiger Roadmap eingebunden.
- Startfilm samt AAC-Sounddesign und Poster: `04ee562a6478b42704cf87b0e67f7099073a918b`.
- Pages-Veröffentlichung genau dieses Commits: Lauf `43646934532`, erfolgreich.
- Die vorhandenen Dateien `film-launch.js` und `film-launch.css` enthalten noch den früheren Bildlayer-Controller. Dateiexistenz bedeutet hier nicht, dass der Film schon integriert ist.
- Nächster kleiner Sicherungsschritt: Filmcontroller, Bedienelemente und gemeinsame Scroll-Anbindung. Danach gezielte Browserprüfung und eigene Pages-Veröffentlichung bestätigen.

## Meilenstein 3: Film mit Oberfläche verbunden

`pitch/film-launch.js` verwendet jetzt das gesicherte MP4 mit gemeinsamer Bild-/Tonzeit. Play/Pause, Wiederholung, Ton und native Zeitleiste stehen außerhalb der ausblendbaren Überschrift. Der bisherige 11-Sekunden-Timer und die Bildlayer entfallen. `pitch.js` und `film.js` übergeben den Scrollfortschritt an den Controller; nach manuellem Abspielen oder Seek wird die Scrollabbildung am aktuellen Filmbild fortgesetzt. Außerhalb der Ansicht und bei verborgenem Tab wird pausiert. Reduzierte Bewegung hält ein ruhiges Bild; bewusstes Abspielen bleibt möglich. Der Schluss hält das echte letzte Filmbild.

Der veraltete `film-site.js`-Cacheverweis der eigenständigen Roadmap ist korrigiert. Syntax und eine isolierte Zustandsprüfung des Controllers sind bestanden; die tatsächliche Browser- und Live-Prüfung dieses Meilensteins folgt im nächsten Schritt.

## Abschluss: veröffentlicht und im Browser geprüft

- Funktionsstand: `2be4001a36dae97c736b5fade6287c1937c9b053`. Pages-Lauf `43647907299` ist erfolgreich; die ausgelieferten HTML-/JS-/CSS-Dateien waren bytegleich mit dem Commit.
- Im Live-Browser geprüft: echte MP4-Wiedergabe, Ende bei 26,9667 s mit tatsächlichem Schlussbild, Wiederholung ab Anfang, Pause, Seek über die native Zeitleiste und opt-in Ton. Nach Pause führte ein kleiner Scrollschritt von 3,49 s auf 5,09 s, ohne zum bisherigen Scrollzeitpunkt zurückzuspringen. Rückwärtsscrollen führt die Aufnahme wieder zurück.
- Reduzierte Bewegung zeigt zunächst das ruhige erste Bild; bewusstes Abspielen funktioniert auch dann. Die schmale/flache Ansicht wechselt in den normalen Seitenfluss.
- Fassaden A und B im Pitch in Bau-/Servicephase und in der eigenständigen Roadmap geprüft. Dach, Stützen, Tische und Lounge-Obergeschoss bleiben sichtbar; das EG lässt die Landschaft durch.
- Layoutprüfung bei 1363 × 936, 909 × 624 und 545 × 374 CSS-Pixeln. Kompakte Größen über Browserzoom, keine physischen Mobilgeräte. Kein horizontaler Seitenüberlauf in den geprüften Zuständen.
- Der pausierte Zustand im reduzierten Modus erhält einen passenden Hinweis ohne Scrollaufforderung. README und Prüfnotiz sind auf den tatsächlichen Film umgestellt.
- Ausführliche Prüfergebnisse und Grenzen: `docs/pitch-review/launch-film-review.md`.

### Bei einer erneuten Unterbrechung

Nicht von vorn beginnen. Film, Poster, Glas-SVGs, Controller und Bedienelemente liegen auf `main`. Den neuesten Commit und seinen Pages-Lauf lesen; nur konkret offene neue Befunde weiterbearbeiten. Der Auftrag ist funktional abgeschlossen.

## Gestalterische Revision vom 15. November 2026

Der Nutzer wünscht eine stärkere Integration des Starts in die Website. Der bisherige Funktionsabschluss bleibt dokumentiert; die neue Inszenierung ist ein zusätzlicher Auftrag. Aktueller Plan und Sicherungsstand: [immersive-finale-progress.md](pitch-review/immersive-finale-progress.md).
