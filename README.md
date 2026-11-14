# InnovationCalculator

Innovationsrendite-Rechner nach dem Inno-Rendite-Kalkulator von Prof. Dr. Gerhard Hube (THWS) – Trend2Business-Projekt SpaceX, Gruppe 2.

- Statische Website ohne Build-Schritt oder eigenes Backend. Die Hauptseite hat die Reiter „Eigene Idee prüfen“, „SpaceX-Case“, „RocketLight Dinner“ und „Methode & Quellen“. Der Reiter „SpaceX-Case“ ist eine durchgehende Erzählung: Zwischen den Kapiteln mit allen Diagrammen stehen Szenen, in denen dieselben zwölf Ideen-Punkte vom Sternenfeld über Trends, How-Wow-Now-Matrix, Finalisten, Bewertung, 5-Jahres-Zahlen und Portfolio bis zum Ranking wandern; die Schrittleiste springt zum jeweiligen Kapitel. Der Reiter „RocketLight Dinner“ ist ebenso eine durchgehende Seite (Erlebnis, Menü, Reservieren, Countdown); die Teil-6-Schritte führen weiter auf `teil6/`. „Eigene Idee prüfen“ bleibt ein schrittweiser Ablauf. Die Teil-6-Seite liegt in `teil6/`.
- Dateien: `index.html` bindet `assets/css/*.css` und `assets/js/*.js` ein (Aufteilung siehe [AGENTS.md](AGENTS.md)). Bei Änderungen an CSS/JS die `?v=`-Version in `index.html` erneuern (erste zwölf Hex-Zeichen des SHA-256 der Datei).
- Finalisten des SpaceX-Case: RocketLight Dinner, Starlink Insights und SpaceX Launch Engineering Cloud – jeweils als Team-Bewertung und als KI-Bewertung (Claude) mit 5-Jahres-Kalkulation. Gespeicherte Arbeitsmappen erhalten die beiden neuen KI-Bewertungen einmalig per Migration.
- Hosting: GitHub → Settings → Pages → Branch `main`, Ordner `/ (root)`. Sobald Pages für das jeweilige Repository eingerichtet ist, startet ein Push auf `main` den Veröffentlichungsablauf. Ein neuer Fork übernimmt diese Hosting-Einstellung nicht automatisch. `.nojekyll` kennzeichnet die Dateien für die direkte statische Auslieferung.
- Rechenlogik: IR = IN / IA, Bilanz = IN − IA, Portfolio-Kategorien < 2 / 2–3 / ≥ 3; 5-Jahres-Kalkulation mit Gewinnanteil- und Kostenanteil-Skala wie im Excel-Tool.
- Daten werden im Browser gespeichert; Austausch über Export/Import (JSON) unter „Gewichtung & Daten“.

## Gemeinsam gestalten · Einstieg für Mitbearbeitende und Coding-Agenten

**Für neue und überarbeitete Oberflächen gilt die [Designrichtlinie in DESIGN.md](DESIGN.md).** Die filmische Roadmap ist die Referenz für die gemeinsame Bildsprache: ruhige dunkle Flächen, klare Typografie, gezielte Akzente und Übergänge, die den Inhalt erklären. Rechner und Datenansichten bleiben unmittelbar bedienbar. Die Prinzipien gelten für alle Beiträge; das Raketenmotiv gehört zum Dinner-Case.

| Datei | Zweck |
| --- | --- |
| [DESIGN.md](DESIGN.md) | Gemeinsame Regeln für Farben, Typografie, Layout, Bildsprache, Animation, Bedienbarkeit und angemessene Prüfung |
| [AGENTS.md](AGENTS.md) | Projektweite Arbeitsanweisungen für Codex und andere Coding-Agenten; verweist bei UI-Arbeit verbindlich auf die Designrichtlinie |
| [CLAUDE.md](CLAUDE.md) | Einstieg für Claude Code; importiert dieselbe `AGENTS.md`, damit keine zweite Regelsammlung entsteht |

Zum Start den aktuellen Repository-Stand im Coding-Agenten öffnen. Für einen neuen Beitrag kann der Auftrag beispielsweise so beginnen:

> Lies AGENTS.md und für die Gestaltung DESIGN.md. Ergänze meinen Bereich [Bereich/Inhalt] im gemeinsamen Stil der Website. Übernimm die vorhandenen Komponenten und Datenkonventionen. Passe die Inszenierung an den Inhalt an und prüfe die betroffenen Ansichten, Navigation und reduzierte Bewegung.

Codex verwendet `AGENTS.md` als Repository-Anweisung; Claude Code unterstützt den Import über `CLAUDE.md`. Die Dateien müssen dem jeweiligen Agenten im Projekt verfügbar sein. In einem normalen Chat ohne Repository-Zugriff diese Dateien ausdrücklich mitgeben. Die Konventionen sind in der [OpenAI-Dokumentation](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex) und der [Claude-Code-Dokumentation](https://code.claude.com/docs/en/memory) beschrieben.

Gemeinsame Designänderungen zentral in `DESIGN.md` pflegen. Eine kleine Inhaltsänderung verlangt keinen Umbau anderer Teambeiträge; die Prüftiefe richtet sich nach dem geänderten Verhalten.

## Alternative Pitch-Ansicht · Schritte 1–8

[`pitch/`](pitch/) führt als auswählbare Scroll-Seite durch Unternehmen, Innovationsprüfstand, Trends und Ideen, Bewertung, Marktzugang, Roadmap, ganzheitliches Innovationsmanagement und kritische Methodenevaluation. Die Hauptnavigation bietet „Pitch · 1–8“; weitere Einstiege liegen im Dinner-Erlebnis und in der Roadmap. `#pitch` auf der Hauptseite leitet ebenfalls dorthin. Die bestehenden Arbeitsansichten bleiben erreichbar. Alle Seitenverweise sind relativ und funktionieren auch unter dem Projektpfad `/InnovationManagement/` des Forks.

Der seitliche Countdown zeigt den Präsentationsfortschritt und mündet im inszenierten Raketenstart; auf schmalen Ansichten wird er zur unteren Kapitelleiste. Kapitel können direkt über `#schritt-1` bis `#schritt-8` aufgerufen werden. Native Scroll-/Tastaturbedienung, reduzierte Bewegung und flache Fenster erhalten eine lesbare Darstellung. Der Start kann auch per Button ausgelöst werden.

Die Pitch-Kapitel sind als acht große, scrollgesteuerte Filmszenen angelegt. In einer gemeinsamen Landschaft entstehen Orbitlinien, Technologievergleiche, Trendportfolio und Auswahl, die Umsatzkurve, zehn Zweiertische mit zwanzig Plätzen und die Architektur. In Kapitel 7 verbinden sich die vier Managementempfehlungen zu einem gemeinsamen Antrieb. Kapitel 8 prüft die Methoden systematisch und benennt die noch offenen Nachweise. Die Szenen lassen sich vorwärts und rückwärts scrollen oder über ihre Phasenpunkte direkt ansteuern. Unter jeder Szene öffnet „Hinter der Szene“ den vollständigen bisherigen Kapitelinhalt; `#belege-1` bis `#belege-8` öffnen diese Vertiefungen direkt.

`pitch/film-story.js` führt die kurzen Aussagen, `film-analysis.js` und `film-experience.js` zeichnen die datenbasierten Szenen. `film-architecture.js` übernimmt die exakt auf die transparenten Gebäudebilder abgestimmten SVGs aus der Vision. `film.js` hält Bildraum, Scrollgeometrie und Phasen zusammen; es wird vom bestehenden RAF in `pitch.js` aktualisiert und startet keine zweite Animationsschleife. `film.css` ergänzt das Layout. Der Architekturbogen endet im gleichen Innenraum mit einzelnen Zweiertischen wie Kapitel 5. `film-static.js` zeigt bei reduzierter Bewegung die sechs Analysebilder aus Kapitel 3, die drei Bewertungsbilder aus Kapitel 4 und die vier Erlebnis-/Marketingbilder aus Kapitel 5 nacheinander. Auf schmalen Ansichten werden 5P, Roadmap und Evaluation als native Text-/Grafikfolgen lesbar; dichte Matrizen haben einen fokussierbaren horizontalen Scrollbereich.

Bildnachweise der überarbeiteten Live-Version bei 1363 × 936 CSS-Pixeln: [Zehn Tische, ein Horizont](docs/pitch-review/multi-table-hero.jpg) und [Now/How/Wow direkt im Pitch](docs/pitch-review/visible-ideas-matrix.jpg). Geprüft wurden alle neuen Kernfiguren, die sechs Team-/KI-Bewertungen, zehn Tische mit zwanzig Sitzplätzen, der Roadmapwechsel A/B mit veränderten Terminen und Budgets sowie die vollständige Methodenevaluation. Bei reduzierter Bewegung bleiben alle sechs, drei bzw. vier Bilder aus Kapitel 3, 4 und 5 sichtbar; kein Dossier muss dafür geöffnet werden. Zusätzliche Layoutprüfungen erfolgten im Chromium-Browser bei 909 × 624, 545 × 374 und 340 × 234 CSS-Pixeln über Browserzoom: kein horizontaler Seitenüberlauf; sechs Maßnahmenzeilen und alle sechs Methoden mit drei Nachweisfeldern bleiben im Lesefluss. Das sind responsive Browserprüfungen, keine Tests auf physischen Mobilgeräten. Die früheren Bilder [Architektur als Zeichnung](docs/pitch-review/cinematic-blueprint.jpg) und [scrollgesteuerter Start](docs/pitch-review/cinematic-launch.jpg) dokumentieren die bereits bestehende Animationsbasis.

`pitch/evidence.js` liest die Originaldaten aus `assets/js/data.js`, die Rechenfunktionen aus `assets/js/model.js` und beide Planungsvarianten aus `teil6/data.js`. Der Pitch verwendet den dokumentierten Konzeptstand und verändert keine gespeicherten Rechnerwerte. Variantenwahl und Bewegung teilen die bestehenden `rocketlight:variant`-/`rocketlight:motion`-Präferenzen. Die ersten sieben Kapitel folgen den aktuellen Originalbeiträgen aus dem OneDrive-Archiv. Kapitel 8 ist eine gekennzeichnete redaktionelle Methodenevaluation; im aktuellen Archiv ist keine eigene Part-8-Datei enthalten. `pitch/research.js` ergänzt die vollständige Innovations- und Trendanalyse mit Herkunftszellen. Die acht Trendableitungen, Now/How/Wow-Matrix, alle sechs Team-/KI-Bewertungen der drei Ideen, der konkrete 5P-Mix, die parallele Maßnahmen-Roadmap und die Methodenevaluation erscheinen im Hauptpitch. Die vollständigen 25 Felder, Einzelbegründungen und Originaldokumente bleiben zusätzlich in den Vertiefungen erreichbar. Details zu Korrekturen, Quellenhierarchie und Modellgrenzen stehen in [`pitch/CONTENT.md`](pitch/CONTENT.md).

## Teil 6: Roadmap & Maßnahmenplan

Die eigenständige Seite [`teil6/`](teil6/) führt als zusammenhängende, filmische Scroll-Erzählung vom RocketLight-Dinner-Konzept bis zur Umsetzung: Standortscan, Architekturzeichnung, Freigabe, Bau und Betrieb entwickeln sich in derselben Landschaft. Gesamtprojekt, relevante Teilprojekte und die parallele Kulinarik bleiben verknüpft. Die bisherigen Direktlinks `#roadmap` und `#teil6` öffnen diese neue Erfahrung. Auch die Schritte „Umsetzung · Teil 6“ im Dinner-Reiter führen zum passenden Abschnitt.

- Aktuelle Einstiege: Geschichte (`#cinema`) und vollständiger Plan (`#plan`). Die älteren Direktlinks `#vision` (Geschichtenbeginn), `#mission` (4 W-Fragen) und `#path` (Standortsuche) bleiben als kompatible Verknüpfungen erhalten. `#projects`, `#budget`, `#timeline` und `#sources` öffnen die jeweiligen Detailabschnitte.
- Umschalter zwischen Variante A (mobiler Pavillon, passend zu Kalkulator und 5P-Mix) und Variante B (feste Lounge in Titusville); die Wahl wird im Browser gespeichert.
- Die vollständigen Planungsdaten, Zahlen, Quellen und Annahmen bleiben in `teil6/data.js` erhalten. `ROCKET_DATA` enthält beide Originalvarianten, `ROCKET_META` die zugehörigen Kennzahlen und Gates.
- Die passenden Folien liegen als PPTX in `praesentation/` (je 6 Folien im Design der Gruppenpräsentation, mit Sprechernotizen).
- Einstieg in die aktuelle Umsetzung: `teil6/index.html`, `cinema.css` und `cinema.js`; Szeneninhalte in `story.js`, vollständiger Plan in `data.js` und `details.js`. `style.css` liefert die Basis für Typografie und Detailansichten. Die tatsächlich eingebundenen Dateien stehen in `teil6/index.html`.
- Über „Plan & Quellen“ sind die vollständigen Daten direkt erreichbar. Reduzierte Bewegung und sehr flache Fenster erhalten eine lesbare Kapitelansicht.

## Veröffentlichung im Fork

GitHub Pages ist für `Pogoner/InnovationManagement` auf `main` und `/ (root)` eingerichtet. Die Pitch-Ansicht liegt unter `https://pogoner.github.io/InnovationManagement/pitch/`; die Arbeitsansicht bleibt unter dem Repository-Stamm erreichbar. Neue Commits auf `main` werden durch den Pages-Build veröffentlicht.
