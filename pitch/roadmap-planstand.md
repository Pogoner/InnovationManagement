# Teil 6 · Roadmap & Umsetzung

Planstand: 20.11.2026. Grundlage ist die Roadmap-Präsentation [`quellen/Schritt_6_Roadmap.pptx`](../quellen/Schritt_6_Roadmap.pptx) (14 Folien). Alle Termine sind Plantermine.

## Umfang

Ein fester Pavillon für 20 Gäste (zehn Zweiertische) in Titusville, Florida. Umsetzungshorizont 2026–2031. Ein Standort in Texas wird nach dem Betriebsentscheid in einem eigenen Projekt auf Machbarkeit und Finanzierung geprüft.

## Sechs Teilprojekte

1. Standort sichern
2. Genehmigungen & Sicherheit
3. Architektur & Bau
4. Küche & Team
5. Pilot-Dinner
6. Vertrieb & Betriebsübergang

Firmen und Ansprechpartner der Präsentation sind vorgesehene Umsetzungspartner. Eine Beauftragung ist nicht erfolgt.

## Freigaben und Termine

| Entscheidung | Plantermin | Voraussetzung |
| --- | --- | --- |
| G0 · Projektauftrag | 30.11.2026 | Umfang, Verantwortlichkeiten, Entscheidungswege, Planungsbudget |
| G1 · Standortoption | 31.03.2027 | Parzelle, Sichtachse, Zufahrt, Bebaubarkeit; Option bis G2 |
| G2 · Bauinvestition | 30.09.2027 | Abgestimmter Entwurf, Genehmigungen, vergleichbare Angebote, Kosten- und Finanzierungsplanung |
| G3 · Pilotfreigabe | 30.09.2028 | Abnahmen, Betriebslizenzen, Team, Testservice, Messplan, Pilotbudget |
| G4 · Betriebsentscheid | 31.07.2029 | Vier Piloten ausgewertet: bezahlte Nachfrage, Qualität, Störungen, Istkosten |

Bau: 01.11.2027–31.08.2028. Pilot-Dinner: 15.10.2028, 15.12.2028, 15.03.2029 und 15.06.2029. Regelbetrieb Florida bei Go ab 01.08.2029, anschließend Kennzahlenreviews bis Ende 2031.

## Budget

Die Budgetplanung ist eine konkrete Aufgabe vor G2: Grundstück, Bau, Ausstattung, Betrieb und Pilotliquidität werden auf Angebotsbasis kalkuliert. Das Pilotpreismodell beträgt 35.000 USD je Platz; bezahlte Pilotbuchungen prüfen die Zahlungsbereitschaft.

## Finanzrechnung

Projektbezogene Rechnung für Standort 1 Florida, Betrachtungszeitraum 2027–2031, 20 Plätze je Dinner. Zwei Piloten 2028 (Oktober, Dezember) und zwei 2029 (März, Juni) zum Pilotpreis von 35.000 USD; Regelbetrieb erst nach G4 mit Hochlaufannahme (5, 12 und 20 Dinner in 2029, 2030 und 2031 bei 65, 70 und 75 % Auslastung, Zielpreis 50.000 USD). Texas ist nicht enthalten.

Umsatz, variable Kosten (5.000 USD je Gast) und laufende Fixkosten ergeben das Betriebsergebnis. Investitionen (Grundstück, Planung, Genehmigungen, Bau, Ausstattung, 10 % Reserve) werden nur im Cashflow abgezogen. Die Konzernmarge von SpaceX wird nicht verwendet. Alle Beträge sind Planannahmen; die 10–15 Mio. USD der Lounge-Schätzung sind kein Pavillonbudget. 45.000 USD je Gast (90 %) sind der Deckungsbeitrag vor Fixkosten und Investition. Bleibt der kumulierte Cashflow im Zeitraum negativ, erscheint „Im Betrachtungszeitraum nicht erreicht“.

Quelle der Werte: `pitch/calc/data.js` (RocketLight, KI-Bewertung, `fy`) und `pitch/calc/model.js` (`calcProject`). Die Arbeitsmappe [Schritt_4_RocketLight_Finanzrechnung_Fester_Pavillon.xlsx](../quellen/Schritt_4_RocketLight_Finanzrechnung_Fester_Pavillon.xlsx) enthält dieselbe Rechnung mit Formeln. Die Hube-Innovationsrendite bleibt ein eigener Bewertungsscore.

## Dateien

Die Darstellung entsteht aus `planning-data.js` (Daten), `roadmap-phases.js` (Texte der acht Filmszenen) und `film-architecture.js` (Szenenaufbau). Ersatzansichten ohne Film: `index.html` und `pitch.js`.