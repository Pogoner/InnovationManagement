# Inhalt und Datenherkunft des Pitchs

Die Ansicht `pitch/` führt vorhandene Projektinhalte zu einer durchgehenden
Präsentation in sieben Kapiteln zusammen. Sie ist eine redaktionelle Alternative
zu den Arbeitsansichten. Die Nummerierung ist nicht die achtteilige Navigation
des bisherigen SpaceX-Rechners. Separate Originalbeiträge für alle sieben
Projektteile liegen im Repository nicht vor; insbesondere sind der 5P-Teil und
der Abschluss aus vorhandenen Planungsinhalten verdichtet.

## Sieben Kapitel

| Kapitel | Inhalt | Maßgebliche Quellen |
| --- | --- | --- |
| 1 · Die Chance | Acht Ausgangstrends und Open Innovation als weiterer Ideenimpuls | `assets/js/data.js`: `IDEAS`; `assets/js/app.js`: Beschreibung des Trendportfolios |
| 2 · Die Auswahl | Zwölf Ideen, Machbarkeit/Originalität, drei vertiefte Finalisten | `IDEAS`; `assets/js/views.js`: `vIdeas()` und `vPool()`; `seed().list` |
| 3 · Das Erlebnis | 20 Plätze, drei Menürichtungen mit sieben Gängen, Nachtstart | `assets/js/dinner.js`: `RL_SETS`, `RL_PHASES`, `vDinExp()`; `teil6/data.js`: Konzept und Launch-Garantie |
| 4 · Die Rechnung | Team-/KI-Bewertungen, zwölf Kriterien, Gruppen-Gewichte und Fünfjahresszenario A | `assets/js/model.js`; `assets/js/data.js`: `seed()`, besonders `rld-team` und `rld-ki` |
| 5 · Der Marktzugang | Redaktioneller 5P-Mix aus Produkt, Preis, Orten, Kanälen und Rollen | `teil6/data.js`: `w4`, `t1`, `t2`, Bezug auf Part 5 in `assumptions`; Dinner-Konzept |
| 6 · Die Umsetzung | Varianten A/B, Gates, sechs Teilprojekte, vier W-Fragen und Detailzugänge | `teil6/data.js`: `ROCKET_DATA`, `ROCKET_META`; vollständige Darstellung in `teil6/` |
| 7 · Die Entscheidung | Redaktionelle Empfehlung eines gestuften Pavillon-Piloten; inszenierter Start | A: `w4.wie`, `t1`, Gates G0–G4; keine separate originale Part-7-Datei |

## Datenvertrag

`evidence.js` liest den unveränderten Ausgangsstand über `seed()`, `calc()` und
`calcFY()` sowie `ROCKET_DATA` und `ROCKET_META`. Der Pitch benutzt bewusst keine
persönlich bearbeitete Arbeitsmappe aus dem Browser. Die bestehenden Eingaben
bleiben erhalten. Die Darstellung verändert weder Formeln noch Planungsdaten.

- In den `IDEAS`-Arrays für Machbarkeit, Originalität und Kategorie ist Index
  **0 die KI**, Index **1 die Gruppe**, entsprechend der expliziten Beschriftung
  in `vPool()`. Die Launch Engineering Cloud ist bei der KI WOW, bei der Gruppe
  NOW. Die Liste der drei vertieften Finalisten ist nicht mit drei Gruppen-WOW-
  Einordnungen gleichzusetzen. Die Matrixgrenze liegt bei einer Bewertung ab 4.
- RocketLight: Team IN 2,20 / IA 1,20 / IR 1,83; KI IN 2,20 / IA 3,00 / IR 0,73.
  Die Innovationsrendite ist ein gewichteter Bewertungsscore, keine finanzielle
  Rendite. Die Team-Bewertung enthält keine schriftlichen Einzelbegründungen.
- Die Original-Fünfjahresrechnung liegt am Objekt `rld-ki`. Ihre relativen
  Jahre 1–5 werden für A der Roadmap 2027–2031 zugeordnet: 0/64/180/288/432
  verkaufte Plätze, insgesamt 47,24 Mio. USD Umsatz und 3,48 Mio. USD Projekt-/
  Entwicklungsaufwand. Vier Pilotabende bieten 80 Plätze; die Rechnung nimmt
  80 % Auslastung und damit 64 Verkäufe zu je 35.000 USD an. Danach sind 90 %
  Auslastung und 50.000 USD je Platz angenommen.
- Der Gewinnindikator von rund 11,50 Mio. USD übernimmt die allgemeine
  Unternehmensmarge aus dem Kalkulator. Er ist keine eigenständige Kosten- oder
  Cashflowrechnung des Dinner-Betriebs und kein Nachweis eines Break-even.

## Varianten nicht vermischen

| Merkmal | A · Mobiler Pavillon | B · Lounge Titusville |
| --- | --- | --- |
| Budget | 3,48 Mio. USD | Tabellen-Summe 13,38 Mio. USD, gerundet 13,4 Mio. USD |
| Erster Pilot | März 2028 in Florida | Juni 2027 im KSC, vor Fertigstellung der eigenen Lounge |
| Kritische Freigabe | Florida-Genehmigung bis 31.12.2027 | Baugenehmigung bis 30.09.2027 |
| Langfristiger Betrieb | Florida und ab 2029 zusätzlich Texas; Übergabe 31.12.2030 | Eröffnung 01.10.2028; Übergabe 31.03.2029 |
| Umsatz | 47,24 Mio. USD aus der Fünfjahresrechnung | 47,2 Mio. USD als übernommene Planannahme, mit abweichender zeitlicher Verteilung |

Für B liegt kein eigener konsistenter Jahres-Cashflow und keine separate
Hube-Bewertung vor. Der A-Jahreschart bleibt ausdrücklich A zugeordnet. Die
Empfehlung in Kapitel 7 bleibt auch bei ausgewählter B-Roadmap eine Empfehlung
für A. Die vier W-Fragen, Gates, Teilprojekte, Quellenzugänge und Folienlinks
folgen der jeweils gewählten Roadmap-Variante. Teilprojekt-IDs haben in A und B
unterschiedliche Bedeutungen; Zeile 0 ist das Gesamtprojekt.

## Status von Aussagen und Quellen

Termine, Budgets, Preise, Mengen, Auslastung, Standortzugang und Launch-Garantie
sind Konzeptannahmen. Gates beschreiben geplante Entscheidungen, keine schon
erreichten Meilensteine. Sponsor, Anbieter und Institutionen sind vorgesehene
Rollen oder Kandidaten; ihre Nennung belegt keine Zusage, Buchung oder
Partnerschaft. Die 5P-Zusammenfassung und die Empfehlung sind redaktionelle
Ableitungen, keine weiteren Marktforschungsergebnisse.

Das Quellenverzeichnis bewahrt den dokumentierten Quellenstand aus Arbeitsmappe
und beiden Roadmaps. Es ist keine aktuelle Überprüfung externer Fakten. Die
W-Fragen-Übung der Gruppe besitzt keine externe URL. Bei Änderungen an einer
fachlichen Annahme sind der Originaldatensatz und die betroffenen Darstellungen
gemeinsam zu prüfen; Werte nicht allein für den Pitch verbessern.

Die Bilder stammen aus `teil6/`; `teil6/asset-notes.md` dokumentiert sie als
KI-generierte Konzeptvisualisierungen. Der Countdown zeigt den Fortschritt des
Pitchs, keine reale Startzeit. Der Raketenstart ist der inszenierte Abschluss
eines studentischen Konzepts und kein Live-Ereignis oder Angebot von SpaceX.
