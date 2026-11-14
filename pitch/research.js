/* Current source workbooks, read-only extraction: OneDrive_stuff.zip.
 * Scores are project assessments, not official SpaceX ratings.
 * Provenance and editorial corrections are retained with the data.
 * No dependency on the calculator seed or browser storage. */
'use strict';
window.PitchResearch = Object.freeze({
  "version": "2026-11-14.1",
  "checkedAt": "2026-11-14",
  "assessmentBasis": {
    "part2": "25.09.2026; Starlink ergänzt 02.10.2026",
    "part3": "Originalquellenstand 04.11.2026; neu gelieferte Arbeitsmappe"
  },
  "title": "Innovationsprüfstand und Trendanalyse · Originalstand der Projektgruppe",
  "assessmentLabels": {
    "team": "Team",
    "ai": "KI"
  },
  "files": {
    "part2": {
      "name": "Part 2_Innovationsprüfstand_SpaceX.xlsx",
      "path": "Schritt2_Innovationsprüfstand/Part 2_Innovationsprüfstand_SpaceX.xlsx",
      "sha256": "9682516ae69335c5f71d4b7593746bace7e7f8acb0258bc5dedce3816bf273f6",
      "sheets": [
        "Summary_Inno_Prüfstand",
        "Inno_Prüfstand",
        "Ideenportfolio",
        "Innovationsportfolio",
        "Ranking",
        "Steckbriefe",
        "Quellen"
      ],
      "modified": false
    },
    "part3": {
      "name": "Part 3_Trendportfolioanalyse_Matrix_SpaceX.xlsx",
      "path": "Schritt3_Trendportfolioanalyse/Part 3_Trendportfolioanalyse_Matrix_SpaceX.xlsx",
      "sha256": "57e602ca3f3679ef54da15cb08ac91e895676ea7c8e7538a8896ad84aa98f414",
      "sheets": [
        "Trendbewertung",
        "Portfolio",
        "Trendradar",
        "Stufenmodell",
        "Geschäftsideen",
        "Ideenvergleich",
        "Auswahlübersicht",
        "Now-How-Wow-Matrix",
        "Quellen"
      ],
      "modified": false
    }
  },
  "method": {
    "audit": {
      "name": "Innovations-Prüfstand nach Prof. Hube",
      "formula": "Hube-Wert = (Neu für wen × Wie neu) × (Reifegrad × Nutzen)",
      "unit": "Punkte",
      "theoreticalMax": 288,
      "observedMax": 72,
      "benefitLabels": {
        "learning": "Lernen",
        "employees": "Mitarbeitende",
        "society": "Gesellschaft",
        "environment": "Umwelt",
        "economic": "Wirtschaft"
      },
      "maturityScale": [
        {
          "value": 0,
          "label": "Idee oder Konzept"
        },
        {
          "value": 1,
          "label": "Prototypische Umsetzung"
        },
        {
          "value": 2,
          "label": "Markteintritt, Unternehmens-Testphase oder Pilot"
        },
        {
          "value": 3,
          "label": "Serie / Einsatz, robuste Prozesse noch offen"
        },
        {
          "value": 0,
          "label": "Seit Jahren in Serie / Einsatz, robuste Prozesse abgeschlossen"
        }
      ],
      "note": "Subjektive, multiplikative Bewertung. 0 Nutzenpunkte bedeuten: nicht hinreichend belegt. Reifegrad 0 kann sowohl eine frühe Idee als auch bereits etablierten Betrieb bezeichnen. Keine wirtschaftliche Rangliste.",
      "scope": "Drei abhängige Vorhaben im Starship-Ökosystem plus Starlink als Bonus; Nutzen und Märkte dürfen nicht addiert werden.",
      "provenance": {
        "file": "part2",
        "sheet": "Inno_Prüfstand",
        "cells": "A9:I36"
      }
    },
    "trend": {
      "name": "Trendportfolio",
      "x": "Trenddruck",
      "y": "Einflussstärke",
      "formula": "Trenddruck = Trenddauer + Trendnähe",
      "xDomain": [
        1,
        10
      ],
      "yDomain": [
        1,
        5
      ],
      "thresholds": {
        "x": 6,
        "y": 3
      },
      "integerCellBoundaries": {
        "x": 5.5,
        "y": 2.5
      },
      "durationScale": {
        "1": "bis etwa 1 Jahr",
        "2": "etwa 1–3 Jahre",
        "3": "länger als 3 Jahre"
      },
      "proximityScale": {
        "1": "erste schwache Signale",
        "2": "klar erkennbare Signale",
        "3": "erste konkrete Anwendungen",
        "4": "in ersten Bereichen etabliert",
        "5": "deutlich etabliert",
        "6": "breite Durchdringung",
        "7": "prägend / Mainstream"
      },
      "kindLabels": {
        "C": "Chance",
        "R": "Risiko",
        "C/R": "Chance und Risiko"
      },
      "quadrants": {
        "act": "Sofort handeln · Chancen nutzen · Risiken abwehren",
        "wildcards": "Potenzielle Wildcards",
        "watch": "Beobachten",
        "sideEffects": "Auf Nebeneffekte prüfen"
      },
      "note": "Alle acht Trends liegen bei beiden Bewertungen im Handlungsquadranten. Numerische Punkte und ihre Unterschiede bleiben sichtbar; identische Punkte müssen gruppiert oder beschriftet werden.",
      "provenance": {
        "file": "part3",
        "sheet": "Portfolio",
        "cells": "B3"
      }
    },
    "selection": {
      "name": "Qualitative Vorauswahl",
      "criteria": [
        "Ist das Problem belegt?",
        "Wer bezahlt und gibt es dafür Hinweise?",
        "Welchen spezifischen Beitrag kann SpaceX leisten?"
      ],
      "trendIdeaCount": 19,
      "selectedTrendIdeaCount": 8,
      "openInnovationIdeaCount": 4,
      "matrixIdeaCount": 12,
      "totalGeneratedIdeaCount": 23,
      "note": "Je Trend wird eine von 19 Ideen qualitativ gewählt. Vier Open-Innovation-Ideen kommen zusätzlich in die 12er-Matrix; sie wurden im 19er-Ideenvergleich nicht gegeneinander bewertet.",
      "businessCaseSelection": "RocketLight Dinner, Starlink Insights und Launch Engineering Cloud werden anschließend vertieft. Diese Dreierauswahl ist kein automatisches Ergebnis der Team-Matrix: Launch Engineering Cloud ist dort NOW.",
      "provenance": [
        {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "A1:D69"
        },
        {
          "file": "part3",
          "sheet": "Auswahlübersicht",
          "cells": "A3:D15"
        },
        {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "A3"
        }
      ]
    },
    "matrix": {
      "name": "Now-How-Wow",
      "x": "Machbarkeit",
      "y": "Originalität",
      "xDomain": [
        1,
        5
      ],
      "yDomain": [
        1,
        5
      ],
      "thresholds": {
        "x": 4,
        "y": 4
      },
      "integerCellBoundaries": {
        "x": 3.5,
        "y": 3.5
      },
      "categories": {
        "WOW": "Machbarkeit hoch, Originalität hoch",
        "NOW": "Machbarkeit hoch, Originalität gering",
        "HOW": "Machbarkeit gering, Originalität hoch",
        "VERWERFEN": "Machbarkeit gering, Originalität gering"
      },
      "note": "Ab 4 Punkten gilt eine Dimension als hoch. Frühe subjektive Vorauswahl; kein Business Case. Die 5/5 von RocketLight ist keine abgeschlossene Validierung.",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "A7:H15"
      }
    },
    "radar": {
      "formula": "Trendnähe ≥ 6 → 0–1 Jahr; ≥ 4 → 1–3 Jahre; sonst 3–10 Jahre",
      "note": "Die Radarringe sind ein abgeleiteter Betrachtungshorizont, keine Kalenderprognose. Fachkräftemangel ist der einzige Unterschied zwischen KI- und Team-Ring.",
      "provenance": {
        "file": "part3",
        "sheet": "Trendradar",
        "cells": "B3:J14"
      }
    }
  },
  "audit": [
    {
      "id": "starship-v3",
      "shortName": "Starship V3",
      "focus": "Träger und Rückführung beider Stufen",
      "interpretation": "Das Team bewertet V3 als Prototyp und den Nutzen höher als die KI. Der Hube-Wert steigt trotz niedrigerem Reifegrad von 16 auf 32.",
      "rationale": {
        "team": "Prototypische Umsetzung; Lern-, Umwelt- und wirtschaftlicher Nutzen werden mit insgesamt 4 Punkten eingeschätzt.",
        "ai": "Testphase mit belegtem Lernnutzen; weitere Nutzenpunkte werden ohne projektspezifischen Nachweis nicht vergeben."
      },
      "nextEvidence": "Wiederholter Start, Rückkehr und erneuter Flug derselben beiden Stufen; belastbare Daten zu Inspektion und Zuverlässigkeit.",
      "sources": [
        "part2-Q01",
        "part2-Q08",
        "part2-Q11",
        "part2-Q12",
        "part2-Q13",
        "part2-Q17"
      ],
      "name": "Starship / Super Heavy V3",
      "team": {
        "noveltyFor": 4,
        "noveltyType": 2,
        "maturity": 1,
        "benefits": 4,
        "benefitBreakdown": {
          "learning": 1,
          "employees": 0,
          "society": 0,
          "environment": 1,
          "economic": 2
        },
        "novelty": 8,
        "implementation": 4,
        "score": 32,
        "rank": 2
      },
      "ai": {
        "noveltyFor": 4,
        "noveltyType": 2,
        "maturity": 2,
        "benefits": 1,
        "benefitBreakdown": {
          "learning": 1,
          "employees": 0,
          "society": 0,
          "environment": 0,
          "economic": 0
        },
        "novelty": 8,
        "implementation": 2,
        "score": 16,
        "rank": 3
      },
      "provenance": {
        "team": {
          "file": "part2",
          "sheet": "Inno_Prüfstand",
          "cells": "C6:C40"
        },
        "ai": {
          "file": "part2",
          "sheet": "Inno_Prüfstand",
          "cells": "B6:B40"
        },
        "ranking": {
          "file": "part2",
          "sheet": "Ranking",
          "cells": "A8:J8"
        },
        "profile": {
          "file": "part2",
          "sheet": "Steckbriefe",
          "cells": "A7:H22"
        }
      }
    },
    {
      "id": "orbital-refuelling",
      "shortName": "Orbitale Betankung",
      "focus": "Tanker, Depot und Treibstofflogistik im Orbit",
      "interpretation": "Das Team stuft das Neuheitsprinzip wegen historischer Betankungsvorläufer niedriger ein. Daraus folgen 24 statt 48 Punkte.",
      "rationale": {
        "team": "Neue Kombination in einer bekannten Anwendung: 4 × 2 Neuheit, Prototypenreife 1 und Nutzen 3.",
        "ai": "Neue Lösung und Versorgungsanwendung im großen Maßstab: 4 × 4 Neuheit, Prototypenreife 1 und Nutzen 3."
      },
      "nextEvidence": "Transfer zwischen getrennt gestarteten Fahrzeugen, anschließend wiederholte Kopplungen und Langzeitspeicherung.",
      "sources": [
        "part2-Q02",
        "part2-Q03",
        "part2-Q06",
        "part2-Q08",
        "part2-Q18"
      ],
      "name": "Orbitale Betankung: Tanker & Depot",
      "team": {
        "noveltyFor": 4,
        "noveltyType": 2,
        "maturity": 1,
        "benefits": 3,
        "benefitBreakdown": {
          "learning": 1,
          "employees": 0,
          "society": 0,
          "environment": 0,
          "economic": 2
        },
        "novelty": 8,
        "implementation": 3,
        "score": 24,
        "rank": 3
      },
      "ai": {
        "noveltyFor": 4,
        "noveltyType": 4,
        "maturity": 1,
        "benefits": 3,
        "benefitBreakdown": {
          "learning": 1,
          "employees": 0,
          "society": 0,
          "environment": 0,
          "economic": 2
        },
        "novelty": 16,
        "implementation": 3,
        "score": 48,
        "rank": 2
      },
      "provenance": {
        "team": {
          "file": "part2",
          "sheet": "Inno_Prüfstand",
          "cells": "E6:E40"
        },
        "ai": {
          "file": "part2",
          "sheet": "Inno_Prüfstand",
          "cells": "D6:D40"
        },
        "ranking": {
          "file": "part2",
          "sheet": "Ranking",
          "cells": "A9:J9"
        },
        "profile": {
          "file": "part2",
          "sheet": "Steckbriefe",
          "cells": "A25:H40"
        }
      }
    },
    {
      "id": "raptor-3",
      "shortName": "Raptor 3",
      "focus": "Antriebsintegration und wiederholbarer Betrieb",
      "interpretation": "Mit 64 Punkten liegt Raptor 3 im Team-Ranking vorn. Der Unterschied zur KI entsteht vollständig durch die Nutzenbewertung 4 statt 1.",
      "rationale": {
        "team": "Lernnutzen 1, Umweltwirkung 1 und wirtschaftlicher Nutzen 2; diese Nutzenpunkte sind Einschätzungen des Teams.",
        "ai": "Bei gleicher Neuheit und Testreife wird nur der Lernnutzen als hinreichend belegt bewertet."
      },
      "nextEvidence": "Vergleichbare Daten zu Mehrfachflügen, Wiederzündung, Inspektion und Lebensdauer.",
      "sources": [
        "part2-Q01",
        "part2-Q12",
        "part2-Q19",
        "part2-Q20",
        "part2-Q21"
      ],
      "name": "Raptor 3 – Antriebsintegration",
      "team": {
        "noveltyFor": 4,
        "noveltyType": 2,
        "maturity": 2,
        "benefits": 4,
        "benefitBreakdown": {
          "learning": 1,
          "employees": 0,
          "society": 0,
          "environment": 1,
          "economic": 2
        },
        "novelty": 8,
        "implementation": 8,
        "score": 64,
        "rank": 1
      },
      "ai": {
        "noveltyFor": 4,
        "noveltyType": 2,
        "maturity": 2,
        "benefits": 1,
        "benefitBreakdown": {
          "learning": 1,
          "employees": 0,
          "society": 0,
          "environment": 0,
          "economic": 0
        },
        "novelty": 8,
        "implementation": 2,
        "score": 16,
        "rank": 3
      },
      "provenance": {
        "team": {
          "file": "part2",
          "sheet": "Inno_Prüfstand",
          "cells": "G6:G40"
        },
        "ai": {
          "file": "part2",
          "sheet": "Inno_Prüfstand",
          "cells": "F6:F40"
        },
        "ranking": {
          "file": "part2",
          "sheet": "Ranking",
          "cells": "A10:J10"
        },
        "profile": {
          "file": "part2",
          "sheet": "Steckbriefe",
          "cells": "A43:H58"
        }
      }
    },
    {
      "id": "starlink",
      "shortName": "Starlink",
      "focus": "LEO-Breitbandkonstellation · Bonusprojekt",
      "interpretation": "0 Punkte entstehen durch die Hube-Regel für bereits etablierten Betrieb: Reifegrad 0. Das Team vergibt zugleich 4 Nutzenpunkte. Der Wert ist kein Urteil über wirtschaftlichen Erfolg.",
      "rationale": {
        "team": "Seit Jahren im kommerziellen Betrieb: Reifegrad 0. Lern-, gesellschaftlicher und wirtschaftlicher Nutzen ergeben zusammen 4 Punkte.",
        "ai": "Serieneinsatz mit noch offenen robusten Prozessen: Reifegrad 3. Bei 3 Nutzenpunkten entstehen 72 Punkte."
      },
      "nextEvidence": "Unabhängige Leistungs-, Wirkungs- und Umweltprüfung neuer Satellitengenerationen.",
      "sources": [
        "part2-Q04",
        "part2-Q05",
        "part2-Q07",
        "part2-Q14",
        "part2-Q15",
        "part2-Q16",
        "part2-Q22",
        "part2-Q23",
        "part2-Q24"
      ],
      "name": "Starlink – LEO-Breitbandkonstellation (Bonus)",
      "team": {
        "noveltyFor": 4,
        "noveltyType": 2,
        "maturity": 0,
        "benefits": 4,
        "benefitBreakdown": {
          "learning": 1,
          "employees": 0,
          "society": 1,
          "environment": 0,
          "economic": 2
        },
        "novelty": 8,
        "implementation": 0,
        "score": 0,
        "rank": 4
      },
      "ai": {
        "noveltyFor": 4,
        "noveltyType": 2,
        "maturity": 3,
        "benefits": 3,
        "benefitBreakdown": {
          "learning": 1,
          "employees": 0,
          "society": 0,
          "environment": 0,
          "economic": 2
        },
        "novelty": 8,
        "implementation": 9,
        "score": 72,
        "rank": 1
      },
      "provenance": {
        "team": {
          "file": "part2",
          "sheet": "Inno_Prüfstand",
          "cells": "I6:I40"
        },
        "ai": {
          "file": "part2",
          "sheet": "Inno_Prüfstand",
          "cells": "H6:H40"
        },
        "ranking": {
          "file": "part2",
          "sheet": "Ranking",
          "cells": "A11:J11"
        },
        "profile": {
          "file": "part2",
          "sheet": "Steckbriefe",
          "cells": "A61:H76"
        }
      }
    }
  ],
  "trends": [
    {
      "id": "neo-ecology",
      "number": 1,
      "name": "Neo-Ökologie",
      "kind": "C/R",
      "summary": "Ressourcen, Umweltauflagen und Wiederverwendung betreffen mehrere Teile des Systems.",
      "rationale": {
        "team": "Das Team sieht den Einfluss in einem Großteil des Unternehmens, die Etablierung aber eine Stufe früher als die KI. Ein positiver Gesamt-Umwelteffekt wird nicht vorausgesetzt.",
        "ai": "Starker Einfluss auf mehrere Bereiche; Wiederverwendung und Umweltprüfungen wirken zugleich als Chance und Risiko."
      },
      "selectedIdeaId": 1,
      "radar": {
        "category": "Biosphäre",
        "teamHorizon": "1-3 Jahre",
        "aiHorizon": "1-3 Jahre"
      },
      "sources": [
        "part3-Q21",
        "part3-Q22",
        "part3-Q29",
        "part3-Q30"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Trendbewertung",
          "cells": "A3:O3"
        },
        "radar": {
          "file": "part3",
          "sheet": "Trendradar",
          "cells": "B7:J7"
        }
      },
      "team": {
        "influence": 5,
        "duration": 3,
        "proximity": 4,
        "pressure": 7,
        "quadrant": "act"
      },
      "ai": {
        "influence": 4,
        "duration": 3,
        "proximity": 5,
        "pressure": 8,
        "quadrant": "act"
      }
    },
    {
      "id": "individualism",
      "number": 2,
      "name": "Individualismus",
      "kind": "C",
      "summary": "Personalisierbare Angebote machen aus standardisierter Infrastruktur individuelle Erlebnisse.",
      "rationale": {
        "team": "Mittlerer Einfluss auf einzelne Angebote und Kundengruppen; der Trend ist in ersten Bereichen etabliert.",
        "ai": "Rideshare und private Missionen eröffnen individuelle Zugänge; kein dominierender Einfluss auf das gesamte Unternehmen."
      },
      "selectedIdeaId": 2,
      "radar": {
        "category": "Politik/Gesellschaft",
        "teamHorizon": "1-3 Jahre",
        "aiHorizon": "1-3 Jahre"
      },
      "sources": [
        "part3-Q21",
        "part3-Q23"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Trendbewertung",
          "cells": "A5:O5"
        },
        "radar": {
          "file": "part3",
          "sheet": "Trendradar",
          "cells": "B8:J8"
        }
      },
      "team": {
        "influence": 3,
        "duration": 3,
        "proximity": 4,
        "pressure": 7,
        "quadrant": "act"
      },
      "ai": {
        "influence": 3,
        "duration": 3,
        "proximity": 4,
        "pressure": 7,
        "quadrant": "act"
      }
    },
    {
      "id": "ai",
      "number": 3,
      "name": "KI",
      "kind": "C/R",
      "summary": "KI erschließt datenbasierte Leistungen und erhöht Anforderungen an Kapital, Technik und Kontrolle.",
      "rationale": {
        "team": "Sehr starker Einfluss und breite Durchdringung; Chance und Risiko werden gemeinsam bewertet.",
        "ai": "Neue KI- und Rechenleistungen erweitern die Möglichkeiten, erhöhen zugleich Technologie- und Investitionsrisiken."
      },
      "selectedIdeaId": 3,
      "radar": {
        "category": "Technologien",
        "teamHorizon": "0-1 Jahr",
        "aiHorizon": "0-1 Jahr"
      },
      "sources": [
        "part3-Q21",
        "part3-Q24",
        "part3-Q25"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Trendbewertung",
          "cells": "A7:O7"
        },
        "radar": {
          "file": "part3",
          "sheet": "Trendradar",
          "cells": "B9:J9"
        }
      },
      "team": {
        "influence": 5,
        "duration": 3,
        "proximity": 6,
        "pressure": 9,
        "quadrant": "act"
      },
      "ai": {
        "influence": 5,
        "duration": 3,
        "proximity": 6,
        "pressure": 9,
        "quadrant": "act"
      }
    },
    {
      "id": "data",
      "number": 4,
      "name": "Daten als Ressource",
      "kind": "C/R",
      "summary": "Betriebsdaten können Entwicklung verbessern und Grundlage neuer Dienstleistungen werden.",
      "rationale": {
        "team": "Sehr starker Einfluss und prägende Rolle im Geschäft; der Trenddruck erreicht 10 von 10 Punkten.",
        "ai": "Flug-, Test-, Telemetrie- und Netzdaten sind Inputs für Entwicklung, Betrieb und datenbasierte Services."
      },
      "selectedIdeaId": 4,
      "radar": {
        "category": "Technologien",
        "teamHorizon": "0-1 Jahr",
        "aiHorizon": "0-1 Jahr"
      },
      "sources": [
        "part3-Q21"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Trendbewertung",
          "cells": "A9:O9"
        },
        "radar": {
          "file": "part3",
          "sheet": "Trendradar",
          "cells": "B10:J10"
        }
      },
      "team": {
        "influence": 5,
        "duration": 3,
        "proximity": 7,
        "pressure": 10,
        "quadrant": "act"
      },
      "ai": {
        "influence": 5,
        "duration": 3,
        "proximity": 7,
        "pressure": 10,
        "quadrant": "act"
      }
    },
    {
      "id": "skills",
      "number": 5,
      "name": "Fachkräftemangel",
      "kind": "R",
      "summary": "Spezialisierte Fähigkeiten begrenzen die Geschwindigkeit von Entwicklung und Skalierung.",
      "rationale": {
        "team": "Sehr starker Einfluss; das Team bewertet die Nähe mit 5 statt 6. Exportkontrolle begrenzt den Zugang zu sensibler Technologie; sie bedeutet kein pauschales Verbot, Nicht-US-Bürger einzustellen.",
        "ai": "Knappheit hochqualifizierter Engineering- und Technikfachkräfte kann Entwicklungs- und Produktionspläne direkt beeinflussen."
      },
      "selectedIdeaId": 5,
      "radar": {
        "category": "Politik/Gesellschaft",
        "teamHorizon": "1-3 Jahre",
        "aiHorizon": "0-1 Jahr"
      },
      "sources": [
        "part3-Q21",
        "part3-Q26",
        "part3-Q31",
        "part3-Q32",
        "verified-itar-definition",
        "verified-spacex-hiring"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Trendbewertung",
          "cells": "A11:O11"
        },
        "radar": {
          "file": "part3",
          "sheet": "Trendradar",
          "cells": "B11:J11"
        }
      },
      "team": {
        "influence": 5,
        "duration": 3,
        "proximity": 5,
        "pressure": 8,
        "quadrant": "act"
      },
      "ai": {
        "influence": 5,
        "duration": 3,
        "proximity": 6,
        "pressure": 9,
        "quadrant": "act"
      }
    },
    {
      "id": "digital-nomads",
      "number": 6,
      "name": "Digital Nomads",
      "kind": "C",
      "summary": "Mobiles Arbeiten schafft Nachfrage nach verlässlichen Verbindungen und Arbeitsorten.",
      "rationale": {
        "team": "Mit 4 statt 3 Punkten bewertet das Team den Einfluss stärker; Starlink-Konnektivität verbindet das Thema mit mehreren Unternehmensbereichen.",
        "ai": "Die Chance liegt besonders im Connectivity-Angebot; auf Launch wirkt sie überwiegend indirekt."
      },
      "selectedIdeaId": 6,
      "radar": {
        "category": "Kunden/Märkte",
        "teamHorizon": "1-3 Jahre",
        "aiHorizon": "1-3 Jahre"
      },
      "sources": [
        "part3-Q27",
        "part3-Q33"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Trendbewertung",
          "cells": "A13:O13"
        },
        "radar": {
          "file": "part3",
          "sheet": "Trendradar",
          "cells": "B12:J12"
        }
      },
      "team": {
        "influence": 4,
        "duration": 3,
        "proximity": 5,
        "pressure": 8,
        "quadrant": "act"
      },
      "ai": {
        "influence": 3,
        "duration": 3,
        "proximity": 5,
        "pressure": 8,
        "quadrant": "act"
      }
    },
    {
      "id": "regulation",
      "number": 7,
      "name": "Überregulierung",
      "kind": "R",
      "summary": "Genehmigungen und Nachweise werden selbst zum möglichen Serviceproblem für Kunden.",
      "rationale": {
        "team": "Sehr starker Einfluss; regulatorischer Genehmigungs- und Compliance-Druck wird als Risiko bewertet.",
        "ai": "Launch-, Frequenz-, Export- und Sicherheitsanforderungen können Zeitpläne und Betriebsparameter beeinflussen."
      },
      "selectedIdeaId": 7,
      "radar": {
        "category": "Politik/Gesellschaft",
        "teamHorizon": "0-1 Jahr",
        "aiHorizon": "0-1 Jahr"
      },
      "sources": [
        "part3-Q21",
        "part3-Q28"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Trendbewertung",
          "cells": "A15:O15"
        },
        "radar": {
          "file": "part3",
          "sheet": "Trendradar",
          "cells": "B13:J13"
        }
      },
      "team": {
        "influence": 5,
        "duration": 3,
        "proximity": 6,
        "pressure": 9,
        "quadrant": "act"
      },
      "ai": {
        "influence": 5,
        "duration": 3,
        "proximity": 6,
        "pressure": 9,
        "quadrant": "act"
      }
    },
    {
      "id": "innovation-pressure",
      "number": 8,
      "name": "Innovationsdruck",
      "kind": "C/R",
      "summary": "Kurze Lernzyklen und frühe Prüfungen sollen spätere Integrationsprobleme vermeiden.",
      "rationale": {
        "team": "Sehr starker Einfluss und prägende Rolle; hoher Handlungsdruck kann neue Angebote ermöglichen und zugleich Ressourcen beanspruchen.",
        "ai": "Entwicklungsgeschwindigkeit, Wiederverwendung und Kostenreduktion erzeugen kontinuierlichen Innovationsdruck."
      },
      "selectedIdeaId": 8,
      "radar": {
        "category": "Kunden/Märkte",
        "teamHorizon": "0-1 Jahr",
        "aiHorizon": "0-1 Jahr"
      },
      "sources": [
        "part3-Q21",
        "part3-Q25"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Trendbewertung",
          "cells": "A17:O17"
        },
        "radar": {
          "file": "part3",
          "sheet": "Trendradar",
          "cells": "B14:J14"
        }
      },
      "team": {
        "influence": 5,
        "duration": 3,
        "proximity": 7,
        "pressure": 10,
        "quadrant": "act"
      },
      "ai": {
        "influence": 5,
        "duration": 3,
        "proximity": 7,
        "pressure": 10,
        "quadrant": "act"
      }
    }
  ],
  "ideaComparison": [
    {
      "id": "N1",
      "name": "Starlink Climate Watch",
      "trendId": "neo-ecology",
      "selected": true,
      "matrixId": 1,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Zusätzliche Sensoren auf Starlink-Satelliten erfassen Methanemissionen. Betreiber von Öl-, Gas- und Kohleanlagen erhalten Messkarten, Alarme und Berichte.",
      "value": "Messkarten können helfen, Emissionsquellen zu finden und Maßnahmen zu prüfen. Anerkannte Berichte für Pflichtmeldungen wären erst nach Validierung und Prüfung der Anforderungen möglich. Geplantes Erlösmodell: Datenabos.",
      "tradeoff": "Pro: Mess-, Berichts- und Prüfpflichten können Bedarf für belastbare Methandaten schaffen [Q05, Q06].\nKontra: GHGSat bietet bereits Messdienste an [Q04]. Integration, Datenqualität, regulatorische Anerkennung und die Zahlungsbereitschaft für dieses konkrete Angebot sind offen; der in der Quelle beschriebene Änderungsvorschlag ist kein geltendes Recht [Q07].",
      "need": "Bedarf: Über 35 Mio. t Methan aus dem fossilen Energiesektor ließen sich pro Jahr ohne Nettokosten vermeiden; die Datenlage zu Emissionen ist zwischen Ländern sehr uneinheitlich. [Q05] Die EU-Methanverordnung verpflichtet Betreiber und Importeure zu Messung, Berichterstattung und unabhängiger Prüfung. [Q06]\nZukunftsmarkt und Chance: Emissionsmessung als Datenabo; alternativ sparsamere Bodenlogistik oder vernetzte Umweltmessstationen.",
      "sources": [
        "part3-Q04",
        "part3-Q05",
        "part3-Q06",
        "part3-Q07"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B7:B10"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B6"
        },
        "selection": {
          "file": "part3",
          "sheet": "Auswahlübersicht",
          "cells": "A8:D8"
        }
      },
      "selectionRationale": "Das Problem der Emissionsmessung ist belegt; regulatorische Pflichten können den Bedarf verstärken. Starlink-Plattform, eigene Starts und Datenübertragung wären mögliche Beiträge. Gegenüber Bodenlogistik und reiner Vernetzung ist die Raumfahrt-Verbindung enger. Technische Eignung und zahlende Kunden sind noch nachzuweisen [Q04–Q07].",
      "editorialNote": "Quellengestützte redaktionelle Präzisierung; ursprüngliche qualitative Auswahl unverändert."
    },
    {
      "id": "N2",
      "name": "SpaceX Reuse Logistics",
      "trendId": "neo-ecology",
      "selected": false,
      "matrixId": null,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Satellitenhersteller und Zulieferer mieten wiederverwendbare Transportbehälter und Halterungen für Lieferungen zu Integrations- und Startstandorten. SpaceX organisiert mit Logistikpartnern Rücknahme, Prüfung und erneuten Einsatz.",
      "value": "Kunden brauchen weniger eigene Spezialbehälter und organisieren keine Rücktransporte. Erlöse aus Miete und Logistikgebühren; weniger Verpackungsabfall als Zusatznutzen.",
      "tradeoff": "Pro: einfach umsetzbar, kein neues Raumfahrtsystem nötig.\nKontra: lohnt sich nur bei häufigem Einsatz und günstigen Rücktransporten; geringer Bezug zu dem, was nur SpaceX kann. Kein Beleg für den Bedarf (eigene Einschätzung).",
      "need": "Bedarf: Über 35 Mio. t Methan aus dem fossilen Energiesektor ließen sich pro Jahr ohne Nettokosten vermeiden; die Datenlage zu Emissionen ist zwischen Ländern sehr uneinheitlich. [Q05] Die EU-Methanverordnung verpflichtet Betreiber und Importeure zu Messung, Berichterstattung und unabhängiger Prüfung. [Q06]\nZukunftsmarkt und Chance: Emissionsmessung als Datenabo; alternativ sparsamere Bodenlogistik oder vernetzte Umweltmessstationen.",
      "sources": [
        "part3-Q05",
        "part3-Q06"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "C7:C10"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B6"
        }
      }
    },
    {
      "id": "N3",
      "name": "Starlink Environmental Connect",
      "trendId": "neo-ecology",
      "selected": false,
      "matrixId": null,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Ein Partnerpaket verbindet Umweltmessstationen abgelegener Industrieanlagen über einen gemeinsam genutzten Starlink-Anschluss.",
      "value": "Betreiber rufen Messwerte aus der Ferne ab und sparen Kontrollfahrten. Einnahmen aus Verbindung und Partnerleistungen.",
      "tradeoff": "Pro: nutzt vorhandene Starlink-Technik.\nKontra: Für kleine Datenmengen ist ein Starlink-Anschluss oft zu aufwendig; die Messung bleibt Aufgabe des Kunden, SpaceX liefert nur die Verbindung. Kein Beleg für den Bedarf (eigene Einschätzung).",
      "need": "Bedarf: Über 35 Mio. t Methan aus dem fossilen Energiesektor ließen sich pro Jahr ohne Nettokosten vermeiden; die Datenlage zu Emissionen ist zwischen Ländern sehr uneinheitlich. [Q05] Die EU-Methanverordnung verpflichtet Betreiber und Importeure zu Messung, Berichterstattung und unabhängiger Prüfung. [Q06]\nZukunftsmarkt und Chance: Emissionsmessung als Datenabo; alternativ sparsamere Bodenlogistik oder vernetzte Umweltmessstationen.",
      "sources": [
        "part3-Q05",
        "part3-Q06"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "D7:D10"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B6"
        }
      }
    },
    {
      "id": "I1",
      "name": "SpaceX My Mission",
      "trendId": "individualism",
      "selected": true,
      "matrixId": 2,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Privatpersonen, Schulen und kleine Unternehmen konfigurieren eine Mini-Nutzlast für einen Rideshare-Flug: persönliche Gegenstände, Schul- oder Kunstexperimente. Wählbar sind Größe, Missionsdauer und Extras wie Kamera, Messdaten oder Rückführung.",
      "value": "Kunden erhalten einen eigenen Zugang zum Weltraum und verfolgen ihre Nutzlast per App. SpaceX verkauft Missionspakete und Extras auf Basis freier Rideshare-Kapazität.",
      "tradeoff": "Pro: SpaceX fliegt SSO-Rideshare etwa alle vier Monate und kann Restkapazität nutzen [Q01].\nKontra: Auch Kleinstnutzlasten müssen Sicherheits-, Umwelttest- und Lizenzanforderungen erfüllen [Q02]; Extras wie Kamera oder Rückführung erhöhen Aufwand und Preis. Die Zahlungsbereitschaft privater Kunden ist nicht belegt.",
      "need": "Die referenzierten SpaceX-/NASA-Unterlagen beschreiben Rideshare-Pakete für Satellitenbetreiber ab rund 50 kg. Daraus leitet die Gruppe eine mögliche Lücke für viel kleinere persönliche oder schulische Nutzlasten ab; eine belegte Nachfrage folgt daraus nicht [Q01–Q03].",
      "sources": [
        "part3-Q01",
        "part3-Q02",
        "part3-Q03"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B15:B18"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B14"
        },
        "selection": {
          "file": "part3",
          "sheet": "Auswahlübersicht",
          "cells": "A9:D9"
        }
      },
      "selectionRationale": "Rideshare bildet einen vorhandenen Zugang zum All. Die Gruppe untersucht, ob er sich zu buchbaren Kleinstmissionen erweitern lässt. Zahlungsbereitschaft, Nutzlastsicherheit und Lizenzierung bleiben offen. Virtuelle Missionen wären technisch leichter, nutzen die Startkapazität jedoch nicht [Q01–Q03].",
      "editorialNote": "Quellengestützte redaktionelle Präzisierung; ursprüngliche qualitative Auswahl unverändert."
    },
    {
      "id": "I2",
      "name": "SpaceX Mission Studio",
      "trendId": "individualism",
      "selected": false,
      "matrixId": null,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Schulen, Museen und Bildungsanbieter nutzen eine individuell gestaltbare virtuelle Raummission mit freigegebenen SpaceX-Inhalten.",
      "value": "Anschauliches Lernen ohne echten Flug. Ein Bildungspartner entwickelt das Angebot; Erlöse aus Lizenzen.",
      "tradeoff": "Pro: günstig und für viele zugänglich.\nKontra: nutzt den Startvorteil von SpaceX nicht; SpaceX stellt vor allem Inhalte und Markenrechte, die Entwicklung läge bei einem Bildungspartner. Kein Beleg für den Bedarf (eigene Einschätzung).",
      "need": "Bedarf: Das kleinste Rideshare-Paket von SpaceX umfasst 50 kg [Q01], laut NASA ab rund 350.000 USD [Q03]. Für Privatpersonen, Schulen und kleine Unternehmen gibt es kein eigenes Angebot.\nZukunftsmarkt und Chance: Buchbare Mini-Missionen mit wählbaren Zusatzleistungen; alternativ virtuelle Raumfahrterlebnisse.",
      "sources": [
        "part3-Q01",
        "part3-Q03"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "C15:C18"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B14"
        }
      }
    },
    {
      "id": "K1",
      "name": "Starlink Edge AI",
      "trendId": "ai",
      "selected": true,
      "matrixId": 3,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Kunden senden Sensor-, Kamera- oder Drohnendaten über Starlink und erhalten KI-Auswertungen zurück: Landwirte etwa Hinweise auf Schädlingsbefall, Reedereien Wartungswarnungen aus Maschinendaten.",
      "value": "Kunden sparen den Aufbau einer eigenen KI-Lösung. SpaceX verkauft die Auswertung zusammen mit dem Starlink-Zugang als Abo.",
      "tradeoff": "Pro: Zielkunden zahlen bereits für Starlink Business und nutzen es für Datenanwendungen [Q11, Q12]; Edge AI ist eine Zusatzstufe im selben Vertrag.\nKontra: Jede Branche braucht eigene Modelle; Cloud-Anbieter und Maschinenhersteller bieten Auswertungen teils selbst an. Der Mehrwert gegenüber bestehenden Lösungen ist noch zu zeigen.",
      "need": "Bedarf: Starlink wirbt bei Landwirtschaft und Energie mit Echtzeit-Auswertung von IoT-Daten [Q11] und verbindet Landmaschinen von John Deere für Datenaustausch und Ferndiagnose [Q12]. Die Auswertung selbst liegt beim Kunden oder bei Dritten.\nZukunftsmarkt und Chance: Internet und KI-Auswertung als gemeinsames Abo. Weitere Anwendungen liegen in Astronautentraining und medizinischer Betreuung.",
      "sources": [
        "part3-Q11",
        "part3-Q12"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B23:B26"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B22"
        },
        "selection": {
          "file": "part3",
          "sheet": "Auswahlübersicht",
          "cells": "A10:D10"
        }
      },
      "selectionRationale": "Die referenzierten Starlink-Angebote und der John-Deere-Fall zeigen Kunden mit Konnektivitäts- und Datenanwendungen. Eine zusätzliche KI-Auswertung im selben Angebot ist eine plausible Erweiterung, aber deren Zahlungsbereitschaft ist nicht belegt. Training und Crew-Medizin hätten einen engeren Missionskundenkreis [Q09–Q12].",
      "editorialNote": "Quellengestützte redaktionelle Präzisierung; ursprüngliche qualitative Auswahl unverändert."
    },
    {
      "id": "K2",
      "name": "KI-gestützte Astronautenschulung",
      "trendId": "ai",
      "selected": false,
      "matrixId": null,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "KI wertet Flugdaten aus und schlägt vor, welche Situationen Astronauten stärker trainieren sollten; Trainer entscheiden. NASA untersucht KI für Training und Missionsbetrieb. [Q10]",
      "value": "Trainings gehen gezielter auf Schwierigkeiten früherer Missionen ein. SpaceX nutzt es selbst oder bietet es Missionspartnern an.",
      "tradeoff": "Pro: SpaceX kann eigene Missionserfahrung direkt nutzen.\nKontra: Nutzen zunächst intern; zahlende Kunden sind auf wenige Missions- und Trainingspartner begrenzt.",
      "need": "Bedarf: Starlink wirbt bei Landwirtschaft und Energie mit Echtzeit-Auswertung von IoT-Daten [Q11] und verbindet Landmaschinen von John Deere für Datenaustausch und Ferndiagnose [Q12]. Die Auswertung selbst liegt beim Kunden oder bei Dritten.\nZukunftsmarkt und Chance: Internet und KI-Auswertung als gemeinsames Abo. Weitere Anwendungen liegen in Astronautentraining und medizinischer Betreuung.",
      "sources": [
        "part3-Q10",
        "part3-Q11",
        "part3-Q12"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "C23:C26"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B22"
        }
      }
    },
    {
      "id": "K3",
      "name": "Crew Health Assistant",
      "trendId": "ai",
      "selected": false,
      "matrixId": null,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "KI prüft Gesundheitsdaten während einer Mission und weist das medizinische Team auf Auffälligkeiten hin. NASA beschreibt einen ähnlichen Forschungsansatz. [Q09]",
      "value": "Das Betreuungsteam sichtet große Datenmengen schneller. Missionsbetreiber zahlen für die Lösung; medizinische Partner entwickeln mit.",
      "tradeoff": "Pro: klarer Nutzen für lange Missionen [Q09].\nKontra: medizinische Fachpartner und aufwendige Prüfungen nötig; Fehler betreffen die Gesundheit der Besatzung. Kunde ist praktisch nur NASA bzw. Missionsbetreiber.",
      "need": "Bedarf: Starlink wirbt bei Landwirtschaft und Energie mit Echtzeit-Auswertung von IoT-Daten [Q11] und verbindet Landmaschinen von John Deere für Datenaustausch und Ferndiagnose [Q12]. Die Auswertung selbst liegt beim Kunden oder bei Dritten.\nZukunftsmarkt und Chance: Internet und KI-Auswertung als gemeinsames Abo. Weitere Anwendungen liegen in Astronautentraining und medizinischer Betreuung.",
      "sources": [
        "part3-Q09",
        "part3-Q11",
        "part3-Q12"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "D23:D26"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B22"
        }
      }
    },
    {
      "id": "D1",
      "name": "Starlink Insights",
      "trendId": "data",
      "selected": true,
      "matrixId": 4,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Anonymisierte Daten aus Starlink-Terminals (Signaldämpfung, Netzauslastung, Ausfälle) werden aufbereitet. Wetterdienste, Versicherungen und Logistiker erhalten Umwelt-, Wetter- und Verfügbarkeitsinformationen.",
      "value": "Geplant sind Abos für aufbereitete Wetter- und Verfügbarkeitsinformationen. Der Ansatz nutzt bestehende Netzdaten; Datenzugang, Verarbeitung, Kalibrierung und Referenzmessungen sind noch zu entwickeln.",
      "tradeoff": "Pro: Die Daten fallen im Netzbetrieb ohnehin an; der Wettereinfluss ist statistisch nachweisbar [Q13, Q14].\nKontra: In rund 140.000 Messungen erklärte Regen nur einen kleinen Teil der Schwankungen (R = −0,21); Auslastung und andere Einflüsse dominieren Einzelwerte, der Upload zeigte keinen signifikanten Effekt [Q14]. Verlässliche Wetterinformation erfordert große Datenmengen und Referenzdaten – ob das gelingt, ist offen.",
      "need": "Bedarf: Wetterdienste und Logistiker benötigen aktuelle Informationen auch aus Gebieten mit wenigen Messstationen. Starlink-Signale reagieren messbar auf Wetter: In Finnland senkte Regen den Median-Durchsatz um 38 % (Download) bzw. 52 % (Upload). [Q13]\nZukunftsmarkt und Chance: Wetter- und Netzinformationen aus Starlink-Daten; alternativ Planungskennzahlen aus abgeschlossenen Raumfahrtprojekten.",
      "sources": [
        "part3-Q13",
        "part3-Q14"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B31:B34"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B30"
        },
        "selection": {
          "file": "part3",
          "sheet": "Auswahlübersicht",
          "cells": "A11:D11"
        }
      },
      "selectionRationale": "Der Wettereinfluss auf Starlink-Verbindungen ist untersucht; der daraus ableitbare Informationswert muss erst validiert werden. Ein Datenabo für Wetterdienste, Versicherer oder Logistiker ist eine Erlöshypothese. Die Vergleichsidee Launch Benchmark adressiert einen engeren Projektmarkt [Q13, Q14].",
      "editorialNote": "Quellengestützte redaktionelle Präzisierung; ursprüngliche qualitative Auswahl unverändert."
    },
    {
      "id": "D2",
      "name": "SpaceX Launch Benchmark",
      "trendId": "data",
      "selected": false,
      "matrixId": null,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Satellitenhersteller erhalten anonymisierte Vergleichsdaten zu Dauer und typischen Verzögerungen der Startvorbereitung aus freigegebenen, abgeschlossenen Integrationsprojekten.",
      "value": "Kunden schätzen Zeitpläne realistischer ein. SpaceX verkauft Benchmarkberichte oder Datenzugang; Einzelprojekte bleiben vertraulich.",
      "tradeoff": "Pro: geringer technischer Aufwand.\nKontra: braucht genügend ähnliche Projekte und die Erlaubnis der Kunden; eher Einzelberichte für wenige Käufer als Abo. Kein Beleg für den Bedarf (eigene Einschätzung).",
      "need": "Bedarf: Wetterdienste und Logistiker benötigen aktuelle Informationen auch aus Gebieten mit wenigen Messstationen. Starlink-Signale reagieren messbar auf Wetter: In Finnland senkte Regen den Median-Durchsatz um 38 % (Download) bzw. 52 % (Upload). [Q13]\nZukunftsmarkt und Chance: Wetter- und Netzinformationen aus Starlink-Daten; alternativ Planungskennzahlen aus abgeschlossenen Raumfahrtprojekten.",
      "sources": [
        "part3-Q13"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "C31:C34"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B30"
        }
      }
    },
    {
      "id": "F1",
      "name": "SpaceX Academy",
      "trendId": "skills",
      "selected": true,
      "matrixId": 5,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Vorgeschlagen werden Kurse mit Online-Unterricht und Praxisphasen, etwa zu Fertigung, Antrieben und Startbetrieb. Zielgruppen sind eigener Nachwuchs, Zulieferer, Hochschulen und Raumfahrtunternehmen. Die studentische ESA Academy dient als Vergleichsangebot [Q16].",
      "value": "Teilnehmende erhalten Qualifikationen und Zertifikate. SpaceX gewinnt mögliche Beschäftigte und verdient an Kursgebühren oder Lizenzen.",
      "tradeoff": "Pro: Praxiswissen aus eigener Fertigung und eigenem Startbetrieb; Berufstätige und Zulieferer erweitern die Zielgruppe gegenüber dem zitierten studentischen ESA-Angebot [Q16].\nKontra: Aus- und Weiterbildung existiert bereits. Unterricht bindet Fachpersonal; Zahlungsbereitschaft und ein belegter ungedeckter Bedarf für diese Academy bleiben offen.",
      "need": "Bedarf: In der britischen Space Sector Skills Survey 2023 meldeten 52 % von 218 befragten Organisationen Qualifikationslücken, davon 72 % bei Software- und Datenkompetenzen. [Q15] Das zeigt Ausbildungsbedarf im Sektor, keine Messung bei SpaceX.\nZukunftsmarkt und Chance: Raumfahrt-Ausbildung für den eigenen Nachwuchs und externe Kunden; alternativ Fachberatung aus der Ferne.",
      "sources": [
        "part3-Q15",
        "part3-Q16"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B39:B42"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B38"
        },
        "selection": {
          "file": "part3",
          "sheet": "Auswahlübersicht",
          "cells": "A12:D12"
        }
      },
      "selectionRationale": "Die britische Skills Survey zeigt einen sektoralen Ausbildungsbedarf, misst jedoch weder SpaceX noch dessen Zulieferer. Eine eigene Academy könnte Qualifizierung und Talentgewinnung verbinden. Bestehende Akademien begrenzen die Originalität; die Nachfrage nach einem zusätzlichen Angebot ist zu prüfen [Q15, Q16].",
      "editorialNote": "Quellengestützte redaktionelle Präzisierung; ursprüngliche qualitative Auswahl unverändert."
    },
    {
      "id": "F2",
      "name": "Remote Expert Connect",
      "trendId": "skills",
      "selected": false,
      "matrixId": null,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Techniker an abgelegenen Anlagen erhalten über Starlink Unterstützung von Experten ihres Herstellers oder Servicepartners.",
      "value": "Weniger Anreisen, kürzere Stillstände. SpaceX liefert die Verbindung, der Partner die Beratung.",
      "tradeoff": "Pro: schnell umsetzbar.\nKontra: bezahlt wird vor allem die Beratung des Partners; für SpaceX bleibt das Internetgeschäft, und ein normaler Videoanruf reicht oft aus. Behebt den Mangel nicht, sondern verteilt vorhandene Experten.",
      "need": "Bedarf: In der britischen Space Sector Skills Survey 2023 meldeten 52 % von 218 befragten Organisationen Qualifikationslücken, davon 72 % bei Software- und Datenkompetenzen. [Q15] Das zeigt Ausbildungsbedarf im Sektor, keine Messung bei SpaceX.\nZukunftsmarkt und Chance: Raumfahrt-Ausbildung für den eigenen Nachwuchs und externe Kunden; alternativ Fachberatung aus der Ferne.",
      "sources": [
        "part3-Q15"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "C39:C42"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B38"
        }
      }
    },
    {
      "id": "DN1",
      "name": "Starlink Remote Hubs",
      "trendId": "digital-nomads",
      "selected": true,
      "matrixId": 6,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Ein Partnerprogramm und eine Buchungs-App vermitteln Starlink-zertifizierte Unterkünfte, Campingplätze und Coworking-Orte. Gastgeber bieten eingerichtete Arbeitsplätze mit zugesicherter Internetleistung.",
      "value": "Gäste buchen einen fertigen Arbeitsplatz mit Starlink-Internet. Gastgeber erhalten Technik, Zertifizierung und Eintrag in der App. SpaceX verdient an Hardware, Abos und Vermittlungsgebühren.",
      "tradeoff": "Pro: Gäste wissen vor der Buchung, ob Arbeitsplatz und Internet geeignet sind. Starlink startet mit „Community Host“ bereits ein Gastgebermodell mit Stunden- bis Monatspässen, bei dem Starlink Zahlung und Zugang übernimmt [Q18]; Remote Hubs kann darauf aufsetzen.\nKontra: Community Host garantiert keine Geschwindigkeit und keinen Arbeitsplatz [Q18] – genau das müssten SpaceX und Gastgeber zusichern und regelmäßig prüfen.",
      "need": "Bedarf: MBO Partners zählte 2025 in den USA 18,5 Mio. digitale Nomaden, rund 12 % der Erwerbstätigen. [Q17] Wer unterwegs arbeitet, braucht verlässliche Arbeitsplätze und Internet. Die Zahl gilt nur für die USA.\nZukunftsmarkt und Chance: Geprüfte Arbeitsorte mit Starlink-Anschluss vermitteln; alternativ Geräte zeitweise vermieten.",
      "sources": [
        "part3-Q17",
        "part3-Q18"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B47:B50"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B46"
        },
        "selection": {
          "file": "part3",
          "sheet": "Auswahlübersicht",
          "cells": "A13:D13"
        }
      },
      "selectionRationale": "Ortsunabhängiges Arbeiten schafft einen plausiblen Anwendungsfall für verlässliche Arbeitsorte. Das zitierte Community-Host-Modell ist ein Vergleich für Konnektivitätszugang; Remote Hubs soll Arbeitsplatz, Prüfung und Buchung ergänzen. Es belegt weder garantierte Geschwindigkeit noch Profitabilität oder Nachfrage nach dem erweiterten Angebot [Q17, Q18].",
      "editorialNote": "Quellengestützte redaktionelle Präzisierung; ursprüngliche qualitative Auswahl unverändert."
    },
    {
      "id": "DN2",
      "name": "Starlink Work Kit",
      "trendId": "digital-nomads",
      "selected": false,
      "matrixId": null,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Reisende mieten am Zielort ein vorbereitetes Starlink-Paket mit Einrichtungshilfe für einen begrenzten Aufenthalt.",
      "value": "Keine Anschaffung oder Mitnahme nötig. Erlöse aus Miete und Verbindung.",
      "tradeoff": "Pro: flexibel.\nKontra: löst nur den Internetzugang; Strom und Aufstellplatz bleiben beim Reisenden, Lieferung, Schäden und Rückgabe beim Vermieter. Mit Community Host [Q18] bietet Starlink Kurzzeitzugang künftig ohne eigenes Gerät.",
      "need": "Bedarf: MBO Partners zählte 2025 in den USA 18,5 Mio. digitale Nomaden, rund 12 % der Erwerbstätigen. [Q17] Wer unterwegs arbeitet, braucht verlässliche Arbeitsplätze und Internet. Die Zahl gilt nur für die USA.\nZukunftsmarkt und Chance: Geprüfte Arbeitsorte mit Starlink-Anschluss vermitteln; alternativ Geräte zeitweise vermieten.",
      "sources": [
        "part3-Q17",
        "part3-Q18"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "C47:C50"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B46"
        }
      }
    },
    {
      "id": "R1",
      "name": "SpaceX Compliance Navigator",
      "trendId": "regulation",
      "selected": true,
      "matrixId": 7,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Ein digitaler Service führt Rideshare-Kunden durch die Genehmigungsschritte. Nach einmaliger Eingabe der Missionsdaten ermittelt er benötigte Genehmigungen, bereitet Antragsentwürfe vor und verfolgt Fristen.",
      "value": "Kunden vermeiden Doppeleingaben und fehlende Unterlagen; SpaceX bereitet Starts verlässlicher vor. Erlös pro Mission oder als Abo.",
      "tradeoff": "Pro: Die Pflichten sind klar dokumentiert und wiederholen sich bei jedem Start [Q02, Q19]; SpaceX kennt sie aus eigener Praxis.\nKontra: Außerhalb der USA gelten andere Verfahren; Fachleute müssen Inhalte aktuell halten und schwierige Fälle prüfen. Die Quellen belegen den Aufwand, nicht die Zahlungsbereitschaft.",
      "need": "Bedarf: Rideshare-Kunden müssen selbst bestätigen, dass sie alle nötigen Nutzlastlizenzen besitzen, und Unterlagen für die FAA-Nutzlastprüfung liefern [Q02]; die FAA prüft u. a. Eigentümer, Gefahrstoffe und Umlaufbahn [Q19]. Dass kleine Kunden dafür keine eigene Abteilung haben, ist eine Annahme.\nZukunftsmarkt und Chance: Unterstützung bei Missionsanträgen oder ein Informationsdienst zu geänderten Anforderungen.",
      "sources": [
        "part3-Q02",
        "part3-Q19"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B55:B58"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B54"
        },
        "selection": {
          "file": "part3",
          "sheet": "Auswahlübersicht",
          "cells": "A14:D14"
        }
      },
      "selectionRationale": "Die referenzierten Nutzlast- und Lizenzunterlagen belegen wiederkehrende Kundenpflichten. Ein digitaler Assistent könnte Unterlagen und Fristen zusammenführen. SpaceX bringt Prozesswissen ein; die Zahlungsbereitschaft für den Assistenten und sein Mehrwert gegenüber Beratung sind offen [Q02, Q19].",
      "editorialNote": "Quellengestützte redaktionelle Präzisierung; ursprüngliche qualitative Auswahl unverändert."
    },
    {
      "id": "R2",
      "name": "SpaceX Regulatory Watch",
      "trendId": "regulation",
      "selected": false,
      "matrixId": null,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Raumfahrtunternehmen abonnieren Hinweise auf neue oder geänderte Anforderungen in ausgewählten Märkten; Fachpartner erläutern, welche Projekttypen betroffen sind.",
      "value": "Unternehmen erkennen Änderungen früher. Erlöse aus einem Informationsabo.",
      "tradeoff": "Pro: geringer Aufwand.\nKontra: informiert nur, die Bearbeitung bleibt beim Kunden; Behördenmeldungen sind meist kostenlos zugänglich [Q19]. Bezahlt würde nur eine verständliche Einordnung der Folgen.",
      "need": "Bedarf: Rideshare-Kunden müssen selbst bestätigen, dass sie alle nötigen Nutzlastlizenzen besitzen, und Unterlagen für die FAA-Nutzlastprüfung liefern [Q02]; die FAA prüft u. a. Eigentümer, Gefahrstoffe und Umlaufbahn [Q19]. Dass kleine Kunden dafür keine eigene Abteilung haben, ist eine Annahme.\nZukunftsmarkt und Chance: Unterstützung bei Missionsanträgen oder ein Informationsdienst zu geänderten Anforderungen.",
      "sources": [
        "part3-Q02",
        "part3-Q19"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "C55:C58"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B54"
        }
      }
    },
    {
      "id": "ID1",
      "name": "SpaceX Launch Engineering Cloud",
      "trendId": "innovation-pressure",
      "selected": true,
      "matrixId": 8,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Satellitenentwickler prüfen ihre Konstruktion online gegen die Anforderungen von Falcon oder Starship: Maße, Masse, Schwerpunkt, Befestigung, Anschlüsse. Später auch Simulation von Lasten und Temperatur.",
      "value": "Entwickler erkennen Probleme früher und übernehmen Daten in die spätere Startvorbereitung. SpaceX verkauft Plattformzugang pro Projekt oder nach Nutzung.",
      "tradeoff": "Pro: Dokumentierte Schnittstellen und Anforderungen eignen sich als Basis einfacher Softwareprüfungen; SpaceX verantwortet die Anforderungen seiner Träger [Q02].\nKontra: Exolaunch bietet bereits persönliche Integrations- und Testbegleitung [Q20]. Die Software muss schnellere oder bessere Rückmeldung beweisen; Exportkontrolle, Haftung und Fahrzeugdatenzugang begrenzen den Ausbau.",
      "need": "Bedarf: Satellitenentwickler müssen gegenüber SpaceX zahlreiche Nachweise liefern, etwa CAD- und Dynamikmodelle, Massendaten, Umwelttestpläne und Sicherheitsdokumente. [Q02] Fehler darin fallen oft erst spät auf. Integrationsdienstleister wie Exolaunch verkaufen dafür heute Begleitung. [Q20]\nZukunftsmarkt und Chance: Technische Prüfungen während der Entwicklung, planbar gebuchte Starts oder betreute Versuche im Orbit.",
      "sources": [
        "part3-Q02",
        "part3-Q20"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B63:B66"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B62"
        },
        "selection": {
          "file": "part3",
          "sheet": "Auswahlübersicht",
          "cells": "A15:D15"
        }
      },
      "selectionRationale": "Dokumentierte technische Nachweise und bestehende Integrationsdienstleistungen belegen eine reale Aufgabe. Die Gruppe schlägt dafür frühere Softwareprüfungen vor; zahlende Nachfrage nach genau dieser Cloud ist noch zu zeigen. Einstieg mit Formal- und Schnittstellenprüfungen, spätere Simulationen als Ausbau [Q02, Q20].",
      "editorialNote": "Quellengestützte redaktionelle Präzisierung; ursprüngliche qualitative Auswahl unverändert."
    },
    {
      "id": "ID2",
      "name": "SpaceX LaunchPass",
      "trendId": "innovation-pressure",
      "selected": false,
      "matrixId": null,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Betreiber von Satellitenserien buchen wiederkehrende Startkontingente mit vereinbarten Umbuchungsmöglichkeiten.",
      "value": "Mehr Planbarkeit, weniger Einzelverhandlungen. SpaceX erhält längerfristige Kapazitätsverträge.",
      "tradeoff": "Pro: Planbarkeit für Serienbetreiber.\nKontra: SpaceX rechnet bei Verspätungen schon heute 100 % der Zahlung auf einen späteren Flug an, mit 5–10 % Umbuchungsgebühr [Q01]; ein Abo bringt wenig zusätzlichen Nutzen und reservierte Plätze sind teuer, wenn Hardware nicht fertig wird.",
      "need": "Bedarf: Satellitenentwickler müssen gegenüber SpaceX zahlreiche Nachweise liefern, etwa CAD- und Dynamikmodelle, Massendaten, Umwelttestpläne und Sicherheitsdokumente. [Q02] Fehler darin fallen oft erst spät auf. Integrationsdienstleister wie Exolaunch verkaufen dafür heute Begleitung. [Q20]\nZukunftsmarkt und Chance: Technische Prüfungen während der Entwicklung, planbar gebuchte Starts oder betreute Versuche im Orbit.",
      "sources": [
        "part3-Q01",
        "part3-Q02",
        "part3-Q20"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "C63:C66"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B62"
        }
      }
    },
    {
      "id": "ID3",
      "name": "SpaceX Orbital Testbed",
      "trendId": "innovation-pressure",
      "selected": false,
      "matrixId": null,
      "status": "Konzeptidee der Projektgruppe; kein angekündigtes SpaceX-Produkt.",
      "offer": "Unternehmen buchen ein Testpaket für Sensoren, Materialien oder Elektronik im Orbit. SpaceX organisiert Einbau, Start, Betrieb, Messdaten und Testbericht. NASA beschreibt Materialforschung unter Weltraumbedingungen auf der ISS. [Q08]",
      "value": "Reale Weltraumtests ohne eigene Testmission. Abgerechnet nach Testumfang, Dauer und Betreuung.",
      "tradeoff": "Pro: echter Mehrwert für Entwickler [Q08].\nKontra: Jeder Versuch braucht passende Technik, Betrieb und Betreuung – deutlich aufwendiger als der Transport einer Nutzlast; Kundenkreis und Preis sind unklar.",
      "need": "Bedarf: Satellitenentwickler müssen gegenüber SpaceX zahlreiche Nachweise liefern, etwa CAD- und Dynamikmodelle, Massendaten, Umwelttestpläne und Sicherheitsdokumente. [Q02] Fehler darin fallen oft erst spät auf. Integrationsdienstleister wie Exolaunch verkaufen dafür heute Begleitung. [Q20]\nZukunftsmarkt und Chance: Technische Prüfungen während der Entwicklung, planbar gebuchte Starts oder betreute Versuche im Orbit.",
      "sources": [
        "part3-Q02",
        "part3-Q08",
        "part3-Q20"
      ],
      "provenance": {
        "comparison": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "D63:D66"
        },
        "need": {
          "file": "part3",
          "sheet": "Ideenvergleich",
          "cells": "B62"
        }
      }
    }
  ],
  "matrix": [
    {
      "id": 1,
      "name": "Starlink Climate Watch",
      "origin": "trend",
      "trendId": "neo-ecology",
      "trend": "Neo-Ökologie",
      "summary": "Zusätzliche Klimasensoren auf Starlink-Satelliten liefern Emissionsdaten als Dienstleistung.",
      "rationale": {
        "team": "Methanmessung ist die Grundlage der Bewertung. Zusätzliche messbare Treibhausgase wären ein weiteres Differenzierungsziel.",
        "ai": "Sensorintegration, Ausrichtung und Kalibrierung bleiben technisch anspruchsvoll. Eine Pilotnutzlast müsste die Eignung nachweisen."
      },
      "businessCaseCandidate": false,
      "sources": [
        "matrix-source-62",
        "matrix-source-63",
        "matrix-source-64"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C20:H20"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I20:L20"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "B3"
        }
      },
      "team": {
        "feasibility": 3,
        "originality": 4,
        "category": "HOW"
      },
      "ai": {
        "feasibility": 3,
        "originality": 4,
        "category": "HOW"
      }
    },
    {
      "id": 2,
      "name": "SpaceX My Mission",
      "origin": "trend",
      "trendId": "individualism",
      "trend": "Individualismus",
      "summary": "Kleine persönliche, schulische oder künstlerische Nutzlasten als buchbare Missionspakete.",
      "rationale": {
        "team": "Vorhandenes Rideshare senkt den technischen Einstieg. Das Team bewertet die Machbarkeit mit 5; Sicherheit und Lizenzpflichten bleiben bestehen.",
        "ai": "Rideshare existiert; Konfigurator und App wären zusätzliche Produktbausteine. Rückführung sollte erst später geprüft werden."
      },
      "businessCaseCandidate": false,
      "sources": [
        "part3-Q01",
        "matrix-source-65",
        "matrix-source-66"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C22:H22"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I22:L22"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "B4"
        }
      },
      "team": {
        "feasibility": 5,
        "originality": 3,
        "category": "NOW"
      },
      "ai": {
        "feasibility": 4,
        "originality": 3,
        "category": "NOW"
      }
    },
    {
      "id": 3,
      "name": "Starlink Edge AI",
      "origin": "trend",
      "trendId": "ai",
      "trend": "KI",
      "summary": "KI-Auswertungen von Sensor- und Maschinendaten gemeinsam mit Konnektivität anbieten.",
      "rationale": {
        "team": "Gut machbar, aber als Bündelung bekannter Bausteine nur mittlere Originalität.",
        "ai": "Netz und Kundenzugang sind geeignete Bausteine; Rechenhardware, Modelle, Datenschutz und Latenz bleiben Entwicklungsaufgaben."
      },
      "businessCaseCandidate": false,
      "sources": [
        "part3-Q24",
        "part3-Q25"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C24:H24"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I24:L24"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "B5"
        }
      },
      "team": {
        "feasibility": 4,
        "originality": 3,
        "category": "NOW"
      },
      "ai": {
        "feasibility": 4,
        "originality": 3,
        "category": "NOW"
      }
    },
    {
      "id": 4,
      "name": "Starlink Insights",
      "origin": "trend",
      "trendId": "data",
      "trend": "Daten als Ressource",
      "summary": "Anonymisierte Terminal- und Netzdaten zu Wetter- und Verfügbarkeitsinformationen verarbeiten.",
      "rationale": {
        "team": "4 Punkte für Machbarkeit und Originalität: Umsetzung prüfen. Kalibrierung, Referenzdaten und Nutzungsrechte sind zu klären.",
        "ai": "Wetter beeinflusst Funkverbindungen; daraus folgt noch kein validiertes Wetterprodukt. Die Aufbereitung großer Datenmengen ist zentral."
      },
      "businessCaseCandidate": true,
      "sources": [
        "matrix-source-67",
        "part3-Q21"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C26:H26"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I26:L26"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "B6"
        }
      },
      "team": {
        "feasibility": 4,
        "originality": 4,
        "category": "WOW"
      },
      "ai": {
        "feasibility": 4,
        "originality": 4,
        "category": "WOW"
      }
    },
    {
      "id": 5,
      "name": "SpaceX Academy",
      "origin": "trend",
      "trendId": "skills",
      "trend": "Fachkräftemangel",
      "summary": "Praxisnahe Aus- und Weiterbildung für den eigenen Nachwuchs und Raumfahrtpartner.",
      "rationale": {
        "team": "Bestehende Akademien senken die Originalität auf 1. Als eigene Talent-Pipeline bleibt die Idee sinnvoll.",
        "ai": "Unternehmens- und Agenturakademien sind etabliert. Inhalte, Betreuung und Exportkontrolle bestimmen den Aufwand."
      },
      "businessCaseCandidate": false,
      "sources": [
        "matrix-source-68",
        "part3-Q26",
        "part3-Q32",
        "matrix-source-69",
        "matrix-source-70"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C28:H28"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I28:L28"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "B7"
        }
      },
      "team": {
        "feasibility": 4,
        "originality": 1,
        "category": "NOW"
      },
      "ai": {
        "feasibility": 4,
        "originality": 2,
        "category": "NOW"
      }
    },
    {
      "id": 6,
      "name": "Starlink Remote Hubs",
      "origin": "trend",
      "trendId": "digital-nomads",
      "trend": "Digital Nomads",
      "summary": "Geprüfte Arbeitsorte, Starlink-Anbindung und Buchung in einem Partnerangebot verbinden.",
      "rationale": {
        "team": "Gut machbar, aber geringe Originalität. Die zugesagte Verbindungsqualität muss vertraglich und betrieblich tragfähig sein.",
        "ai": "Partnerprogramme und Buchungsplattformen sind bekannte Bausteine; schwankende Netzauslastung begrenzt Leistungszusagen."
      },
      "businessCaseCandidate": false,
      "sources": [
        "part3-Q27",
        "matrix-source-71"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C30:H30"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I30:L30"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "B8"
        }
      },
      "team": {
        "feasibility": 4,
        "originality": 2,
        "category": "NOW"
      },
      "ai": {
        "feasibility": 4,
        "originality": 2,
        "category": "NOW"
      }
    },
    {
      "id": 7,
      "name": "SpaceX Compliance Navigator",
      "origin": "trend",
      "trendId": "regulation",
      "trend": "Überregulierung",
      "summary": "Rideshare-Kunden bei Genehmigungen, Nachweisen und Fristen unterstützen.",
      "rationale": {
        "team": "Gut machbar als Service; ergänzt personalisierte Missionen. Menschliche Prüfung schwieriger Fälle bleibt erforderlich.",
        "ai": "Eigene Genehmigungserfahrung hilft, aber unterschiedliche Rechtsräume und Haftung begrenzen die Automatisierung."
      },
      "businessCaseCandidate": false,
      "sources": [
        "part3-Q28",
        "matrix-source-72",
        "part3-Q22"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C32:H32"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I32:L32"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "B9"
        }
      },
      "team": {
        "feasibility": 4,
        "originality": 3,
        "category": "NOW"
      },
      "ai": {
        "feasibility": 4,
        "originality": 3,
        "category": "NOW"
      }
    },
    {
      "id": 8,
      "name": "SpaceX Launch Engineering Cloud",
      "origin": "trend",
      "trendId": "innovation-pressure",
      "trend": "Innovationsdruck",
      "summary": "Satellitenentwürfe früh gegen dokumentierte Schnittstellen und Startanforderungen prüfen.",
      "rationale": {
        "team": "NOW: Integrationschecks gibt es bereits. Das Team bewertet Originalität 3 statt 4; schnelle Softwaretests sollen differenzieren.",
        "ai": "WOW: Kontinuierliche softwaregestützte Prüfungen gegen aktuelle Launch-Anforderungen werden als deutlicher neuer Ansatz bewertet."
      },
      "businessCaseCandidate": true,
      "sources": [
        "matrix-source-73",
        "part3-Q01",
        "matrix-source-74"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C34:H34"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I34:L34"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "B10"
        }
      },
      "team": {
        "feasibility": 4,
        "originality": 3,
        "category": "NOW"
      },
      "ai": {
        "feasibility": 4,
        "originality": 4,
        "category": "WOW"
      }
    },
    {
      "id": 9,
      "name": "Rocket-Light-Dinner",
      "origin": "open-innovation",
      "trendId": null,
      "trend": "Open Innovation",
      "summary": "Ein kuratiertes Dinner mit Blick auf einen Raketenstart und eigener Erlebnisdramaturgie.",
      "rationale": {
        "team": "WOW mit 5/5 als subjektive Vorauswahl. Die Differenzierung liegt in Gastronomie, Inszenierung und Service; Sichtachse, Distanz und Ersatzablauf müssen geprüft werden.",
        "ai": "WOW mit 4/4. Ein Event mit Gastro-Partner ist grundsätzlich testbar; Startverschiebungen, Standort und Sicherheitsfreigaben bleiben wesentliche Bedingungen."
      },
      "businessCaseCandidate": true,
      "sources": [
        "matrix-source-75",
        "matrix-source-76",
        "matrix-source-77",
        "verified-ksc-viewing"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C36:H36"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I36:L36"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "B11"
        }
      },
      "team": {
        "feasibility": 5,
        "originality": 5,
        "category": "WOW"
      },
      "ai": {
        "feasibility": 4,
        "originality": 4,
        "category": "WOW"
      }
    },
    {
      "id": 10,
      "name": "SpaceX Luxury Club",
      "origin": "open-innovation",
      "trendId": null,
      "trend": "Open Innovation",
      "summary": "Eine Mitgliedschaft mit Community, Events, Vorteilen und rechtlich geprüften Verlosungen.",
      "rationale": {
        "team": "5 Punkte Machbarkeit, 2 Originalität. Auf vorzeitige sensible Innovationsinformationen kann verzichtet werden.",
        "ai": "Mitgliedschafts- und Eventmodelle sind etabliert. Ein Vergleichsbeispiel ist die Planetary Society; das belegt keinen bestehenden offiziellen SpaceX-Club."
      },
      "businessCaseCandidate": false,
      "sources": [
        "matrix-source-78",
        "part3-Q21",
        "verified-planetary-membership"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C38:H38"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I38:L38"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "C11"
        }
      },
      "team": {
        "feasibility": 5,
        "originality": 2,
        "category": "NOW"
      },
      "ai": {
        "feasibility": 4,
        "originality": 2,
        "category": "NOW"
      }
    },
    {
      "id": 11,
      "name": "Dyson Sphere",
      "origin": "open-innovation",
      "trendId": null,
      "trend": "Open Innovation",
      "summary": "Ein langfristiges Gedankenexperiment zur großmaßstäblichen Nutzung von Sternenenergie.",
      "rationale": {
        "team": "HOW mit 1/4. Die Idee liegt außerhalb eines kurzfristig umsetzbaren Unternehmensprojekts; Wertung der Gruppe.",
        "ai": "Dysons Originalpublikation von 1960 beschreibt einen Suchansatz für künstliche Infrarotquellen, keine heute verfügbare Konstruktion."
      },
      "businessCaseCandidate": false,
      "sources": [
        "part3-Q24",
        "part3-Q30",
        "verified-dyson-1960"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C40:H40"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I40:L40"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "D11"
        }
      },
      "team": {
        "feasibility": 1,
        "originality": 4,
        "category": "HOW"
      },
      "ai": {
        "feasibility": 1,
        "originality": 4,
        "category": "HOW"
      }
    },
    {
      "id": 12,
      "name": "Satellitenschubser",
      "origin": "open-innovation",
      "trendId": null,
      "trend": "Open Innovation",
      "summary": "Robotische Satelliten sollen ausgediente Objekte zu einer kontrollierten Entsorgung bewegen.",
      "rationale": {
        "team": "3/3: Unter beiden Schwellen. Bestehende Ansätze zur aktiven Trümmerentfernung begrenzen die Originalität.",
        "ai": "Annäherung und Einfang wurden teilweise demonstriert; unkontrollierte Objekte, Haftung und ein tragfähiger Zahler bleiben offene Fragen."
      },
      "businessCaseCandidate": false,
      "sources": [
        "matrix-source-79",
        "matrix-source-80",
        "matrix-source-81",
        "matrix-source-82",
        "matrix-source-83",
        "matrix-source-84"
      ],
      "provenance": {
        "scores": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "C42:H42"
        },
        "rationale": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "I42:L42"
        },
        "origin": {
          "file": "part3",
          "sheet": "Geschäftsideen",
          "cells": "E11"
        }
      },
      "team": {
        "feasibility": 3,
        "originality": 3,
        "category": "VERWERFEN"
      },
      "ai": {
        "feasibility": 3,
        "originality": 3,
        "category": "VERWERFEN"
      }
    }
  ],
  "sources": [
    {
      "id": "part2-Q01",
      "label": "Q01",
      "title": "NASA, SpaceX Advance Wind Tunnel Tests for Starship Rocket",
      "publisher": "NASA · HLS/Ames",
      "url": "https://www.nasa.gov/directorates/esdmd/artemis-campaign-development-division/human-landing-system-program/nasa-spacex-advance-wind-tunnel-tests-for-starship-rocket/",
      "published": "2026-07-31 00:00:00",
      "scope": "V3-Konfiguration; Raptor 3; Wiedereintrittstests. Tests Ende 2025, Veröffentlichung 2026.",
      "limitations": "Primärquelle / Projektpartner; keine unabhängige Leistungszertifizierung.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A6:H6"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q02",
      "label": "Q02",
      "title": "In-Space Cryogenic Propellant Transfer: Modeling and Validation of Two-Phase Flow Dynamics in Low-Gravity",
      "publisher": "NASA NTRS · NASA/SpaceX",
      "url": "https://ntrs.nasa.gov/citations/20250003325",
      "published": "2025-05-13 00:00:00",
      "scope": "Messdaten zum internen LOX-Transfer 2024; mehrere Tonnen; kontrollierte geringe Beschleunigung.",
      "limitations": "Konferenzbeitrag 13.–15.05.2025; Abstract und Metadaten geprüft. Zugehöriger PDF-Download nicht als Beleg verwendet.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A7:H7"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q03",
      "label": "Q03",
      "title": "Guidelines for In-Space Cryogenic Propellant Transfer (ISCPT)",
      "publisher": "NASA NTRS",
      "url": "https://ntrs.nasa.gov/citations/20250004625",
      "published": "2025-07-22 00:00:00",
      "scope": "Technische Einordnung kryogener Kopplungen und Fluidführung; SpaceX und Blue Origin als Anwender.",
      "limitations": "Konferenz 22.–24.07.2025; Abstract geprüft. Kein Beleg eines abgeschlossenen SpaceX-Fahrzeug-zu-Fahrzeug-Transfers.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A8:H8"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q04",
      "label": "Q04",
      "title": "Space Exploration Technologies Corp., Form S-1 (Registration Statement)",
      "publisher": "SpaceX · SEC EDGAR",
      "url": "https://www.sec.gov/Archives/edgar/data/1181412/000162828026036936/spaceexplorationtechnologi.htm",
      "published": "2026-05-20 00:00:00",
      "scope": "Starlink: Satelliten-, Abonnenten- und Leistungsangaben (Stand 31.03.2026); Segmentumsatz 2025; V3- und Mobile-Pläne; Risikofaktoren.",
      "limitations": "Regulatorisches Pflichtdokument mit geprüftem Jahresabschluss, aber Unternehmensdarstellung mit Eigeninteresse. Abonnenten, Latenz und Datenrate sind ungeprüfte Unternehmensangaben; Zukunftsaussagen sind Erwartungen. Erstfassung vom 20.05.2026; spätere Änderungen (S-1/A) nicht ausgewertet.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A9:H9"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q05",
      "label": "Q05",
      "title": "FCC Approves Next-Gen Satellite Constellation – Enabling Better, Faster Broadband throughout America (DOC-417881A1)",
      "publisher": "FCC (US-Regulierungsbehörde)",
      "url": "https://docs.fcc.gov/public/attachments/DOC-417881A1.pdf",
      "published": "2026-01-09 00:00:00",
      "scope": "Genehmigung weiterer 7.500 Gen2-Satelliten (insgesamt 15.000); Frequenzbänder; neue Bahnhöhen 340–485 km; Direktanbindung an Mobilgeräte außerhalb der USA.",
      "limitations": "Behördliches Primärdokument, aber Pressemitteilung und nicht der vollständige Genehmigungsbeschluss. Belegt die Genehmigung, nicht die Umsetzung; Auflagen und Einsprüche Dritter sind nicht enthalten.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A10:H10"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q06",
      "label": "Q06",
      "title": "NASA Artemis Mission Progresses with SpaceX Starship Test Flight",
      "publisher": "NASA · HLS",
      "url": "https://www.nasa.gov/directorates/esdmd/artemis-campaign-development-division/human-landing-system-program/nasa-artemis-mission-progresses-with-spacex-starship-test-flight/",
      "published": "2024-03-14 00:00:00",
      "scope": "Dritter Starship-Test und NASA-Tipping-Point-Förderung des Transferexperiments.",
      "limitations": "Zeitgenössischer Testbericht; abschließender Transfernachweis aus Q02. Keine aktuelle Terminquelle.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A11:H11"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q07",
      "label": "Q07",
      "title": "Mohan et al., A Multifaceted Look at Starlink Performance (WWW ’24: Proceedings of the ACM Web Conference 2024, S. 2723–2734)",
      "publisher": "Univ. Edinburgh u. a. · ACM",
      "url": "https://www.research.ed.ac.uk/en/publications/a-multifaceted-look-at-starlink-performance/",
      "published": "2024-05-13 00:00:00",
      "scope": "Unabhängige Messungen: 19,2 Mio. M-Lab-Tests aus 34 Ländern; Zoom und Cloud-Gaming im Vergleich zu 5G und Glasfaser; 15-Sekunden-Umkonfigurationen der Satellitenverbindung.",
      "limitations": "Begutachtete Konferenzpublikation. Messdaten ab 2021 bei damals rund 4.000 Satelliten, nicht der heutige Netzstand. Abstract und Metadaten geprüft, Volltext nicht ausgewertet.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A12:H12"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q08",
      "label": "Q08",
      "title": "IG-26-004 · NASA’s Management of the Human Landing System Contracts",
      "publisher": "NASA Office of Inspector General",
      "url": "https://oig.nasa.gov/wp-content/uploads/2026/03/final-report-ig-26-004-nasas-management-of-the-human-landing-system-contracts.pdf",
      "published": "2026-03-10 00:00:00",
      "scope": "S. 6: Boosterfang; S. 13: Transfer-/Taktungsrisiken; Verträge und Sicherheitsfragen.",
      "limitations": "50-seitiger PDF-Bericht; relevante Passagen und Abbildung visuell geprüft. Missionsnummerierung teilweise alt (Artemis); nur für Boosterfang sowie Transfer- und Taktungsrisiken verwendet.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A13:H13"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q09",
      "label": "Q09",
      "title": "NASA Awards SpaceX Three Crew Flights to Space Station",
      "publisher": "NASA · Commercial Crew",
      "url": "https://www.nasa.gov/missions/station/commercial-crew/nasa-awards-spacex-three-crew-flights-to-space-station/",
      "published": "2026-09-18 00:00:00",
      "scope": "Falcon 9 bleibt Teil des aktiven Portfolios; zusätzliche Crew-Flüge beauftragt.",
      "limitations": "Aktueller Portfolioabgleich; Dragon selbst nicht als Raketeninnovation bewertet.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A14:H14"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q10",
      "label": "Q10",
      "title": "NASA Awards Launch Services Contract for Dragonfly Mission",
      "publisher": "NASA · Launch Services",
      "url": "https://www.nasa.gov/news-release/nasa-awards-launch-services-contract-for-dragonfly-mission/",
      "published": "2024-11-25 00:00:00",
      "scope": "Falcon Heavy als beauftragter Träger der Dragonfly-Mission; Portfolio-Referenz.",
      "limitations": "Auftragsnachweis, kein Beleg für einen bereits erfolgten Dragonfly-Start.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A15:H15"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q11",
      "label": "Q11",
      "title": "Starship · offizielle Produktseite",
      "publisher": "SpaceX",
      "url": "https://www.spacex.com/vehicles/starship",
      "published": null,
      "scope": "Hersteller-Einstieg für das Starship-Programm; Zusatzlink, keine alleinige Faktenbasis.",
      "limitations": "Eingeschränkt: beim Direktabruf HTML, aber kein auswertbarer Seiteninhalt. Q01/Q08 als lesbare Fachbelege.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A16:H16"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q12",
      "label": "Q12",
      "title": "Starship Flight 13 · Missionsseite",
      "publisher": "SpaceX",
      "url": "https://www.spacex.com/launches/starship-flight-13",
      "published": "2026-07-24 00:00:00",
      "scope": "Aktualitätsabgleich des V3-Flugtestprogramms; Missionsdatum über Suchindex.",
      "limitations": "Eingeschränkt: offizieller Suchindex nennt 24.07.2026; Direktabruf ohne Text. Keine Detail-Leistungswerte übernommen.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A17:H17"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q13",
      "label": "Q13",
      "title": "Starship Flight 14 · Missionsseite",
      "publisher": "SpaceX",
      "url": "https://www.spacex.com/launches/starship-flight-14",
      "published": null,
      "scope": "Geplanter nächster Flug; nicht als abgeschlossene Demonstration gewertet.",
      "limitations": "Eingeschränkt: Suchindex nennt 28.09.2026 als Ziel, nach dem Stichtag. Direktabruf ohne Text; Termin veränderlich.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A18:H18"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q14",
      "label": "Q14",
      "title": "Borlaff et al., Satellite megaconstellations will threaten space-based astronomy (Nature 648, 51–57; online 3. Dezember 2025)",
      "publisher": "Nature (Springer Nature)",
      "url": "https://www.nature.com/articles/s41586-025-09759-5",
      "published": "2025-12-03 00:00:00",
      "scope": "Prognose der Satellitenspuren in Hubble und weiteren Weltraumteleskopen bei Vollausbau der geplanten Konstellationen.",
      "limitations": "Begutachtet. Betrifft alle geplanten Konstellationen, nicht nur Starlink; Prognose hängt von Annahmen zu Konstellationsgröße und Helligkeit ab.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A19:H19"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q15",
      "label": "Q15",
      "title": "Barker, Marais & McDowell, Global 3D rocket launch and re-entry air pollutant and CO2 emissions at the onset of the megaconstellation era (Sci. Data 11, 1079)",
      "publisher": "Scientific Data (Nature Portfolio)",
      "url": "https://www.nature.com/articles/s41597-024-03910-z.pdf",
      "published": "2024-10-03 00:00:00",
      "scope": "Emissionsinventar 2020–2022; Anteil der Megakonstellations-Missionen an Ruß-, CO- und CO₂-Emissionen von Starts und Wiedereintritten (37–41 % bis 2022).",
      "limitations": "Begutachteter Datensatzartikel, frei zugänglich. Zeitraum 2020–2022 (frühe Starlink-Phase); Emissionsinventar, keine Klimabewertung. Die Folgestudie in Earth’s Future (2026) war nicht direkt abrufbar und wurde nicht verwendet.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A20:H20"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q16",
      "label": "Q16",
      "title": "ESA Space Environment Report 2026",
      "publisher": "ESA · Space Debris Office",
      "url": "https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2026",
      "published": "2026-09-08 00:00:00",
      "scope": "Zustand der Erdumlaufbahn: Konstellationen, Entsorgung am Lebensende, Kollisionsrisiko, Wiedereintritte (Datenstand Ende 2025).",
      "limitations": "Offizieller Behördenbericht (Ausgabedatum 08.09.2026). Aussagen zu Konstellationen allgemein; Starlink wird auf der geprüften Zusammenfassungsseite nicht gesondert ausgewiesen. PDF-Volltext nicht ausgewertet.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A21:H21"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q17",
      "label": "Q17",
      "title": "Kang et al., Cost Effectiveness of Reusable Launch Vehicles Depending on the Payload Capacity (Aerospace 2025, 12(5), 364)",
      "publisher": "MDPI · Aerospace (Kang et al.)",
      "url": "https://www.mdpi.com/2226-4310/12/5/364",
      "published": "2025-04-22 00:00:00",
      "scope": "Eigene Bewertung Starship / Super Heavy V3 (Prüfstand, Spalte C): Kosteneffizienz wiederverwendbarer Trägerraketen in Abhängigkeit von der Nutzlast.",
      "limitations": "Begutachteter Open-Access-Zeitschriftenartikel (Online-Veröffentlichung 22.04.2025). Titel und Metadaten über Suchtreffer geprüft, Volltext nicht ausgewertet. Allgemeine Kostenanalyse für Trägerraketen, nicht Starship-spezifisch.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A22:H22"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q18",
      "label": "Q18",
      "title": "Soviets Refuel in Space for a Risky First (Zeitungsartikel, 3. Februar 1978)",
      "publisher": "The Washington Post (Archiv)",
      "url": "https://www.washingtonpost.com/archive/politics/1978/02/03/soviets-refuel-in-space-for-a-risky-first/295118b4-da76-4fc7-95ee-e2af691e6b46/",
      "published": "1978-02-03 00:00:00",
      "scope": "Eigene Bewertung Orbitale Betankung: Tanker & Depot (Prüfstand, Spalte E): historischer Vorläufer der Betankung im Weltraum.",
      "limitations": "Zeitgenössischer Pressebericht, Sekundärquelle. Seite nicht direkt abrufbar; Titel und Datum aus der Webadresse abgeleitet, Inhalt nicht geprüft. Belegt den Präzedenzfall, nicht die heutige SpaceX-Technik.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A23:H23"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q19",
      "label": "Q19",
      "title": "Wu, Methane vs. Kerosene as Rocket Fuels (Kursarbeit PH240, Stanford University, Herbst 2023)",
      "publisher": "Stanford University · PH240 (B. Wu)",
      "url": "http://large.stanford.edu/courses/2023/ph240/wu1/",
      "published": "2023-11-28 00:00:00",
      "scope": "Eigene Bewertung Raptor 3 – Antriebsintegration (Prüfstand, Spalte G): Vergleich der Treibstoffe Methan und Kerosin (Verbrennung, Herstellung, Umweltwirkung).",
      "limitations": "Studentische Kursarbeit, nicht begutachtet. Allgemeine Betrachtung von Methan und Kerosin; Raptor wird nicht gesondert untersucht. Nur als Hintergrundquelle verwenden.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A24:H24"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q20",
      "label": "Q20",
      "title": "Conceptual Design and Performance Analysis of a SpaceX Raptor Rocket Engine",
      "publisher": "ResearchGate (Verfasser nicht geprüft)",
      "url": "https://www.researchgate.net/publication/401241070_Conceptual_Design_and_Performance_Analysis_of_a_SpaceX_Raptor_Rocket_Engine",
      "published": null,
      "scope": "Eigene Bewertung Raptor 3 – Antriebsintegration (Prüfstand, Spalte G): konzeptionelle Auslegung und Leistungsanalyse eines Raptor-Triebwerks.",
      "limitations": "Eingeschränkt: Seite nicht direkt abgerufen. Titel aus der Webadresse abgeleitet; Verfasser, Begutachtungsstatus, Datum und Inhalt nicht geprüft. Berechnung auf Basis öffentlicher Daten, keine Herstellerangabe.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A25:H25"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q21",
      "label": "Q21",
      "title": "20 Years of SLS and Constellation, 50 Years of the Same RS-25 Engine and Each One Costs $145 Million",
      "publisher": "NextBigFuture",
      "url": "https://www.nextbigfuture.com/2026/02/20-years-of-sls-and-constellation-50-years-of-the-same-rs25-engine-and-each-one-costs-145-million.html",
      "published": null,
      "scope": "Eigene Bewertung Raptor 3 – Antriebsintegration (Prüfstand, Spalte G): Kostenvergleichswert RS-25 (SLS) als Referenz für den Raptor.",
      "limitations": "Eingeschränkt: Blog bzw. Nachrichtenseite, keine Primärquelle und nicht begutachtet. Titel aus der Webadresse abgeleitet (Februar 2026); Inhalt und Zahlen nicht geprüft. Kostenangaben nur als Indiz verwenden und mit NASA-Quellen gegenprüfen.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A26:H26"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q22",
      "label": "Q22",
      "title": "Bridging the digital divide in rural Thailand: Understanding potential factors influencing Starlink's satellite internet adoption",
      "publisher": "Elsevier · ScienceDirect",
      "url": "https://www.sciencedirect.com/science/article/pii/S2590291125000828",
      "published": null,
      "scope": "Eigene Bewertung Starlink (Prüfstand, Spalte I): gesellschaftlicher Nutzen, ländliche Konnektivität und Nutzung von Starlink.",
      "limitations": "Zeitschriftenartikel; Zusammenfassung über Suchtreffer geprüft, Volltext nicht ausgewertet. Fallstudie Thailand mit Online-Befragung (806 Teilnehmende), nicht auf andere Märkte übertragbar. Veröffentlichungsdatum nicht belastbar ermittelt.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A27:H27"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q23",
      "label": "Q23",
      "title": "Ogutu & Oughton, A Techno-Economic Cost Framework for Satellite Networks Applied to Low Earth Orbit Constellations: Assessing Starlink, OneWeb and Kuiper (arXiv:2108.10834)",
      "publisher": "arXiv (Ogutu & Oughton)",
      "url": "https://arxiv.org/pdf/2108.10834",
      "published": "2021-08-24 00:00:00",
      "scope": "Eigene Bewertung Starlink (Prüfstand, Spalte I): Kosten- und Kapazitätsmodell für LEO-Konstellationen (wirtschaftlicher Nutzen).",
      "limitations": "Preprint (24.08.2021, zur Einreichung bei IEEE Access), nicht begutachtet. Modellrechnung für 2020–2025 mit eigenen Annahmen; Ergebnisse hängen von Nutzerdichte und Kostenparametern ab. Abstract und Metadaten geprüft, Volltext nicht ausgewertet.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A28:H28"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part2-Q24",
      "label": "Q24",
      "title": "Starlink Satellite Constellation (Satellite Missions Catalogue)",
      "publisher": "eoPortal",
      "url": "https://www.eoportal.org/satellite-missions/starlink#spacecraft-parameters",
      "published": "2026-05-06 00:00:00",
      "scope": "Eigene Bewertung Starlink (Prüfstand, Spalte I): Satellitengenerationen, Konstellationsstand und Starts.",
      "limitations": "Sekundärer Katalog, aus Hersteller- und Pressematerial zusammengestellt, keine Primärquelle. Datum = Aktualisierungsstand der Katalogseite (06.05.2026); Seite wird laufend ergänzt. Zahlenangaben mit SpaceX- und FCC-Quellen gegenprüfen.",
      "provenance": {
        "file": "part2",
        "sheet": "Quellen",
        "cells": "A29:H29"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q01",
      "label": "Q01",
      "title": "SpaceX (2026): Smallsat Rideshare Program. Website.",
      "publisher": "SpaceX",
      "url": "https://www.spacex.com/rideshare/",
      "scope": "Belegt: Rideshare-Platten mit 50, 100, 200 und 300 kg inklusive; SSO-Missionen etwa alle vier Monate; bei Verspätung der Nutzlast werden 100 % der Zahlung auf einen späteren Flug angerechnet, abzüglich 5–10 % Umbuchungsgebühr.\nGrenze: nennt keine Preise; Angebot für Satellitenbetreiber, nicht für Privatpersonen.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A5:D5"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q02",
      "label": "Q02",
      "title": "SpaceX (2026): Rideshare Payload User's Guide, Version 11, August 2026. PDF (verlinkt auf spacex.com/rideshare).",
      "publisher": "SpaceX",
      "url": "https://storage.googleapis.com/rideshare-static/Rideshare_Payload_Users_Guide.pdf",
      "scope": "Belegt: Kundenpflichten in Anhang G, Tabelle G-3 (u. a. CAD- und Dynamikmodell, Massendaten, Umwelttestplan, Sicherheitsdokumente, FAA-Vorlage, Cross-Waiver); Anhang F: Kunde bestätigt schriftlich, alle Nutzlastlizenzen zu besitzen.\nGrenze: gilt für Falcon-9-Rideshare, nicht für Starship.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A6:D6"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q03",
      "label": "Q03",
      "title": "NASA (Website, Stand 2026): State-of-the-Art of Small Spacecraft Technology, Kap. 10 „Integration, Launch, Deployment, and Orbital Transport“.",
      "publisher": "NASA",
      "url": "https://www.nasa.gov/smallsat-institute/sst-soa/integration-launch-and-deployment/",
      "scope": "Belegt: Überblick über Rideshare-Anbieter; SpaceX Transporter „starting at $350k for ~50 kg“.\nGrenze: Richtwert der NASA, kein offizielles SpaceX-Preisblatt.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A7:D7"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q04",
      "label": "Q04",
      "title": "GHGSat (2026): About Us. Website.",
      "publisher": "GHGSat",
      "url": "https://www.ghgsat.com/about-us/",
      "scope": "Belegt: kommerzieller Anbieter für Methanmessung auf Anlagenebene, Nachweis ab 100 kg/h bei ca. 25 m Auflösung; Kunden sind Betreiber, Behörden und Finanzwirtschaft.\nGrenze: Unternehmensangaben, keine unabhängige Prüfung.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A8:D8"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q05",
      "label": "Q05",
      "title": "IEA (2026): Global Methane Tracker 2026 – Key findings.",
      "publisher": "IEA",
      "url": "https://www.iea.org/reports/global-methane-tracker-2026/key-findings",
      "scope": "Belegt: über 35 Mt Methan ohne Nettokosten vermeidbar (Energiepreise 2025); EU verlangt ab 2030 für importiertes Öl, Gas und Kohle einen Methanintensitäts-Grenzwert; Datenverfügbarkeit zwischen Ländern „sehr uneinheitlich“; GHGSat und Tanager-1 als Punktquellen-Satelliten genannt.\nGrenze: kein Wert zur Nachfrage nach Messdiensten.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A9:D9"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q06",
      "label": "Q06",
      "title": "Europäische Union (2024): Verordnung (EU) 2024/1787 zur Verringerung der Methanemissionen im Energiesektor. EUR-Lex.",
      "publisher": "Europäische Union",
      "url": "https://eur-lex.europa.eu/eli/reg/2024/1787/oj",
      "scope": "Belegt: Pflichten zu Messung, Quantifizierung, Berichterstattung und unabhängiger Verifizierung für Betreiber und Importeure (Art. 1, Importeure Art. 28–29).\nGrenze: nur EU; Teile der Importpflichten sollen verschoben werden (siehe Q07).",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A10:D10"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q07",
      "label": "Q07",
      "title": "Europäische Kommission (2026): Vorschlag COM(2026) 569 zur Änderung der Verordnung (EU) 2024/1787 (Verschiebung bestimmter Pflichten), 14.10.2026. EUR-Lex.",
      "publisher": "Europäische Kommission",
      "url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52026PC0569",
      "scope": "Belegt: Vorschlag, Berichts- und Methanintensitätspflichten für Importeure und EU-Produzenten (Art. 28–29) um ein Jahr zu verschieben.\nGrenze: Stand 04.11.2026 nur Vorschlag, nicht beschlossen.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A11:D11"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q08",
      "label": "Q08",
      "title": "NASA (2025): A Researcher's Guide to Microgravity Materials Research. ISS Researcher's Guide Series.",
      "publisher": "NASA",
      "url": "https://www.nasa.gov/science-research/for-researchers/a-researchers-guide-to-microgravity-materials-research/",
      "scope": "Belegt: Materialforschung unter Schwerelosigkeit auf der ISS und verfügbare Einrichtungen.\nGrenze: staatliche ISS-Forschung, kein kommerzielles Testangebot.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A12:D12"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q09",
      "label": "Q09",
      "title": "NASA NTRS (2024): Artificial Intelligence Medical Support for Long-Duration Space Missions. Dokument 20240000754.",
      "publisher": "NASA NTRS",
      "url": "https://ntrs.nasa.gov/citations/20240000754",
      "scope": "Belegt: Forschungskonzept für KI-gestützte medizinische Unterstützung der Crew auf langen Missionen.\nGrenze: Konzept, kein Produkt; Kunde wäre NASA.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A13:D13"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q10",
      "label": "Q10",
      "title": "NASA Johnson Space Center (o. J.): Software & Autonomous Subsystems. Website.",
      "publisher": "NASA Johnson Space Center",
      "url": "https://www.nasa.gov/reference/jsc-software-autonomous-subsystems/",
      "scope": "Belegt: NASA untersucht KI u. a. für Crew-Training, Verfahrensführung und Anomalieerkennung.\nGrenze: interne NASA-Fähigkeiten, kein Hinweis auf Marktnachfrage.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A14:D14"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q11",
      "label": "Q11",
      "title": "Starlink (2026): Starlink Business – Fixed Site. Website.",
      "publisher": "Starlink",
      "url": "https://www.starlink.com/business/fixed-site",
      "scope": "Belegt: Starlink bewirbt Landwirtschaft („Gather and analyze IoT data in real time“) und Energie (Datenanalyse an entlegenen Standorten) als Einsatzfelder.\nGrenze: Marketingtext; Starlink liefert die Verbindung, keine Auswertung.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A15:D15"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q12",
      "label": "Q12",
      "title": "Starlink (2026): Starlink Business – Case Study John Deere. Website.",
      "publisher": "Starlink",
      "url": "https://www.starlink.com/business/case-studies/john-deere",
      "scope": "Belegt: Starlink-Terminals auf Landmaschinen (JDLink Boost) für Datenaustausch, Ferndiagnose und automatisierte Funktionen.\nGrenze: Einzelfall eines Partners; die Auswertung liegt bei John Deere.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A16:D16"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q13",
      "label": "Q13",
      "title": "Ullah, M. A. et al. (2025): Impact of Weather on Satellite Communication: Evaluating Starlink Resilience. arXiv:2505.04772, angenommen für IEEE VTC2025-Spring.",
      "publisher": "Ullah, M. A. et al.",
      "url": "https://arxiv.org/abs/2505.04772",
      "scope": "Belegt: In Oulu (Finnland) senkte Regen den Median-Durchsatz um 37,84 % (Download) und 52,27 % (Upload); kein spürbarer Effekt auf die Laufzeit; stärkere Bewölkung senkt den Durchsatz.\nGrenze: ein Standort, ein Terminaltyp (Flat High Performance).",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A17:D17"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q14",
      "label": "Q14",
      "title": "Laniewski, D. et al. (2024): WetLinks: a Large-Scale Longitudinal Starlink Dataset with Contiguous Weather Data. arXiv:2402.16448, TMA 2024.",
      "publisher": "Laniewski, D. et al.",
      "url": "https://arxiv.org/abs/2402.16448",
      "scope": "Belegt: ca. 140.000 Messungen über sechs Monate in Osnabrück und Enschede mit Wetterstationen neben den Terminals. Regen senkt den Download signifikant, aber mit schwacher Korrelation (R = −0,21), weil andere Faktoren Einzelwerte stark beeinflussen; Upload ohne signifikanten Effekt.\nGrenze: zwei europäische Standorte.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A18:D18"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q15",
      "label": "Q15",
      "title": "UK Space Agency (2023): Space Sector Skills Survey 2023 – Report. GOV.UK.",
      "publisher": "UK Space Agency",
      "url": "https://www.gov.uk/government/publications/space-sector-skills-survey-2023/space-sector-skills-survey-2023-report",
      "scope": "Belegt: 218 Organisationen befragt; 52 % melden Qualifikationslücken in der aktuellen Belegschaft; davon 72 % bei Software- und Datenkompetenzen.\nGrenze: britischer Sektor, keine Daten zu SpaceX oder dessen Zulieferern.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A19:D19"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q16",
      "label": "Q16",
      "title": "ESA Education (o. J.): About the Training and Learning Facility. Website.",
      "publisher": "ESA Education",
      "url": "https://education.esa.int/about_the_training_and_learning_facility/",
      "scope": "Belegt: ESA Academy bietet Studierenden 4- bis 5-tägige Trainings, bis zu 25 Sessions pro Jahr, von ESA gesponsert.\nGrenze: Zielgruppe Studierende; kein Beleg für Nachfrage nach Kursen für Berufstätige.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A20:D20"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q17",
      "label": "Q17",
      "title": "MBO Partners (2025): 2025 Digital Nomads Trends Report. Website.",
      "publisher": "MBO Partners",
      "url": "https://www.mbopartners.com/state-of-independence/digital-nomads",
      "scope": "Belegt: 18,5 Mio. US-Beschäftigte sind digitale Nomaden, rund 12 % der US-Erwerbstätigen, +153 % seit 2019.\nGrenze: nur USA; Schätzung eines Personaldienstleisters.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A21:D21"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q18",
      "label": "Q18",
      "title": "Starlink (2026): Community Host. Website.",
      "publisher": "Starlink",
      "url": "https://www.starlink.com/community-host",
      "scope": "Belegt: Gastgeber (Grundstücks- und Geschäftsinhaber) versorgen Nachbarn aus einem Starlink-Kit; Nutzer kaufen Stunden-, Tages-, Wochen- oder Monatspässe; Starlink übernimmt Zahlung und Zugang; Geschwindigkeiten nicht garantiert.\nGrenze: Start regional, Anmeldung zur Benachrichtigung; keine Preise.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A22:D22"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q19",
      "label": "Q19",
      "title": "FAA (2026): Payload Reviews. Website.",
      "publisher": "FAA",
      "url": "https://www.faa.gov/space/licenses/payload_reviews",
      "scope": "Belegt: FAA prüft nach 14 CFR § 450.43, ob der Nutzlastbetreiber alle Lizenzen besitzt; anzugeben sind u. a. Eigentümer, Gefahrstoffe, Explosionspotenzial und Umlaufbahn.\nGrenze: nur USA.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A23:D23"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q20",
      "label": "Q20",
      "title": "Exolaunch (2026): Integration Services. Website.",
      "publisher": "Exolaunch",
      "url": "https://exolaunch.com/integration_services.html",
      "scope": "Belegt: Dienstleister übernehmen Anpassung an die Trägerrakete, Umwelttests und Integration für Kleinsatelliten.\nGrenze: Unternehmensangaben; zeigt Wettbewerb, nicht die Nachfrage nach einer Software.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A24:D24"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q21",
      "label": "Q21",
      "title": "SpaceX / SEC (2026): Space Exploration Technologies Corp., Form S-1/A, 03.06.2026. SEC EDGAR.",
      "publisher": "SpaceX / SEC",
      "url": "https://www.sec.gov/Archives/edgar/data/1181412/000162828026040364/spaceexplorationtechnologib.htm",
      "scope": "Verwendet für: Regulierung, Personal, Daten, Wiederverwendung, Launch-Kadenz, Innovation, KI (Trendbewertung, Spalte KI).\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A25:D25"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q22",
      "label": "Q22",
      "title": "FAA (o. J.): SpaceX Starship – Environmental Review. Website.",
      "publisher": "FAA",
      "url": "https://www.faa.gov/space/stakeholder_engagement/spacex_starship/environmental_review",
      "scope": "Verwendet für: Umweltprüfungen und Umweltauflagen bei Starship/Launchstandorten.\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A26:D26"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q23",
      "label": "Q23",
      "title": "SpaceX (o. J.): Smallsat Rideshare Program. Website (new.spacex.com).",
      "publisher": "SpaceX",
      "url": "https://new.spacex.com/rideshare",
      "scope": "Verwendet für: flexible, individualisierte Launch-Optionen und Buchung. Inhaltlich vgl. Q01 (andere URL).\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A27:D27"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q24",
      "label": "Q24",
      "title": "SpaceX (o. J.): SpaceX AI – Starmind. Website.",
      "publisher": "SpaceX",
      "url": "https://new.spacex.com/spacexai/starmind",
      "scope": "Verwendet für: orbitales KI-Compute und Abhängigkeit von Starship.\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A28:D28"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q25",
      "label": "Q25",
      "title": "SpaceX (o. J.): Updates. Website.",
      "publisher": "SpaceX",
      "url": "https://new.spacex.com/updates",
      "scope": "Verwendet für: xAI-Integration, Terafab, Starship V3, beschleunigte Innovation.\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A29:D29"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q26",
      "label": "Q26",
      "title": "U.S. Bureau of Labor Statistics (o. J.): Occupational Outlook Handbook – Aerospace Engineers. Website.",
      "publisher": "U.S. Bureau of Labor Statistics",
      "url": "https://www.bls.gov/ooh/architecture-and-engineering/aerospace-engineers.htm",
      "scope": "Verwendet für: Arbeitsmarktnachfrage nach Aerospace Engineers 2025–2035.\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A30:D30"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q27",
      "label": "Q27",
      "title": "Starlink (o. J.): Starlink Roam. Website.",
      "publisher": "Starlink",
      "url": "https://starlink.com/roam",
      "scope": "Verwendet für: mobiles Arbeiten, abgelegene Orte, Nutzung unterwegs.\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A31:D31"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q28",
      "label": "Q28",
      "title": "FAA (o. J.): SpaceX Starship – Licensing and Permitting Process. Website.",
      "publisher": "FAA",
      "url": "https://www.faa.gov/space/stakeholder_engagement/spacex_starship/license_review_process",
      "scope": "Verwendet für: Launch-/Reentry-Lizenzen und regulatorische Prüfprozesse.\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A32:D32"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q29",
      "label": "Q29",
      "title": "Zukunftsinstitut (o. J.): Neo-Ökologie – Die Märkte werden grün. Website.",
      "publisher": "Zukunftsinstitut",
      "url": "https://www.zukunftsinstitut.de/zukunftsthemen/neo-oekologie-die-maerkte-werden-gruen",
      "scope": "Verwendet für: Definition des Megatrends Neo-Ökologie (ressourceneffizientes Handeln).\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A33:D33"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q30",
      "label": "Q30",
      "title": "SpaceX (o. J.): Starship. Website.",
      "publisher": "SpaceX",
      "url": "https://www.spacex.com/vehicles/starship",
      "scope": "Verwendet für: Starship / Raptor 3 als Antwort auf Ressourceneffizienz (Wiederverwendung).\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A34:D34"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q31",
      "label": "Q31",
      "title": "CNBC (27.06.2026): Online-Artikel zu SpaceX-Stellen, MINT-Karrieren und Arbeitsmarkt.",
      "publisher": "CNBC",
      "url": "https://www.cnbc.com/2026/06/27/spacex-jobs-stem-careers-labor-economy.html",
      "scope": "Verwendet für: hohe Bewerberzahl bei gleichzeitigem Mangel an hochqualifizierten Technikfachkräften.\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A35:D35"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q32",
      "label": "Q32",
      "title": "Bloomberg Law (o. J.): SpaceX Hiring Case Shows Export Control, Immigration Law Clash. Daily Labor Report.",
      "publisher": "Bloomberg Law",
      "url": "https://news.bloomberglaw.com/daily-labor-report/spacex-hiring-case-shows-export-control-immigration-law-clash",
      "scope": "Die ursprüngliche Arbeitsmappe verwendet diese Quelle für eine zu enge Beschreibung der Exportkontrolle bei Einstellungen. Die Website präzisiert: Zugang zu sensibler Technologie kann beschränkt sein; weitere geschützte Personengruppen und Genehmigungen sind zu berücksichtigen. Maßgeblicher Primärbeleg: 22 CFR § 120.62 (unten).",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A36:D36"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "part3-Q33",
      "label": "Q33",
      "title": "SpaceX (2026): SpaceX Reports Second Quarter 2026 Results. PDF (Investor Relations).",
      "publisher": "SpaceX",
      "url": "https://s21.q4cdn.com/184289198/files/doc_financials/2026/q2/SpaceX-Reports-Second-Quarter-2026-Results.pdf",
      "scope": "Verwendet für: Starlink als aktuell einziger profitabler Geschäftsbereich; negative Umsatzrendite des Gesamtunternehmens.\nHinweis: Quelle aus der Trendbewertung übernommen; Inhalt hier nicht erneut geprüft.",
      "limitations": "Beleggrenzen aus der Originalarbeitsmappe beachten; die Quellenliste ist keine unabhängige Prüfung sämtlicher Aussagen.",
      "provenance": {
        "file": "part3",
        "sheet": "Quellen",
        "cells": "A37:D37"
      },
      "verification": "Aus dem aktuellen Original übernommen; nicht pauschal neu extern verifiziert."
    },
    {
      "id": "verified-planetary-membership",
      "title": "Membership · The Planetary Society",
      "publisher": "The Planetary Society",
      "url": "https://www.planetary.org/membership",
      "scope": "Ein bestehendes Raumfahrt-Mitgliedschaftsmodell bietet Community-Zugang, Veranstaltungen, Lernangebote und weitere Mitgliedervorteile.",
      "limitations": "Belegt ein Vergleichsmodell, keinen offiziellen SpaceX-Club und keine Nachfrage nach einem SpaceX Luxury Club.",
      "replaces": {
        "url": "https://www.reddit.com/r/spacexfanclub/",
        "provenance": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "L38"
        }
      },
      "retrievalRef": "turn5view0",
      "verification": "Am 14.11.2026 direkt geöffnet und für die angegebene Teilaussage geprüft.",
      "checkedAt": "2026-11-14"
    },
    {
      "id": "verified-dyson-1960",
      "title": "Freeman J. Dyson (1960): Search for Artificial Stellar Sources of Infrared Radiation",
      "publisher": "Science / AAAS; Originalabdruck auf dem Hochschulserver der Westlake University",
      "url": "https://wucj.lab.westlake.edu.cn/Others/dyson1960.pdf",
      "doi": "10.1126/science.131.3414.1667",
      "scope": "Originalveröffentlichung des astronomischen Gedankenexperiments zur großmaßstäblichen Nutzung von Sternenenergie und Suche nach Infrarotabstrahlung; veröffentlicht am 3. Juni 1960.",
      "limitations": "Kein Bauplan und kein heutiger Machbarkeitsnachweis. Die Matrixwertung 1/4 bleibt eine Projektbewertung, keine Aussage der Publikation.",
      "replaces": {
        "url": "https://en.wikipedia.org/wiki/Dyson_sphere",
        "provenance": {
          "file": "part3",
          "sheet": "Now-How-Wow-Matrix",
          "cells": "K40"
        }
      },
      "retrievalRef": "turn6view0",
      "verification": "Am 14.11.2026 direkt geöffnet und für die angegebene Teilaussage geprüft.",
      "checkedAt": "2026-11-14"
    },
    {
      "id": "verified-ksc-viewing",
      "title": "Launch Viewing Locations",
      "publisher": "Kennedy Space Center Visitor Complex",
      "url": "https://www.kennedyspacecenter.com/launches-and-events/see-a-launch/launch-viewing-locations/",
      "scope": "Startsicht hängt von Startplatz, Mission, Betrieb und Sicherheitsfreigabe ab. Genannte Sichtorte liegen je nach Startplatz unter 10 km; Gantry ist für LC-39A/B aus Sicherheitsgründen gesperrt.",
      "limitations": "Kein Nachweis, dass ein geschlossenes Gebäude einen näheren Standort ermöglicht; keine Zusage für einen RocketLight-Standort.",
      "retrievalRef": "turn5view1",
      "verification": "Am 14.11.2026 direkt geöffnet und für die angegebene Teilaussage geprüft.",
      "checkedAt": "2026-11-14"
    },
    {
      "id": "verified-itar-definition",
      "title": "22 CFR § 120.62 · U.S. person",
      "publisher": "Electronic Code of Federal Regulations",
      "url": "https://www.ecfr.gov/current/title-22/chapter-I/subchapter-M/part-120/subpart-C/section-120.62",
      "scope": "Der Begriff U.S. person umfasst rechtmäßig dauerhaft Aufenthaltsberechtigte und protected individuals nach 8 U.S.C. 1324b(a)(3).",
      "limitations": "Keine pauschale Beschränkung auf US-Staatsangehörige oder Green-Card-Inhaber; konkrete Zugangs- und Genehmigungsvoraussetzungen hängen vom Sachverhalt ab.",
      "retrievalRef": "turn8view0",
      "verification": "Am 14.11.2026 direkt geöffnet und für die angegebene Teilaussage geprüft.",
      "checkedAt": "2026-11-14"
    },
    {
      "id": "verified-spacex-hiring",
      "title": "Technical Recruiter, Security · ITAR requirements",
      "publisher": "SpaceX · offizielles Stellenportal auf Greenhouse",
      "url": "https://job-boards.greenhouse.io/spacex/jobs/8902884002",
      "scope": "SpaceX nennt in der Stellenanzeige auch Flüchtlinge, Asylberechtigte und Personen mit möglicher erforderlicher Genehmigung, zusätzlich zu US-Staatsangehörigen und Daueraufenthaltsberechtigten.",
      "limitations": "Ein Stellenangebot, kein Beleg für das Ausmaß eines Fachkräftemangels. Die Anzeige kann später entfallen.",
      "retrievalRef": "turn8view1",
      "verification": "Am 14.11.2026 direkt geöffnet und für die angegebene Teilaussage geprüft.",
      "checkedAt": "2026-11-14"
    },
    {
      "id": "matrix-source-62",
      "title": "https://www.ghgsat.com/",
      "publisher": "",
      "url": "https://www.ghgsat.com/",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K20:L20"
      }
    },
    {
      "id": "matrix-source-63",
      "title": "https://www.methanesat.org/",
      "publisher": "",
      "url": "https://www.methanesat.org/",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K20:L20"
      }
    },
    {
      "id": "matrix-source-64",
      "title": "https://www.ghgsat.com/methane-solutions/satellite-methane-monitoring/",
      "publisher": "",
      "url": "https://www.ghgsat.com/methane-solutions/satellite-methane-monitoring/",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K20:L20"
      }
    },
    {
      "id": "matrix-source-65",
      "title": "https://www.celestis.com/",
      "publisher": "",
      "url": "https://www.celestis.com/",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K22:L22"
      }
    },
    {
      "id": "matrix-source-66",
      "title": "https://exolaunch.com/integration_service",
      "publisher": "",
      "url": "https://exolaunch.com/integration_service",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K22:L22"
      }
    },
    {
      "id": "matrix-source-67",
      "title": "https://arxiv.org/abs/2512.02465",
      "publisher": "",
      "url": "https://arxiv.org/abs/2512.02465",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K26:L26"
      }
    },
    {
      "id": "matrix-source-68",
      "title": "https://www.esa.int/Education/ESA_Academy",
      "publisher": "",
      "url": "https://www.esa.int/Education/ESA_Academy",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K28:L28"
      }
    },
    {
      "id": "matrix-source-69",
      "title": "https://www.nasa.gov/news-release/nasa-answers-presidents-call-to-establish-united-states-space-academy/",
      "publisher": "",
      "url": "https://www.nasa.gov/news-release/nasa-answers-presidents-call-to-establish-united-states-space-academy/",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K28:L28"
      }
    },
    {
      "id": "matrix-source-70",
      "title": "https://www.airbus.com/en/products-services/space/space-customer-support/capacity-building-and-training",
      "publisher": "",
      "url": "https://www.airbus.com/en/products-services/space/space-customer-support/capacity-building-and-training",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K28:L28"
      }
    },
    {
      "id": "matrix-source-71",
      "title": "https://www.mbopartners.com/state-of-independence/",
      "publisher": "",
      "url": "https://www.mbopartners.com/state-of-independence/",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K30:L30"
      }
    },
    {
      "id": "matrix-source-72",
      "title": "https://www.faa.gov/space/licenses",
      "publisher": "",
      "url": "https://www.faa.gov/space/licenses",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K32:L32"
      }
    },
    {
      "id": "matrix-source-73",
      "title": "https://www.spacex.com/vehicles/falcon-9/",
      "publisher": "",
      "url": "https://www.spacex.com/vehicles/falcon-9/",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K34:L34"
      }
    },
    {
      "id": "matrix-source-74",
      "title": "https://exolaunch.com/integration_services",
      "publisher": "",
      "url": "https://exolaunch.com/integration_services",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K34:L34"
      }
    },
    {
      "id": "matrix-source-75",
      "title": "https://www.kennedyspacecenter.com/",
      "publisher": "",
      "url": "https://www.kennedyspacecenter.com/",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K36:L36"
      }
    },
    {
      "id": "matrix-source-76",
      "title": "https://www.spacex.com/launches",
      "publisher": "",
      "url": "https://www.spacex.com/launches",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K36:L36"
      }
    },
    {
      "id": "matrix-source-77",
      "title": "https://www.kennedyspacecenter.com/de/launches-and-events/see-a-launch/launch-viewing-locations/",
      "publisher": "",
      "url": "https://www.kennedyspacecenter.com/de/launches-and-events/see-a-launch/launch-viewing-locations/",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K36:L36"
      }
    },
    {
      "id": "matrix-source-78",
      "title": "https://www.investor.gov/introduction-investing/investing-basics/glossary/regulation-fair-disclosure-regulation-fd",
      "publisher": "",
      "url": "https://www.investor.gov/introduction-investing/investing-basics/glossary/regulation-fair-disclosure-regulation-fd",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K38:L38"
      }
    },
    {
      "id": "matrix-source-79",
      "title": "https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2025",
      "publisher": "",
      "url": "https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2025",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K42:L42"
      }
    },
    {
      "id": "matrix-source-80",
      "title": "https://www.astroscale.com/en/missions/adras-j",
      "publisher": "",
      "url": "https://www.astroscale.com/en/missions/adras-j",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K42:L42"
      }
    },
    {
      "id": "matrix-source-81",
      "title": "https://www.astroscale.com/en/missions/elsa-d",
      "publisher": "",
      "url": "https://www.astroscale.com/en/missions/elsa-d",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K42:L42"
      }
    },
    {
      "id": "matrix-source-82",
      "title": "https://www.unoosa.org/oosa/en/ourwork/spacelaw/treaties/introouterspacetreaty.html",
      "publisher": "",
      "url": "https://www.unoosa.org/oosa/en/ourwork/spacelaw/treaties/introouterspacetreaty.html",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K42:L42"
      }
    },
    {
      "id": "matrix-source-83",
      "title": "https://www.astroscale.com/en/news/astroscales-elsa-d-successfully-demonstrates-repeated-magnetic-capture",
      "publisher": "",
      "url": "https://www.astroscale.com/en/news/astroscales-elsa-d-successfully-demonstrates-repeated-magnetic-capture",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K42:L42"
      }
    },
    {
      "id": "matrix-source-84",
      "title": "https://www.esa.int/Space_Safety/Space_Debris",
      "publisher": "",
      "url": "https://www.esa.int/Space_Safety/Space_Debris",
      "scope": "Beleglink aus der Begründung der Now-How-Wow-Matrix.",
      "limitations": "Link aus dem Original übernommen; nicht alle Inhalte neu verifiziert.",
      "verification": "Originalquelle",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K42:L42"
      }
    }
  ],
  "corrections": [
    {
      "id": "rocketlight-distance",
      "issue": "Die Originalbegründung nennt bisherige Startbeobachtung pauschal mit 10+ km und leitet aus einem geschlossenen Gebäude eine deutlich nähere Sicht ab.",
      "revision": "Entfernungen sind startplatzabhängig; KSC nennt auch Sichtorte unter 10 km. Ein geschlossenes Gebäude belegt keine verringerte Sicherheitsdistanz. Diese Aussage wird im Pitch nicht als Vorteil versprochen.",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "J36"
      },
      "sources": [
        "verified-ksc-viewing"
      ],
      "scoresChanged": false
    },
    {
      "id": "itar-employment",
      "issue": "Die Trendbegründung beschränkt Einstellungen unter ITAR pauschal auf US-Staatsangehörige und Green-Card-Inhaber.",
      "revision": "Die Gruppe der U.S. persons ist weiter gefasst; auch geschützte Personen und erforderliche Genehmigungen sind relevant. Im Pitch wird der Zugang zu sensibler Technologie beschrieben.",
      "provenance": {
        "file": "part3",
        "sheet": "Trendbewertung",
        "cells": "M11"
      },
      "sources": [
        "verified-itar-definition",
        "verified-spacex-hiring"
      ],
      "scoresChanged": false
    },
    {
      "id": "reddit-membership",
      "issue": "Reddit-Link zur Begründung der geringen Neuartigkeit des SpaceX Luxury Club.",
      "revision": "Primärbeispiel einer tatsächlich angebotenen Raumfahrt-Mitgliedschaft ergänzt. Keine Behauptung eines offiziellen SpaceX-Fanclubs.",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "L38"
      },
      "sources": [
        "verified-planetary-membership"
      ],
      "scoresChanged": false
    },
    {
      "id": "wikipedia-dyson",
      "issue": "Wikipedia als allgemeiner Konzeptbeleg zur Dyson Sphere.",
      "revision": "Dysons Originalveröffentlichung von 1960 ersetzt den allgemeinen Konzept- und Herkunftsbeleg. Heutige Machbarkeit bleibt ausdrücklich Projektbewertung.",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "K40"
      },
      "sources": [
        "verified-dyson-1960"
      ],
      "scoresChanged": false
    },
    {
      "id": "not-a-market-proof",
      "issue": "Einige qualitative Originalauswahlen formulieren rechtliche Pflichten oder vorhandene Konnektivität als Nachweis zahlender Kunden für die neue Idee.",
      "revision": "Problembeleg, bestehendes Vergleichsangebot und Zahlungsbereitschaft für das neue Produkt werden getrennt. Alle 19 Ideen sind Konzepte; die Auswahl ersetzt keinen Business Case.",
      "provenance": {
        "file": "part3",
        "sheet": "Auswahlübersicht",
        "cells": "A3:D15"
      },
      "sources": [],
      "scoresChanged": false
    },
    {
      "id": "originality-is-judgment",
      "issue": "RocketLight wird im Original mit maximaler Originalität und Machbarkeit bewertet, obwohl Standort, Nachfrage und Betriebsmodell noch zu prüfen sind.",
      "revision": "Die 5/5 bleibt als subjektive Vorauswahl des Teams sichtbar. Der Pitch leitet daraus keine Marktvalidierung oder genehmigte Umsetzung ab.",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "D36:F36"
      },
      "sources": [],
      "scoresChanged": false
    },
    {
      "id": "matrix-axis-consistency",
      "issue": "Die Methodentexte A7/A47 nennen X = Machbarkeit und Y = Originalität; die Zellblock-Matrix A50/I50 führt dagegen Originalität horizontal.",
      "revision": "Die Website folgt der expliziten Achsendefinition: Machbarkeit horizontal, Originalität vertikal. HOW liegt links oben, NOW rechts unten. Die Kategorien und Zahlenwerte bleiben identisch.",
      "provenance": {
        "file": "part3",
        "sheet": "Now-How-Wow-Matrix",
        "cells": "A7:A68"
      },
      "sources": [],
      "scoresChanged": false
    }
  ],
  "story": {
    "step2": {
      "eyebrow": "02 · Innovationsprüfstand",
      "headline": "Innovation ist mehr als Neuheit.",
      "lead": "Vier Systembausteine zeigen, wie stark Reife und belegter Nutzen das Innovationsurteil verändern.",
      "takeaway": "Technische Stärke allein beantwortet noch nicht, welche neue Geschäftsidee sich lohnt."
    },
    "step3": {
      "eyebrow": "03 · Von Trends zu Chancen",
      "headline": "Aus 23 Ansätzen wird eine prüfbare Auswahl.",
      "lead": "Acht Trends führen zu 19 Geschäftsideen. Acht Favoriten und vier Open-Innovation-Impulse treten in der Matrix an.",
      "takeaway": "RocketLight Dinner und Starlink Insights sind die beiden WOW-Ideen des Teams. Launch Engineering Cloud bleibt als gut machbarer NOW-Kandidat im vertieften Vergleich."
    },
    "rocketlightOrigin": "RocketLight entsteht aus Open Innovation: Raumfahrt × Gastronomie. Es ist nicht aus der numerischen Trendbewertung errechnet.",
    "visuals": [
      "Team/KI-Balkenvergleich für die vier Hube-Werte mit aufklappbaren Faktoren.",
      "Ein gemeinsames Trendportfolio mit acht nummerierten Punkten, präzisen Achsen und umschaltbaren Bewertungen.",
      "19 Ideen gruppiert nach den acht Trends; qualitative Vorauswahl und offene Fragen sichtbar machen.",
      "12er-Matrix mit Herkunftskennzeichnung und Team/KI-Umschalter; auf den Unterschied bei Launch Engineering Cloud hinweisen."
    ]
  }
});
