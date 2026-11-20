/* Teil-6 plan, 20.11.2026 (final roadmap deck): one fixed pavilion in Titusville, Florida; a Texas site is a separate later project.
   Eight picture phases group parallel work; they are not eight sequential dates. */
(() => {
  'use strict';
  const sources = window.ROCKET_DATA;
  // The eight planning phases keep their pacing inside the first 92 % of the chapter; the overview is a ninth, separate step.
  const OVERVIEW_AT = .93, WORLD_END = .92;
  const at = [0,.12,.24,.36,.48,.60,.72,.86].map(v => +(v * WORLD_END).toFixed(4)).concat(OVERVIEW_AT);
  const points = [.10,.22,.34,.46,.58,.70,.84,1].map(v => +(v * WORLD_END).toFixed(4)).concat(1);
  const date = value => value.split('-').reverse().join('.');
  const activity = (variant,row,text,label) => {
    const item = sources[variant].rows[row].items.find(item => item.text === text && (item.s || item.d));
    if (!item) throw new Error('Roadmap source missing: '+variant+' / '+row+' / '+text);
    return {label:label || text,sourceRow:row,start:item.s,end:item.e,date:item.d,
      period:item.s ? date(item.s)+'–'+date(item.e) : date(item.d)};
  };
  const pilots = variant => sources[variant].rows[5].items.filter(item=>item.num).map(item=>({label:'Pilot '+item.num,sourceRow:5,date:item.d,period:date(item.d)}));
  const phases = {
    A:[
      {
        id:'site',tag:'01 / STANDORT & SICHTACHSEN',
        title:'Ein fester Ort.<br><em>Ein freier Blick.</em>',
        copy:'Wir prüfen Titusville in Florida als ersten Standort: Grundstück, Sicht auf den Start und Zugang. Der Pavillon bleibt dauerhaft an diesem Ort.',
        cue:'Standort in Titusville prüfen und eine Option sichern',
        period:'01.12.2026–31.03.2027',
        tasks:['Fläche, Sichtachsen, Zugang und Standortrisiken prüfen','Eine geeignete Grundstücksoption sichern'],
        result:'G1 · 31.03.2027: Standortoption auf Basis der geprüften Parzelle, Sichtachse, Zufahrt und Bebaubarkeit freigeben; Laufzeit der Option bis G2 sichern.',
        laneIds:[1,2],
        imageAction:'Schematische Standortoptionen erscheinen aus der Vogelperspektive. Die Kamera folgt einer möglichen Fläche bis zum Bauplatz; die Lage ist eine Konzeptdarstellung.',
        activities:[activity('A',1,'Standortsuche & Prüfung'),activity('A',1,'Standortoption 31.03.27','Standortoption / G1')],
        parallel:'Das Raumkonzept und die Suche nach Kulinarikpartnern beginnen parallel.'
      },
      {
        id:'permit',tag:'02 / MACHBARKEIT & FREIGABEN',
        title:'Nähe erleben.<br><em>Machbarkeit prüfen.</em>',
        copy:'Grundstück und Entwurf werden mit Erschließung, Sicherheit und Genehmigungen abgestimmt. Diese Voraussetzungen bestimmen, wann die Bauinvestition freigegeben werden kann.',
        cue:'Standort-, Sicherheits- und Baufragen vor der Investition klären',
        period:'01.04.2027–30.09.2027',
        tasks:['Standort- und Sicherheitsplanung konkretisieren','Die erforderlichen Baugenehmigungen als Voraussetzung für G2 klären'],
        result:'Voraussetzungen für G2: abgestimmter Entwurf, erforderliche Genehmigungen, vergleichbare Angebote sowie Kosten- und Finanzierungsplanung.',
        laneIds:[2,1],
        imageAction:'Prüfbereich, Erschließung und Zugangslinien werden um den möglichen Standort sichtbar.',
        activities:[activity('A',2,'Standort- & Sicherheitsplanung'),activity('A',2,'Genehmigung Bau'),activity('A',2,'Baugenehmigung bis 30.09.27','Genehmigungsziel vor G2')],
        parallel:'Entwurf und Fachplanung laufen parallel zu den Standort- und Genehmigungsprüfungen.'
      },
      {
        id:'concept',tag:'03 / ENTWURF & RAUMPLANUNG',
        title:'Aus dem Blick<br><em>wird ein fester Raum.</em>',
        copy:'Panoramafront, Küche und zehn Zweiertische bilden einen festen Pavillon für 20 Gäste. Gebäude und Betriebswege entstehen gemeinsam für den Standort in Florida.',
        cue:'Festen Pavillon, zehn Tische und Betriebswege entwerfen',
        period:'15.01.2027–31.08.2027',
        tasks:['Raum- und Nutzungskonzept für 20 Gäste entwickeln','Entwurf, technische Versorgung und Fachplanung verbinden'],
        result:'Ein standortbezogener Entwurf als Grundlage für Genehmigung, Baukosten und Betrieb.',
        laneIds:[3,2],
        imageAction:'Der Grundriss entsteht; zehn Tische, Küche und Sichtlinien füllen den festen Pavillon.',
        activities:[activity('A',3,'Raum- & Nutzungskonzept'),activity('A',3,'Entwurf & Fachplanung')],
        parallel:'Die Kulinarik- und Betriebsplanung konkretisiert Küche, Service und Teamabläufe.'
      },
      {
        id:'detail',tag:'04 / INVESTITION & BAUAUFTRAG',
        title:'Planung wird<br><em>zur Investition.</em>',
        copy:'Vor G2 werden Grundstück, Bau, Ausstattung, Betrieb und Pilotliquidität auf Angebotsbasis kalkuliert. Das Investitionsgremium entscheidet anhand der Genehmigungen, Angebote und Finanzierung über die Bauinvestition in Florida.',
        cue:'Kalkulation vorlegen und an G2 über die Bauinvestition entscheiden',
        period:'01.09.2027–30.09.2027',
        tasks:['Grundstück, Bau, Ausstattung, Betrieb und Pilotliquidität auf Angebotsbasis kalkulieren','Baubeauftragung nach G2 und gesicherten Nutzungsrechten; Bestellungen nach Investitionsfreigabe'],
        result:'G2 · 30.09.2027: Bauinvestition für Florida entscheiden. Baubeauftragung nach G2 und gesicherten Nutzungsrechten; Bestellungen nach Investitionsfreigabe.',
        laneIds:[3,2],
        imageAction:'Konstruktion, Ausstattung und Versorgungswege ergänzen den Grundriss; die Investitionsentscheidung bleibt als Prüfpunkt sichtbar.',
        activities:[activity('A',3,'Kostenprüfung & Vergabevorbereitung'),activity('A',3,'Bauinvestition 30.09.27','Bauinvestition / G2')],
        parallel:'Genehmigungen und gesicherte Nutzungsrechte bleiben Voraussetzungen für die Baubeauftragung.'
      },
      {
        id:'build',tag:'05 / BAU & INBETRIEBNAHME',
        title:'Erst fertigstellen.<br><em>Dann Gäste empfangen.</em>',
        copy:'Tragwerk, Glasfassade und Ausstattung machen den Entwurf nutzbar. Auf den Bau folgen Abnahmen und Probebetrieb. Erst danach finden die Pilot-Dinner im eigenen Pavillon statt.',
        cue:'Eigenen Pavillon bauen, abnehmen und für Piloten freigeben',
        period:'01.11.2027–30.09.2028',
        tasks:['Festes Gebäude und Ausstattung fertigstellen','Abnahmen, Betriebsfreigaben und Probebetrieb vor den Piloten abschließen'],
        result:'G3 am 30.09.2028: Pilotfreigabe nur bei fertigem, freigegebenem Pavillon und vorbereitetem Team.',
        laneIds:[3,2,4],
        imageAction:'Sockel, Tragwerk und Verglasung werden zum festen Gebäude; Abnahmen schließen die Bauphase ab.',
        activities:[activity('A',3,'Bau & Ausstattung'),activity('A',3,'Abnahme & Probebetrieb'),activity('A',3,'Betriebsbereit 30.09.28','Betriebsbereitschaft / G3')],
        parallel:'Betriebsfreigaben, Teamaufbau und Schulung werden auf denselben Pilotstart abgestimmt.'
      },
      {
        id:'service',tag:'06 / KULINARIK & BETRIEB',
        title:'Der Raum steht.<br><em>Der Ablauf wird geprüft.</em>',
        copy:'Menü, Service und Team entstehen schon während der Planung. Schulung und Testservice im fertigen Pavillon prüfen, ob die Abläufe vor dem ersten Pilot zusammenspielen.',
        cue:'Team und Testservice vor der Pilotfreigabe vorbereiten',
        period:'04.01.2027–30.09.2028',
        tasks:['Kulinarikpartner, Menü und Betriebsrollen entwickeln','Team im fertigen Pavillon schulen und Testservice prüfen'],
        result:'Im September 2028 werden Abläufe und Team im eigenen Pavillon geprüft; G3 entscheidet über den Pilotstart.',
        laneIds:[4,3,6],
        imageAction:'Die Küche leuchtet auf; Servicewege verbinden sie mit den zehn Tischen. Der Testservice prüft die Wege vor dem Gästebetrieb.',
        activities:[activity('A',4,'Kulinarikpartner & Menü'),activity('A',4,'Abläufe & Team'),activity('A',4,'Schulung & Testservice')],
        parallel:'Interesse und Warteliste können vorher entstehen; die Durchführung bleibt an G3 gebunden.'
      },
      {
        id:'pilot',tag:'07 / VIER PILOT-DINNER',
        title:'Vier eigene Abende.<br><em>Ein Lernprogramm.</em>',
        copy:'Vier Dinner im eigenen Florida-Pavillon prüfen Nachfrage, Ablauf und Kosten. Reale Buchungen testen die Preisannahme von 35.000 USD je Platz. Nach jedem Abend verbessert das Team den Betrieb.',
        cue:'Vier Piloten nach Fertigstellung des eigenen Pavillons prüfen',
        period:'15.10.2028–15.06.2029',
        tasks:['Bis zu 20 Gäste je Pilot im freigegebenen eigenen Pavillon empfangen','Buchungen, Stornos, Gästefeedback und tatsächliche Kosten dokumentieren','Erfolgskriterien vorab festlegen und Abläufe zwischen den Piloten verbessern'],
        result:'Piloten am 15.10.2028, 15.12.2028, 15.03.2029 und 15.06.2029; gemeinsame Auswertung ab Juli 2029.',
        laneIds:[5,4,6],
        imageAction:'Vier Pilotpunkte verbinden sich; der feste Florida-Pavillon wechselt in den Dinnerbetrieb.',
        activities:pilots('A'),
        parallel:'Rückmeldungen fließen nach jedem Abend in Menü, Service und Betrieb ein.'
      },
      {
        id:'operate',tag:'08 / BETRIEBSENTSCHEID',
        title:'Vier Piloten.<br><em>Ein Betriebsentscheid.</em>',
        copy:'Nach vier Pilot-Dinnern entscheidet das Investitionsgremium über den Regelbetrieb in Florida. Bei Go beginnen ab August 2029 der Betrieb und regelmäßige Kennzahlenreviews. Ein weiterer Standort in Texas wird anschließend in einem eigenen Projekt auf Machbarkeit und Finanzierung geprüft.',
        cue:'Florida-Betrieb entscheiden und die nächste Standortprüfung vorbereiten',
        period:'G4: 31.07.2029 · Regelbetrieb bei Go ab 01.08.2029',
        tasks:['Pilotnachweise, Qualität, Störungen und Istkosten für G4 auswerten','Florida-Betrieb an G4 entscheiden: Go, Nachbessern oder No-go','Texas anschließend in einem eigenen Projekt auf Machbarkeit und Finanzierung prüfen'],
        result:'G4 · 31.07.2029: Go, Nachbessern oder No-go für den Florida-Betrieb anhand von bezahlter Nachfrage, Qualität, Störungen und Istkosten.',
        laneIds:[6,5],
        imageAction:'Der feste Florida-Pavillon bleibt im Betrieb sichtbar; die Standortstrategie zeigt Florida und die getrennte Texas-Prüfung.',
        activities:[activity('A',5,'Pilot-Auswertung'),activity('A',6,'Betriebsentscheid 31.07.29','Betriebsentscheid / G4'),activity('A',6,'Regelbetrieb Florida (bei Go)')],
        parallel:'Die Texas-Prüfung ist ein eigenes Projekt mit eigener Machbarkeits- und Investitionsentscheidung.'
      },
      {
        id:'overview',tag:'09 / GESAMTÜBERSICHT',
        title:'Der ganze Plan.<br><em>Auf einen Blick.</em>',
        copy:'Sechs Teilprojekte, fünf Gates und vier Pilot-Dinner auf einer Zeitachse von 2026 bis 2031.',
        cue:'Gesamtplan mit Teilprojekten, Gates und Pilot-Dinnern',
        period:'30.11.2026–31.12.2031',
        tasks:[],
        result:'G0 30.11.2026 · G1 31.03.2027 · G2 30.09.2027 · G3 30.09.2028 · G4 31.07.2029; Regelbetrieb Florida bei Go ab 01.08.2029.',
        laneIds:[0,1,2,3,4,5,6],
        imageAction:'Der Florida-Pavillon bleibt im Hintergrund; der Gesamtplan wird als Zeitachse eingeblendet.',
        activities:[],
        parallel:'Alle Teilprojekte laufen entlang derselben Gates.'
      }
    ]
  };
  phases.A.forEach((phase,index)=>{
    phase.at=at[index]; phase.point=points[index]; phase.world=phase.id; phase.index=index;
  });
  window.PitchRoadmapPhases=phases;
})();
