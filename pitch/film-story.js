/* Source-backed narrative for a 20-minute study pitch.
 * at, still and view keep spoken beats, graphics and the reading flow together. */
window.PitchFilmStory = [
  {
    "step": 1,
    "label": "Das Unternehmen",
    "sources": [{"file": "step-1-7-company-recommendations.pptx"}],
    "length": 3,
    "beats": [
      {
        "at": 0,
        "still": 0.45,
        "view": ".fa-mission",
        "tag": "DREI GESCHÄFTSFELDER",
        "title": "Raumfahrt.<br>Verbindung.<br><em>Intelligenz.</em>",
        "copy": "Space, Connectivity und AI: Neben den Raketen betreibt SpaceX ein Satellitennetz und ein KI-Geschäft.",
        "cue": "Drei Geschäftsfelder, eine Mission"
      },
      {
        "at": 0.5,
        "still": 1,
        "view": "[data-flow-panel=\"facts\"]",
        "tag": "ZAHLEN UND FAKTEN",
        "title": "18,67 Mrd. USD.<br><em>Und noch Verluste.</em>",
        "copy": "Connectivity mit Starlink ist die Gewinnquelle. Der Konzern schreibt 2025 trotzdem noch Verluste.",
        "cue": "Eine Gewinnquelle, ein Konzernverlust"
      }
    ],
    "seconds": 55
  },
  {
    "step": 2,
    "label": "Der Innovationsprüfstand",
    "sources": [{"file": "step-2-innovation-assessment.xlsx"}],
    "length": 2.4,
    "beats": [
      {
        "at": 0,
        "still": 1,
        "view": ".fa-hube-rows",
        "tag": "DREI INNOVATIONEN · HUBE-SCORE",
        "title": "Starship. Betankung.<br><em>Starlink.</em>",
        "copy": "Der Hube-Score bewertet Neuheit mal Umsetzung. Starship fliegt mit dem Raptor-Triebwerk, Starlink ist längst im Betrieb.",
        "cue": "Die Hube-Scores der drei Innovationen"
      }
    ],
    "seconds": 40
  },
  {
    "step": 3,
    "label": "Trends & Ideenauswahl",
    "sources": [{"file": "step-3-trend-portfolio.xlsx"}],
    "length": 4.4,
    "beats": [
      {
        "at": 0,
        "still": 0.26,
        "view": ".fa-pool-rows",
        "tag": "ACHT TRENDS · 19 IDEEN · 4 OPEN INNOVATION",
        "title": "23 Ideen.<br><em>Alle auf dem Tisch.</em>",
        "copy": "Aus acht Trends entstanden 19 Ideen, aus Open Innovation vier weitere. Zuerst liegt alles auf dem Tisch.",
        "cue": "23 Ideen: 19 aus Trends, 4 aus Open Innovation"
      },
      {
        "at": 0.3,
        "still": 0.5,
        "view": ".fa-pool-twelve",
        "tag": "AUSWAHL · 8 + 4 = 12",
        "title": "Zwölf bleiben.<br><em>Nach drei Fragen.</em>",
        "copy": "Je Trend wählten wir eine Idee nach belegtem Problem, zahlender Nachfrage und SpaceX-Beitrag. Die vier Open-Innovation-Ideen kamen separat dazu.",
        "cue": "Problem · Zahlung · SpaceX-Beitrag"
      },
      {
        "at": 0.58,
        "still": 0.84,
        "view": ".fa-matrix-phase",
        "tag": "NOW / HOW / WOW",
        "title": "Originell? Machbar?<br><em>Zwei WOW-Ideen.</em>",
        "copy": "Die zwölf Ideen ordnen wir nach Machbarkeit und Originalität ein. RocketLight Dinner und Starlink Insights sind WOW.",
        "cue": "Zwölf Ideen in Now, How und Wow"
      },
      {
        "at": 0.86,
        "still": 1,
        "view": ".fa-selection-final",
        "tag": "DREI IDEEN · DIE KERNIDEE",
        "title": "Drei Favoriten.<br><em>Drei Kernideen.</em>",
        "copy": "RocketLight: Sternemenü mit Blick auf den Start. Starlink Insights: Netzdaten als Wetterwissen. Launch Engineering Cloud: Prüfung von Satellitenentwürfen.",
        "cue": "Die Dreierauswahl ist eine Teamentscheidung"
      }
    ],
    "seconds": 120

  },
  {
    "step": 4,
    "label": "Bewertung & Kalkulation",
    "sources": [{"file": "step-4-rocketlight.xlsm", "label": "RocketLight · Vorbewertung"}, {"file": "step-4-starlink-insights.xlsm", "label": "Starlink Insights"}, {"file": "step-4-launch-engineering-cloud.xlsm", "label": "Launch Engineering Cloud"}],
    "length": 3,
    "beats": [
      {
        "at": 0,
        "still": 0.5,
        "view": ".fa-ir-bars",
        "tag": "URSPRÜNGLICHE TEAMBEWERTUNG",
        "title": "Drei Ideen.<br><em>Ein Score.</em>",
        "copy": "Die IR teilt den gewichteten Nutzen durch den gewichteten Aufwand. In unserer ursprünglichen Ideenbewertung führte RocketLight mit 1,83 vor Starlink Insights mit 1,62 und Launch Engineering Cloud mit 1,27.",
        "cue": "Die ursprüngliche Teamwertung erklärt unsere Ideenauswahl"
      },
      {
        "at": 0.55,
        "still": 1,
        "view": ".fa-ir-callout",
        "tag": "VON DER IDEENAUSWAHL ZUR UMSETZUNG",
        "title": "Die Idee überzeugt.<br><em>Der Bau wird geprüft.</em>",
        "copy": "Die damalige Bewertung begründet unsere Auswahl. Für den festen Pavillon müssen Bauaufwand, Genehmigungen und Betrieb neu bewertet werden. Die Roadmap macht diese Prüfungen zu Freigabepunkten.",
        "cue": "Ursprüngliche Auswahl · Aufwand des festen Baus neu bewerten",
        "tone": "difference"
      }
    ],
    "seconds": 90
  },
  {
    "step": 5,
    "label": "Das Dinner & die Wirtschaftlichkeit",
    "sources": [{"file": "step-4-rocketlight-fester-pavillon.xlsx", "label": "Fünfjahresrechnung"}, {"file": "step-5-marketing-mix.xlsx", "label": "Marketingmix"}],
    "length": 5.8,
    "beats": [
      {
        "at": 0,
        "tag": "DAS RAUMKONZEPT",
        "title": "Zehn Tische.<br><em>Ein gemeinsamer Blick.</em>",
        "copy": "Im festen Pavillon in Florida sitzen 20 Gäste an zehn Zweiertischen. Versetzte, leicht terrassierte Reihen richten jeden Platz auf das Startpanorama aus.",
        "cue": "Die Tische entstehen. Die Sichtachsen öffnen sich.",
        "still": 0.12,
        "view": "[data-fe-layout]"
      },
      {
        "at": 0.14,
        "tag": "DAS ERLEBNIS",
        "title": "Sieben Gänge.<br><em>Ein großer Moment.</em>",
        "copy": "Missionsbriefing, Fine Dining und persönlicher Concierge verdichten den Abend. Die Rakete wird zum gemeinsamen Mittelpunkt.",
        "cue": "Das Raumkonzept wird zum Erlebnis.",
        "still": 0.26,
        "view": "[data-fe-panorama]",
        "art": "panorama"
      },
      {
        "at": 0.28,
        "tag": "DIE PREISANNAHME",
        "title": "Selten ist wertvoll.<br><em>Vertrauen schafft Zugang.</em>",
        "copy": "35.000 USD je Gast im Pilot; langfristig bis zu 50.000 USD als Ziel. Erst reale Buchungen zeigen, ob diese Zahlungsbereitschaft trägt.",
        "cue": "Der Pilot prüft die Preisannahme.",
        "still": 0.40,
        "view": "[data-fe-price]"
      },
      {
        "at": 0.42,
        "tag": "DECKUNGSBEITRAG · ZIELPREISSZENARIO",
        "title": "Der Beitrag zählt.<br><em>Die Vollkosten auch.</em>",
        "copy": "50.000 USD Zielpreis minus 5.000 USD variable Kosten ergeben im Modell 45.000 USD je Gast. Davon sind der laufende Standortbetrieb und die Projektinvestition zu tragen. Deshalb rechnen wir den gesamten Weg über fünf Jahre.",
        "cue": "Vom Beitrag je Gast zur vollständigen Projektrechnung",
        "still": 0.59,
        "view": "[data-fe-scale]"
      },
      {
        "at": 0.62,
        "tag": "FÜNF JAHRE · FLORIDA · BASISSZENARIO",
        "title": "Erst investieren.<br><em>Dann wachsen.</em>",
        "copy": "13,38 Mio. USD für Investition und Anlauf; laufende Kosten kommen hinzu. Vier Piloten 2028–2029, danach 10 und 16 Dinner pro Jahr. Bei 90 % Auslastung und 50.000 USD Zielpreis wird der kumulierte Cashflow im Basisszenario 2031 positiv.",
        "cue": "Umsatz und Auszahlungen aufbauen · Cashflow über fünf Jahre verfolgen",
        "still": 0.77,
        "view": "[data-fe-econ]"
      },
      {
        "at": 0.8,
        "tag": "SENSITIVITÄT · WAS MUSS TRAGEN?",
        "title": "Zwei Annahmen.<br><em>Ein anderer Ausgang.</em>",
        "copy": "90 % Auslastung und 50.000 USD je Gast ergeben im Basisszenario +5,60 Mio. USD kumulierten Cashflow. Bei 70 % und 40.000 USD bleiben −2,72 Mio. USD. Die Piloten prüfen genau diese Annahmen; an G4 entscheiden wir über den Regelbetrieb.",
        "cue": "Preis und Auslastung verändern das Ergebnis · vor Finanzierung und Steuern",
        "still": 1,
        "view": "[data-fe-sensitivity]"
      }
    ],
    "seconds": 195
  },
  {
    "step": 6,
    "label": "Roadmap & Umsetzung",
    "sources": [{"file": "step-6-roadmap-fester-pavillon.pptx"}],
    "detail": "Fester Pavillon in Florida, langfristig zwei Standorte · acht Planungsphasen",
    "length": 8.2,
    "beats": [],
    "seconds": 120
  },
  {
    "step": 7,
    "label": "Ganzheitliches Innovationsmanagement",
    "sources": [{"file": "step-1-7-company-recommendations.pptx"}],
    "length": 3.6,
    "beats": [
      {
        "at": 0,
        "still": 0.42,
        "view": ".fe-focus-svg",
        "tag": "GANZHEITLICHES INNOVATIONSMANAGEMENT",
        "title": "Sechs Felder.<br><em>Ein Fokus.</em>",
        "copy": "Innovationsmanagement umfasst viele Felder. Wir wählen eines: Kompetenzen. Damit Wissen auch bei hoher Fluktuation im Unternehmen bleibt.",
        "cue": "Aus sechs Feldern fällt die Wahl auf Kompetenzen"
      },
      {
        "at": 0.5,
        "still": 1,
        "view": ".fe-focus-svg",
        "tag": "DREI IDEEN FÜR KOMPETENZEN",
        "title": "Drei Ideen.<br><em>Wissen, das bleibt.</em>",
        "copy": "Jobrotation, Food4Thought und Tandemlearning. Vor dem Start laden wir Sie zu einer ersten Wahl ein.",
        "cue": "Vom Management zur Menüwahl"
      }
    ],
    "seconds": 120
  },
  {
    "step": 8,
    "label": "Menüwahl mit dem Publikum",
    "sources": [],
    "length": 3.4,
    "beats": [
      {
        "at": 0,
        "tag": "",
        "title": "Welches Menü<br><em>wählt das Publikum?</em>",
        "copy": "",
        "cue": "QR-Code scannen und ein Menü wählen.",
        "still": 0.38,
        "view": "[data-fm-chart]"
      },
      {
        "at": 0.5,
        "tag": "",
        "title": "Ihre Wahl.<br><em>Ein erster Nachfragetest.</em>",
        "copy": "",
        "cue": "Buchungen je Menü",
        "still": 1,
        "view": "[data-fm-chart]"
      }
    ],
    "seconds": 180
  }
];
// Roadmap phases retain their original, variant-specific planning data.
window.PitchFilmStory.find(chapter => chapter.step === 6).beats = window.PitchRoadmapPhases.A;
