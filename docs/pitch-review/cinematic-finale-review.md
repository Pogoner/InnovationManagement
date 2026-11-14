# Sichtprüfung · Standortflug und fotorealistisches Finale

Stand: 14.11.2026. Prüfung im Chromium-Browser auf der tatsächlichen
GitHub-Pages-Auslieferung von `Pogoner/InnovationManagement`.

## Geändertes Verhalten

- **Part 04:** Die Umsatzlinie wird aus den tatsächlichen Datenpunkten bis 2031
  aufgebaut. Linie, Füllfläche und Leuchtpunkt verwenden denselben Endpunkt.
  Bei Fortschritt 1 endet der Pfad exakt bei `(538,170)` / 21,60 Mio. USD.
  Beim Zurückscrollen wird er wieder vollständig zurückgenommen; vor Beginn
  bleibt kein heller Strich bei 2031 stehen.
- **Part 05:** Das vorher leere Fenster zeigt zuerst die Zubereitung, dann den
  angerichteten Gang und rechts den Startblick. Der Phasenpunkt 0,53 zeigt das
  gefüllte Fenster mit sieben Gangmarkierungen. Die ruhige Ansicht verwendet
  dieselben Bilder mit eigenen, kollisionsfreien SVG-Clip-IDs.
- **Part 06:** Vogelperspektive, drei schematische Standortoptionen, Auswahl der
  mittleren Fläche, Heranfahren und Übergang zum bestehenden Bauablauf. Das
  nähere Küstenbild und alle Gebäudezeichnungen behalten gemeinsame Anker.
  Die sichtbaren Gäste im neuen Zielbild blicken zum Start.
- **Finale:** Kalte Rakete auf dem Starttisch, Zündung, beleuchtete Abgaswolken,
  Aufstieg und später Übergang zum integrierten Schlussbild. Der Startknopf
  verwendet denselben Fortschritt mit einer konfigurierten Dauer von elf
  Sekunden. Die Wiederholung erreicht erneut das vollständige Schlussbild.

## Beobachtete Prüfungen

| Bereich | Ergebnis |
| --- | --- |
| Umsatzgrafik | Vollständige Linie über 0 / 2,24 / 9,00 / 14,40 / 21,60; sichtbarer letzter Punkt bei 2031 |
| Erlebnisfenster | Zubereitung und Menü geladen; Menü und Startblick gemeinsam sichtbar |
| Ruhige Grafikfolgen | Sechs Bilder in Part 03, drei in Part 04, vier in Part 05; keine doppelten SVG-IDs |
| Standortflug | Drei Flächen in der Übersicht vollständig im Bild; Auswahl und anschließendes Ausblenden beobachtet |
| Bauphase | Gemeinsames näheres Gelände mit registriertem Pavillon und sichtbaren Planungsbeschriftungen |
| Variante B | Wechsel auf Lounge und 13,4 Mio. USD; Phasen und originale Termine bleiben variantenspezifisch |
| Separate Roadmap | Neues Luftbild und näheres Küstenbild geladen; Standort- und Bauphase kontrolliert |
| Finale | Ready, Zündung/Abheben, Climax und Wiederholung kontrolliert; alle Bilddateien geladen |
| Reduzierte Bewegung | Ruhiges Schlussbild; keine animierten Rauch- oder Abgasebenen |
| Anwendungskonsole | Keine Fehlermeldung aus der InnovationManagement-Anwendung beobachtet |

Desktop und Browserzoom wurden bei sichtbaren Layoutbreiten/-höhen
**1348 × 936, 899 × 624, 539 × 374 und 337 × 234 CSS-Pixeln** geprüft.
Kein horizontaler Seitenüberlauf. Die beiden schmalen, flachen Fenster verwenden
den vorgesehenen ruhigen Lesefluss. Dies sind Browserprüfungen, keine Tests auf
physischen Mobilgeräten.

Die Sichtprüfung führte zusätzlich zu einer Freistellung der Raketenspitze unter
der Navigation, einem vollständig sichtbaren Luftbild, einer entzerrten
Statuszeile im kompakten Finale und einem korrigierten Rücksprung zum Anfang
der angehefteten Auftaktszene.

## Bildnachweise

- [Drei Standortoptionen im Pitch](aerial-site-choice.jpg)
- [Fotorealistisches Grande Finale](photoreal-finale.jpg)

Die Screenshots stammen aus dem Browser und wurden nicht nachbearbeitet.
Quelldaten, Formeln, Budgets und Originaltermine wurden durch die Inszenierung
nicht verändert. Bildherkunft und exakte Prompts:
[cinematic-notes.md](../../pitch/assets/cinematic-notes.md).
