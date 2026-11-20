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
    "sources": [{"file": "step-4-rocketlight.xlsm", "label": "RocketLight"}, {"file": "step-4-starlink-insights.xlsm", "label": "Starlink Insights"}, {"file": "step-4-launch-engineering-cloud.xlsm", "label": "Launch Engineering Cloud"}],
    "length": 3,
    "beats": [
      {
        "at": 0,
        "still": 0.5,
        "view": ".fa-ir-bars",
        "tag": "INNOVATIONSRENDITE",
        "title": "Drei Ideen.<br><em>Ein Score.</em>",
        "copy": "Die IR teilt den gewichteten Nutzen durch den gewichteten Aufwand. RocketLight führt mit 1,83. Starlink Insights liegt bei 1,62, Launch Engineering Cloud bei 1,27.",
        "cue": "Innovationsrendite der drei Ideen"
      },
      {
        "at": 0.55,
        "still": 1,
        "view": ".fa-ir-callout",
        "tag": "ROCKETLIGHT · DER HÖCHSTE SCORE",
        "title": "Eine Idee sticht<br><em>heraus.</em>",
        "copy": "Aus unserer Sicht erzielt RocketLight Dinner die höchste Innovationsrendite, vor Starlink Insights und der Launch Engineering Cloud. IR ist ein Bewertungsscore, keine Finanzrendite.",
        "cue": "RocketLight liegt vorn",
        "tone": "difference"
      }
    ],
    "seconds": 90
  },
  {
    "step": 5,
    "label": "Das Dinner & die Wirtschaftlichkeit",
    "sources": [{"file": "step-5-marketing-mix.xlsx", "label": "Marketingmix"}, {"file": "step-4-rocketlight.xlsm", "label": "Kalkulation"}],
    "length": 5.8,
    "beats": [
      {
        "at": 0,
        "tag": "DAS RAUMKONZEPT",
        "title": "Zehn Tische.<br><em>Ein gemeinsamer Blick.</em>",
        "copy": "20 Gäste sitzen an zehn Zweiertischen. Versetzte, leicht terrassierte Reihen richten jeden Platz auf das Startpanorama aus.",
        "cue": "Die Tische entstehen. Die Sichtachsen öffnen sich.",
        "still": 0.13,
        "view": "[data-fe-layout]"
      },
      {
        "at": 0.16,
        "tag": "DAS ERLEBNIS",
        "title": "Sieben Gänge.<br><em>Ein großer Moment.</em>",
        "copy": "Missionsbriefing, Fine Dining und persönlicher Concierge verdichten den Abend. Die Rakete wird zum gemeinsamen Mittelpunkt.",
        "cue": "Das Raumkonzept wird zum Erlebnis.",
        "still": 0.29,
        "view": "[data-fe-panorama]",
        "art": "panorama"
      },
      {
        "at": 0.32,
        "tag": "DIE PREISANNAHME",
        "title": "Selten ist wertvoll.<br><em>Vertrauen schafft Zugang.</em>",
        "copy": "35.000 USD je Gast im Pilot; langfristig bis zu 50.000 USD als Ziel. Erst reale Buchungen zeigen, ob diese Zahlungsbereitschaft trägt.",
        "cue": "Der Pilot prüft die Preisannahme.",
        "still": 0.45,
        "view": "[data-fe-price]"
      },
      {
        "at": 0.48,
        "tag": "ERWARTETE KOSTEN UND GEWINNE",
        "title": "Erst investieren.<br><em>Dann verdienen.</em>",
        "copy": "Im ersten Jahr entstehen nur Kosten für Konzept, Pavillon und Genehmigungen. Ab dem zweiten Jahr laufen die Piloten. Über fünf Jahre stehen rund 11,5 Mio. USD Gewinn etwa 3,5 Mio. USD F&E-Kosten gegenüber.",
        "cue": "Der Gewinn wächst, die Kosten sinken, kumuliert im Plus ab Jahr 4.",
        "still": 0.62,
        "view": "[data-fe-econ]"
      },
      {
        "at": 0.65,
        "tag": "WIRTSCHAFTLICHKEIT",
        "title": "Hohe Marge.<br><em>Kleine Größe.</em>",
        "copy": "Je Gast bleiben bei 50.000 USD etwa 45.000 USD übrig. Das Dinner bleibt ein kleines Angebot für 20 Gäste; entscheidend ist der Nachweis der Nachfrage im Pilot.",
        "cue": "Profitabel je Gast, aber ein kleines Angebot.",
        "still": 1,
        "view": "[data-fe-scale]"
      }
    ],
    "seconds": 195
  },
  {
    "step": 6,
    "label": "Roadmap & Umsetzung",
    "sources": [{"file": "step-6-roadmap-pavillon.pptx"}],
    "length": 7.8,
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
        "tag": "DIE WAHL",
        "title": "Welches Menü<br><em>wählt das Publikum?</em>",
        "copy": "Jedes Dinner beginnt mit einer Entscheidung. Scannen Sie den Code, wählen Sie Avatar und Menü und buchen Sie Ihren Platz. Es dauert eine Minute und kostet nichts.",
        "cue": "QR-Code scannen und ein Menü wählen.",
        "still": 0.38,
        "view": "[data-fm-chart]"
      },
      {
        "at": 0.5,
        "tag": "DAS ERGEBNIS",
        "title": "Ihre Wahl.<br><em>Ein erster Nachfragetest.</em>",
        "copy": "Die Balken zeigen, wie oft welches Menü in den letzten 30 Minuten gebucht wurde. Das ist Interesse, noch keine zahlungsbereite Nachfrage.",
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
