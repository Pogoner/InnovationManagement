# RocketLight · Inhalt und Datenherkunft

Stand: 14. November 2026. Die auswählbare Ansicht `pitch/` führt durch **acht Teile** nach dem ergänzten Prüfungsmaßstab: die sieben Originalschritte und eine ausdrücklich gekennzeichnete kritische Methodenevaluation. Grundlage ist das aktuelle, vom Nutzer
bereitgestellte Archiv `OneDrive_stuff.zip`. Im Archiv sind keine `_old`-Dateien
enthalten. Die kombinierte Präsentation ist nach der Nutzerangabe die
Hauptfassung für Schritt 1 und 7; bei Zahlen und Rangfolgen gelten die aktuellen
Excel-Dateien. Die vollständigen Originale sind unter `quellen/` verzeichnet und
von der Website herunterladbar.

## Quellenhierarchie und Kapitel

| Schritt | Inhalt im Pitch | Maßgebliche Originale |
| --- | --- | --- |
| 1 · Unternehmen | Mission, drei Geschäftsfelder, datierte Kennzahlen | Kombinierte Step-1/7-PPTX, Folien 2–3; SEC-Prospekt und Q2-Bericht |
| 2 · Innovationsprüfstand | Drei Innovationen im Starship-System plus Starlink als ergänzender Vergleich, Hube-Werte Team/KI, Methode und Interpretation | Part-2-XLSX, `Inno_Prüfstand`, `Ranking`, `Steckbriefe`; PPT-Folien 4–7 ergänzen |
| 3 · Trends und Ideen | Acht differenzierte Trends, 19 Vergleichsideen, acht Favoriten plus vier Open-Innovation-Ideen, zwölf Matrixeinträge, drei Business Cases | Part-3-XLSX, insbesondere `Trendbewertung`, `Portfolio`, `Trendradar`, `Ideenvergleich`, `Auswahlübersicht`, `Now-How-Wow-Matrix` |
| 4 · Ideenbewertung | Sechs Hube-Renditebewertungen, zwölf Kriterien, drei Fünfjahresmodelle und detaillierter RocketLight-Case | Drei aktuelle XLSM-Arbeitsmappen zu RocketLight, Starlink Insights und Launch Engineering Cloud |
| 5 · Marketing | People / Customer → Product → Price → Place → Promotion; alle 25 Felder und Vergleich der drei KI-Entwürfe | `RocketLight_Part5_5P_Multi_KI.xlsx`: `Finaler 5P-Mix!A5:E29`, `KI-Vergleich`, `Annahmen & Abgabe-Check` |
| 6 · Roadmap | Eigenständige Varianten A/B, Gates, sechs Teilprojekte, vier W-Fragen, vollständige Budget-/Terminansichten | Beide Part-6-PPTX; per SHA-256 identisch mit den bereits eingebundenen Originalen |
| 7 · Ganzheitliches Innovationsmanagement | Sechs Analysefelder; vier Empfehlungen für Struktur, Prozesse, Kultur und Kompetenzen | Kombinierte PPTX, Folien 9–16; ergänzendes Empfehlungsdeck, Folie 11 und Sprechernotizen |

| 8 · Kritische Methodenevaluation | Strukturierte Gegenüberstellung von Beitrag, Grenze und ergänzendem Instrument; Annahme–Test–Entscheidung | Redaktionelle Synthese der Unterlagen 2–7; Prüfungsmaßstab als neuer Anhang; NASA TRL und Strategyzer Test Card als ergänzende Methodenquellen. Im ZIP fehlt eine separate Part-8-Datei. |

Das Animationsdeck ist die gestalterische Anregung: kapitelsynchroner Countdown,
vier Empfehlungen als Triebwerke und Raketenstart im Finale. Seine technischen
und methodischen Widersprüche werden nicht übernommen. Native Scrollsteuerung,
Systemschrift und die Farbwelt von `teil6/` bleiben maßgeblich. Die ausführlichen
Bewertungen bleiben als aufklappbare Vertiefung erreichbar.

## Datenarchitektur

- `research.js` enthält die aus Schritt 2/3 extrahierten Werte, Quellen,
  Herkunftszellen, Methodendefinitionen und redaktionellen Korrekturen als
  `window.PitchResearch`. Der Datensatz trennt `team` und `ai` ausdrücklich.
- `research-view.js` zeichnet Hube-Vergleich und Trendportfolio und rendert die
  Vergleichstabellen. Zahlenpositionen folgen den Originalskalen.
- `evidence.js` verwendet `seed()`, `calc()` und `calcFY()` aus dem gemeinsamen
  Rechenmodell sowie `ROCKET_DATA` / `ROCKET_META`. Die Matrixbeschreibungen kommen
  aus der aktuellen Quellenprüfung. Der Pitch liest keine persönlich bearbeitete
  Rechner-Arbeitsmappe und schreibt keine `innorendite`-Daten.
- `pitch.js` steuert Varianten, Matrix, Zahlenansichten, Navigation und Finale.
  Variantenwahl und Bewegung teilen die bestehenden `rocketlight:variant`- und
  `rocketlight:motion`-Präferenzen. Links bleiben unter jedem Repositorypfad relativ.

## Die Bewertungsverfahren auseinanderhalten

### Schritt 2: Innovationsprüfstand

Hube-Wert = (Neu für wen × Wie neu) × (Reifegrad × Nutzen).

| Projekt | Team | KI |
| --- | ---: | ---: |
| Raptor 3 | 64 | 16 |
| Starship / Super Heavy V3 | 32 | 16 |
| Orbitale Betankung | 24 | 48 |
| Starlink, Bonus | 0 | 72 |

Starlink erhält im Team vier Nutzenpunkte, aber Reifegrad null für bereits
etablierten Betrieb. Das Produkt null bedeutet deshalb **nicht fehlenden Nutzen**.
Drei Projekte gehören zum selben Starship-System; ihre Märkte und Nutzen werden
nicht addiert. Die Diagrammskala reicht bis zum beobachteten Maximum 72; der
methodische Maximalwert beträgt 288, nicht 72. Die Balken sind keine Prozente.

### Schritt 3: Trendportfolio und Ideenmatrix

Trendportfolio: X = Dauer (1–3) + Nähe (1–7), Skala 1–10; Y = Einfluss, Skala 1–5.
Das Handlungsfeld beginnt bei X ≥ 6 und Y ≥ 3. Die Zellgrenzen liegen zwischen den
Ganzzahlwerten bei 5,5 und 2,5. Alle Trends liegen im Handlungsfeld, jedoch an
unterschiedlichen Positionen. Identische Koordinaten werden als Punktgruppen
gezeigt. Der Trendradar ergänzt abgeleitete Horizonte, keine Kalenderprognosen.

Die Vorauswahl umfasst 19 trendbasierte Ideen → acht Favoriten; vier separat
entstandene Open-Innovation-Ideen ergänzen diese zur Zwölfermatrix. Sie werden
nicht nachträglich in den 19er-Ideenvergleich aufgenommen.

Now–How–Wow: X = Machbarkeit, Y = Originalität, jeweils 1–5; hoch ab vier Punkten.
Die Originaldatei enthält widersprüchliche Achsenbeschriftungen. Die Website folgt
der expliziten Methodendefinition: HOW oben links, WOW oben rechts, NOW unten rechts.
RocketLight und Insights sind beim Team WOW; Launch Engineering Cloud ist NOW
(KI: WOW). Die Dreierauswahl für Schritt 4 ist eine zusätzliche Projektentscheidung.
Die Team-Wertung 5/5 für RocketLight bestätigt noch keine Machbarkeit.

### Schritt 4: Innovationsrendite

IR = gewichteter Nutzen / gewichteter Aufwand. Das ist ein Bewertungsscore,
keine finanzielle Rendite. Die unveränderten Gruppengewichte lauten:
Nutzen 25/15/25/20/5/10; Aufwand 20/10/30/10/10/20 Prozent.

| Projekt | Sicht | Nutzen | Aufwand | IR |
| --- | --- | ---: | ---: | ---: |
| RocketLight | Team | 2,20 | 1,20 | 1,83 |
| RocketLight | KI | 2,20 | 3,00 | 0,73 |
| Starlink Insights | Team | 3,40 | 2,10 | 1,62 |
| Starlink Insights | KI | 3,20 | 2,90 | 1,10 |
| Launch Engineering Cloud | Team | 3,05 | 2,40 | 1,27 |
| Launch Engineering Cloud | KI | 3,05 | 2,70 | 1,13 |

Die korrigierten Insights-Teamwerte stammen aus
`Rendite-Kalkulator!D11:D16/D19:D24` der aktuellen Insights-Datei. Nur diese beiden
Score-Arrays und die überholten Entwurfslabels wurden im gemeinsamen Seed geändert.
Persönliche gespeicherte Bewertungen bleiben erhalten.

## Finanzmodell und Varianten

| Modell | Umsatz über fünf Jahre | F&E | Gewinnindikator |
| --- | ---: | ---: | ---: |
| RocketLight Dinner | 47,24 Mio. USD | 3,48 Mio. USD | 11,50 Mio. USD |
| Starlink Insights | 66,75 Mio. USD | 10,20 Mio. USD | 16,25 Mio. USD |
| Launch Engineering Cloud | 17,70 Mio. USD | 14,02 Mio. USD | 4,31 Mio. USD |

Die Modelle übertragen eine operative Marge des Kerngeschäfts Space + Connectivity
(3.766 / 15.473 Mio. USD = 24,34 %). Der konsolidierte Konzernumsatz in Schritt 1
bezieht zusätzlich AI ein. Diese Bezugsgrößen sind verschieden. Die Gewinnindikatoren
sind keine eigenständige Projekt-GuV, kein Cashflow und kein Break-even-Nachweis.
F&E ist nicht mit den vollständigen Betriebskosten gleichzusetzen.

Für RocketLight: 0/64/180/288/432 Plätze; im Pilot 35.000 USD, danach 50.000 USD.
Vier Pilotabende bieten 80 Plätze; das Modell setzt 80 % Auslastung voraus, danach
90 %. Die relativen Jahre 1–5 werden ausschließlich für Variante A der Roadmap
2027–2031 zugeordnet.

| Merkmal | A · Mobiler Pavillon | B · Lounge Titusville |
| --- | --- | --- |
| Budget | 3,48 Mio. USD | 13,38 Mio. USD, gerundet 13,4 Mio. |
| Erster geplanter Pilot | März 2028, Florida | Juni 2027, KSC, vor eigener Lounge |
| Kritische Freigabe | Florida bis 31.12.2027 | Baugenehmigung bis 30.09.2027 |
| Betrieb | Florida; Texas ab 2029 | Eigene Lounge ab 01.10.2028 |
| Umsatz | 47,24 Mio. USD im A-Modell | 47,2 Mio. USD aus dem Basiskonzept übernommen |

B hat keine eigene konsistente Jahres-GuV. Die A-Grafik bleibt stets A zugeordnet.
Variante, Bild, Gates, Projekte, vier W-Fragen, Budget-/Terminlinks und PPTX-Download
wechseln gemeinsam. Teilprojekt-IDs sind zwischen A und B nicht gleichbedeutend.

## Aufgelöste Widersprüche

- „People“ im 5P-Mix beschreibt Kunden, Persona, Bedürfnisse und Zugang. Es ist
  kein Personalplan. Alle 25 Felder und KI-Bewertungskriterien bleiben enthalten.
- Der finale Mix nennt einen zu prüfenden Ersatztermin. Die ältere A-Roadmap enthält
  noch zwölf Monate. Dieser Unterschied wird ausdrücklich als älterer Planstand
  bezeichnet; es wird keine Garantie als bestehendes Angebot versprochen.
- Bisherige Launch-Viewing-Angebote liegen nicht pauschal mehr als zehn Kilometer
  entfernt. Ein Glasgebäude begründet keine zusätzliche Sicherheitsfreigabe.
  Gastronomie, Service und Inszenierung bilden die Differenzierung.
- Reddit wird durch das reale Membership-Angebot der Planetary Society ersetzt;
  die Quelle belegt keinen offiziellen SpaceX-Club. Wikipedia zum Dyson-Konzept
  wird durch Dysons Originalpublikation ersetzt; sie belegt keine heutige Machbarkeit.
- Drei Managementfelder gelten in der Projektanalyse als Stärke und drei als
  Handlungsbedarf. Die vier Empfehlungen ergänzen auch die bereits starken Prozesse.

## Prüfungen und Grenzen

Die Excel-Dateien wurden einschließlich Formeln, gespeicherter Ergebnisse, Quellen,
Kommentaren und eingebetteter Trendbilder gelesen. In der LEC-Datei fehlen
Formel-Caches und einige Template-Textzellen sind falsch numerisch typisiert; die
relevanten Formeln wurden aus den unveränderten Originaldaten nachgerechnet.
XLSM-Makros wurden nicht ausgeführt. Die `#N/A`-Werte im Trendradar sind beabsichtigte
Filter für Plotserien.

Die herunterladbaren Dokumente bleiben unverändert. Quellenkorrekturen und
Präzisierungen betreffen die Website. Alle 13 Dokumente sind mit Prüfsumme im
[Manifest](../quellen/manifest.json) dokumentiert. Weitere Einzelbelege stehen in
[Prüfung 1/7](../quellen/PRUEFUNG-SCHRITT-1-7.md) und
[Prüfung 2/3](../quellen/PRUEFUNG-SCHRITT-2-3.md).

Die Bilder aus `teil6/` sind KI-generierte Konzeptvisualisierungen, siehe
`teil6/asset-notes.md`. Der Countdown zeigt Pitchfortschritt. T−00 erscheint mit
der Zündung, nicht erst nach dem Flug. Vier Triebwerke stehen für vier Empfehlungen;
die Inszenierung zeigt keine reale technische Triebwerkskonfiguration. Native
Scrollsteuerung, Tastatur, reduzierte Bewegung und die statische Ersatzansicht
unter 560 px Fensterhöhe bleiben verfügbar.
In schmalen Ansichten bis 760 px Breite beginnt die statische Ersatzansicht
bereits unter 680 px Höhe, damit Text, Zeichnung und Phasennavigation Platz behalten.

## Filmische Darstellung

Die sieben Originalkapitel sowie die neue Methodenevaluation bleiben vollständig im HTML. Die filmische Ebene
verschiebt sie jeweils in ein natives, per Direktlink erreichbares `details`-Element
und ergänzt eine kurze Scrollszene. Alle bestehenden IDs, Dokumente, Rechenwege und
Interaktionen bleiben erhalten; ohne die Filmskripte bleibt die bisherige Kapitelansicht
lesbar. Die Szenentexte stehen in `film-story.js`, die Visualisierung in den thematischen
`film-*.js`-Dateien und dem gemeinsamen Controller `film.js`.

Die Animationen zeigen keine zusätzlichen Messwerte: Technologiebalken, Trendpunkte,
IR und Umsatz folgen den bestehenden Quellen. Die Umsatzsequenz nennt ausdrücklich
Variante A, auch wenn für die Architektur Variante B gewählt ist. Zehn separate Zweiertische mit zwanzig Plätzen, freie Sichtachsen und sieben Gänge illustrieren das überarbeitete Dinner-Konzept. Die vier symbolischen
Antriebe stehen für Struktur, Prozesse, Kultur und Kompetenzen.

Die Architektur verwendet dasselbe Landschaftsbild und dieselben transparenten
Gebäudebilder wie die Vision. SVG-Zeichnung und Foto teilen Abmessungen, Perspektive
und Bodenanker; ein vertikaler Bildaufbau führt vom Entwurf zum Konzeptbild.
Auf schmalen Bildschirmen erhält die Landschaft eine tiefere Bildbühne, damit
das Gebäude vollständig im Ausschnitt bleibt. Gezeichnete Gates zeigen den
Präsentationsfortschritt, keine tatsächlich erteilten Freigaben.

## Ergänzung nach dem Prüfungsmaßstab vom 14.11.2026

Der neu angehängte Maßstab umfasst acht Teile. Die Navigation, der Countdown und
alle Kapitelnummern folgen jetzt dieser Struktur. Folgende Kerngrafiken sind
Teil der Scrollinszenierung und benötigen kein geöffnetes Dossier:

| Part | Sichtbare Grafik im Hauptpitch |
| --- | --- |
| 1 | Drei Geschäftsfelder um die SpaceX-Mission |
| 2 | Drei Starship-Projekte mit Team-/KI-Balken; Starlink als expliziter Vergleich |
| 3 | 360°-Suchfeld, exaktes Trendportfolio, acht Stufenmodell-Zeilen in zwei Phasen, vollständige zwölfteilige Now/How/Wow-Matrix, drei Finalisten |
| 4 | Sechs Team-/KI-Punkte der drei Ideen im Nutzen-Aufwand-Portfolio; IR-Werte und anschließend die A-Umsatzkurve |
| 5 | Zehn Zweiertische, zwanzig Plätze und Sichtachsen; sieben Gänge, Preisannahmen und konkreter 5P-Mix |
| 6 | Fünf Gates sowie zeitproportionale Roadmap aller sechs Teilprojekte, mit vier Pilotterminen für die gewählte Variante |
| 7 | Vier konkrete Managementempfehlungen als gemeinsamer Antrieb |
| 8 | Zwei Evaluationsmatrizen für die Methoden aus Parts 2–7; Annahme–Test–Entscheidung für Nachfrage, Betrieb und Wirtschaftlichkeit |

### Transparente redaktionelle Ergänzungen

Das Originalblatt `Stufenmodell` enthält zwei illustrative Beispiele, keine acht
fertigen Ableitungen. Die neuen acht Zuordnungen führen die tatsächlich gewählten
Favoriten aus `Auswahlübersicht!B8:B15` durch die vier Modellstufen Trend,
Herausforderung, Zukunftsmarkt und Geschäftschance. Beide Hauptgrafiken kennzeichnen
sie als redaktionelle Ableitung. RocketLight bleibt eine zusätzliche Idee aus
Open Innovation und wird nicht einem Trendfavoriten zugeschrieben.

Die Auswahl bleibt ein Teamentscheid: RocketLight führt die Team-IR, während die KI
Launch Engineering Cloud geringfügig vor Starlink Insights sieht. Die sechs Werte
werden nicht zu einem vermeintlichen Konsens verrechnet.

Teil 8 ist eine strukturierte redaktionelle Evaluation der vorhandenen Methoden.
NASA TRL und Strategyzer Test Card sind als ergänzende Instrumente verlinkt; es
werden weder neue TRL-Werte noch bereits durchgeführte Tests behauptet.

Das neue Raumkonzept wurde auf Wunsch auf zehn Zweiertische umgestellt, bei
unveränderter Gesamtkapazität von zwanzig Gästen. Der Einstieg zeigt mehrere
Tische und einen deutlich präsenteren Start. Der Sitzplan zeigt die geplanten
Sichtachsen schematisch; er ersetzt keine Standortplanung. Motivherkunft und
Bildprompt stehen in `assets/README.md`.

### Reduzierte Bewegung und schmale Ansichten

Bei reduzierter Bewegung erscheinen alle Methodenphasen der Teile 1–5, 7 und 8 als
vollständige, ruhige Bildfolge im normalen Seitenfluss. Sie benötigen weder
Phasenauswahl noch ein geöffnetes Dossier. Dichte Diagramme erhalten bei schmalen
Fenstern eine eigene, per Tastatur bedienbare horizontale Scrollfläche; die Seite
selbst bleibt vertikal. Die 5P-Zeilen, Roadmap und Methodenevaluation verwenden
auf schmalen Ansichten lesbare HTML-Darstellungen. Die Kennzahlen und Quelltermine
stimmen mit den animierten Fassungen überein.


## Räumliche Roadmap · näherer Raketenstart

Die acht Bildphasen in Kapitel 6 werden in `roadmap-phases.js` definiert und für beide Varianten aus den unveränderten Aktivitäten in `teil6/data.js` mit konkreten Terminen verbunden. Die räumlichen Ebenen in `film-site.js` folgen denselben Phasengrenzen. Die Auswahl dreier schematischer Standorte, der schematische Prüfbereich und die Servicewege sind illustrative Planungshilfen; sie stellen keine vermessenen Grundstücke oder freigegebenen Schutzabstände dar. Das Hintergrundmotiv ist eine gekennzeichnete Konzeptvisualisierung.

Die Arbeitspakete bleiben parallel: Die acht Bildphasen ordnen die Erklärung, keine acht streng aufeinanderfolgenden Kalenderabschnitte. Variante B zeigt die externen KSC-Piloten vom 30.06.2027 bis 30.06.2028 vor der geplanten Lounge-Eröffnung am 01.10.2028. Die letzte Phase enthält weiterhin den vollständigen Maßnahmenplan mit sechs Spuren, allen vier Pilotterminen und fünf datierten Gates. In reduzierter bzw. schmaler Ansicht stehen alle acht Planungsphasen im normalen Lesefluss.

## 20-Minuten-Regie · Methoden im Hauptfluss

Die Erweiterung vom 15.11.2026 umfasst **44 stabile Bildphasen**: 4 / 4 / 8 / 5 / 6 / 8 / 5 / 4 in den Kapiteln 1–8. Der zusätzliche **4W-Zwischenhalt nach der Roadmap** erklärt Was, Wer, Wann und Wie. Der Sprechplan sieht 18:30 Minuten für die acht Kapitel, 0:45 Minuten für Abschluss und Startfilm sowie 0:45 Minuten Reserve vor. Die Seite übernimmt keine automatische Zeitsteuerung des Vortrags.

Der Hauptfluss zeigt jetzt den Untersuchungsweg, die Hube-Faktoren, konkrete Team-/KI-Abweichungen, die Auswahl 19 → 8 plus 4 → 12 → 3, Kriterien und Gewichte, die IR-Rechnung und das Jahresmodell. Hinzu kommen der Vergleich der drei KI-Marketingentwürfe samt Synthese, Managementdiagnose und Gatefragen sowie eine vorgeschlagene Testkarte. Vollständige Originaltabellen, Quellen und Dossiers bleiben erreichbar.

**Zurück/Weiter, Phasenpunkte und natives Scrollen** erschließen dieselbe Reihenfolge; die expliziten Phasenschritte landen auf vollständig aufgebauten Bildern. Alle Methodenphasen stehen bei reduzierter Bewegung oder kompaktem Viewport statisch im Lesefluss: für die Methodenkapitel bis 760 px Breite sowie bis 1100 px Breite bei weniger als 760 px Höhe. Die Roadmap ergänzt ihre eigene lineare Planungsfolge. Ein einmaliger kurzer Akzent kann die benannte Differenz in Rot, eine Auswahl in Kupfer oder Evidenz in Eisblau hervorheben; anschließend bleibt das Bild ruhig. Kein Dauerblinken und keine Gleichsetzung von Rot mit einem Fehlerurteil.

Originaldaten und redaktionelle Arbeit bleiben getrennt. Gleiche Nutzensummen bedeuten keine gleichen Einzelurteile; fehlende Team-Begründungen werden nicht erfunden. Die ausgearbeiteten Stufenmodell-Zwischenschritte, Methodenevaluation und vorgeschlagene Testkarte sind gekennzeichnete redaktionelle Ergänzungen. Die Testkarte dokumentiert keine bereits durchgeführte Erhebung und keine feststehende Erfolgsschwelle.

Der Ablauf mit Sprechhinweisen steht in der [Moderationshilfe für 20 Minuten](../docs/pitch-presenter-guide.md). Inhaltliche Regie, Sicherungen und tatsächlicher Prüfstand stehen im [Fortschrittsdokument](../docs/pitch-review/methods-flow-progress.md).
