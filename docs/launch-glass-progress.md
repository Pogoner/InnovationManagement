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

## Offene Arbeit

1. Durchgängige NASA-Startaufnahme beschaffen, Herkunft und Nutzbarkeit dokumentieren, lokal komprimiert speichern.
2. Filmcontroller und Gestaltung in `pitch/film-launch.js`, `pitch/film-launch.css` und den bestehenden Zeitgeber integrieren; kein Autoplay-Ton, kein Austausch durch ein fremdes Schlussbild.
3. Beide Gebäude gezielt transparent komponieren; dieselben Assets im Pitch und in `teil6/` verwenden.
4. Tatsächliche Browserprüfung: Scrollen vorwärts/rückwärts, Abspielen, Pause, Ende/Wiederholung, Ton, A/B-Wechsel, schmale/flache Ansicht und reduzierte Bewegung.
5. Eigene Commit-SHAs und Pages-Veröffentlichung verifizieren.

## Sicherungsregel für diese Arbeit

Jeden funktionsfähigen Teil unmittelbar committen und pushen. Diese Notiz bei jedem Meilenstein aktualisieren. Assets und die sie ladende Oberfläche gemeinsam sichern; eingebundene CSS-/JS-Hashes gemäß `AGENTS.md` erneuern. Keine ausstehenden Änderungen ausschließlich im Chat dokumentieren.

## Meilenstein 1: Glasfassaden

Beide Gebäudekomposite sind in `teil6/pavilion-glass.svg` und `teil6/lounge-glass.svg` gespeichert und in Pitch sowie eigenständiger Roadmap eingebunden. Die Glasebenen lassen die dahinterliegende Landschaft durch; Dach, Pfosten, Geschossdecke, Boden und Möblierung bleiben deckend. Herkunft und Reproduktion stehen in `teil6/asset-notes.md` und `docs/pitch-review/build-glass-assets.mjs`. SVG-Rendervergleich und JavaScript-Syntax geprüft. Prüfung in der veröffentlichten Oberfläche steht noch aus.
