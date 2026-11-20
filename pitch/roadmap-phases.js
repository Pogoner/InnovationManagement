/* Current Teil-6 plan, 20.11.2026: one fixed pavilion first, a second site only conditionally.
   Eight picture phases group parallel work; they are not eight sequential dates. */
(() => {
  'use strict';
  const sources = window.ROCKET_DATA;
  const at = [0,.12,.24,.36,.48,.60,.72,.86];
  const points = [.10,.22,.34,.46,.58,.70,.84,1];
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
        cue:'Standort 1 in Titusville prüfen und eine Option sichern',
        period:'01.12.2026–31.03.2027',
        tasks:['Fläche, Sichtachsen, Zugang und Standortrisiken prüfen','Eine geeignete Grundstücksoption für Standort 1 sichern'],
        result:'G1 am 31.03.2027: Standortoption prüfen. Noch keine Zusage für Grundstück oder Bau.',
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
        result:'G2 setzt eine geeignete Fläche, erforderliche Genehmigungen und ein neu validiertes Budget voraus.',
        laneIds:[1,2],
        imageAction:'Prüfbereich, Erschließung und Zugangslinien werden um den möglichen Standort sichtbar.',
        activities:[activity('A',1,'Standort- & Sicherheitsplanung'),activity('A',1,'Genehmigung Bau'),activity('A',1,'Baugenehmigung bis 30.09.27','Genehmigungsziel vor G2')],
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
        laneIds:[2,3],
        imageAction:'Der Grundriss entsteht; zehn Tische, Küche und Sichtlinien füllen den festen Pavillon.',
        activities:[activity('A',2,'Raum- & Nutzungskonzept'),activity('A',2,'Entwurf & Fachplanung')],
        parallel:'Die Kulinarik- und Betriebsplanung konkretisiert Küche, Service und Teamabläufe.'
      },
      {
        id:'detail',tag:'04 / INVESTITION & BAUAUFTRAG',
        title:'Planung wird<br><em>zur Investition.</em>',
        copy:'Grundstück, Bau und Ausstattung brauchen eine eigene Kalkulation. G2 verbindet die erforderlichen Genehmigungen mit einem tragfähigen Investitionsbudget für den ersten festen Standort.',
        cue:'Kosten neu kalkulieren und die Bauinvestition an G2 prüfen',
        period:'01.09.2027–30.09.2027',
        tasks:['Pavillon, Grundstück und Betriebsvoraussetzungen neu kalkulieren','Bauauftrag nur nach Genehmigungs- und Investitionsprüfung freigeben'],
        result:'G2 am 30.09.2027: bedingte Bauinvestition für Florida. Ein zweiter Standort ist nicht mitfinanziert.',
        laneIds:[2,1],
        imageAction:'Konstruktion, Ausstattung und Versorgungswege ergänzen den Grundriss; die Investitionsentscheidung bleibt als Prüfpunkt sichtbar.',
        activities:[activity('A',2,'Kosten & Vergabe'),activity('A',2,'Bauinvestition 30.09.27','Bauinvestition / G2')],
        parallel:'Genehmigungen und Grundstückssicherung bleiben Voraussetzungen für die Bauentscheidung.'
      },
      {
        id:'build',tag:'05 / BAU & INBETRIEBNAHME',
        title:'Erst fertigstellen.<br><em>Dann Gäste empfangen.</em>',
        copy:'Tragwerk, Glasfassade und Ausstattung machen den Entwurf nutzbar. Auf den Bau folgen Abnahmen und Probebetrieb. Erst danach finden die Pilot-Dinner im eigenen Pavillon statt.',
        cue:'Eigenen Pavillon bauen, abnehmen und für Piloten freigeben',
        period:'01.11.2027–30.09.2028',
        tasks:['Festes Gebäude und Ausstattung fertigstellen','Abnahmen, Betriebsfreigaben und Probebetrieb vor den Piloten abschließen'],
        result:'G3 am 30.09.2028: Pilotfreigabe nur bei fertigem, freigegebenem Pavillon und vorbereitetem Team.',
        laneIds:[2,1,3],
        imageAction:'Sockel, Tragwerk und Verglasung werden zum festen Gebäude; Abnahmen schließen die Bauphase ab.',
        activities:[activity('A',2,'Bau & Ausstattung'),activity('A',2,'Abnahme & Probebetrieb'),activity('A',2,'Betriebsbereit 30.09.28','Betriebsbereitschaft / G3')],
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
        laneIds:[3,2,4],
        imageAction:'Die Küche leuchtet auf; Servicewege verbinden sie mit den zehn Tischen. Der Testservice prüft die Wege vor dem Gästebetrieb.',
        activities:[activity('A',3,'Kulinarikpartner & Menü'),activity('A',3,'Abläufe & Team'),activity('A',3,'Schulung & Testservice')],
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
        laneIds:[5,3,4],
        imageAction:'Vier Pilotpunkte verbinden sich; der feste Florida-Pavillon wechselt in den Dinnerbetrieb.',
        activities:pilots('A'),
        parallel:'Rückmeldungen fließen nach jedem Abend in Menü, Service und Betrieb ein.'
      },
      {
        id:'operate',tag:'08 / BETRIEB & AUSBAUPERSPEKTIVE',
        title:'Ein Konzept.<br><em>Zwei feste Standorte.</em>',
        copy:'Florida liefert die Erfahrung für den langfristigen Ausbau nach Texas. Dort soll ein zweiter fester Pavillon entstehen. Standortprüfung und Investitionsfreigabe beginnen mit einem eigenen Projekt.',
        cue:'Florida-Betrieb prüfen und Texas als getrennte Ausbauentscheidung zeigen',
        period:'ab 07/2029 · Ausbau langfristig',
        tasks:['Pilotnachweise und tatsächliche Betriebskosten für G4 auswerten','Florida-Betrieb nur nach tragfähigem Nachweis freigeben','Texas erst mit eigenem Standort, Genehmigungen und zusätzlicher Investitionsfreigabe verfolgen'],
        result:'G4 am 31.07.2029: Betriebs- und Ausbauprüfung. Texas ist eine bedingte Perspektive, keine bereits terminierte Eröffnung.',
        laneIds:[6,5],
        imageAction:'Der feste Florida-Standort bleibt im Betrieb sichtbar. Eine getrennte zweite Standortperspektive erscheint als offener Prüfpunkt, ohne Umzug des Gebäudes.',
        activities:[activity('A',5,'Pilot-Auswertung'),activity('A',6,'Betriebs- & Ausbauprüfung'),activity('A',6,'Betriebsentscheidung 31.07.29','Betriebs- und Ausbauprüfung / G4'),activity('A',6,'Betrieb Florida (bedingt)')],
        parallel:'Zwei Standorte bedeuten zwei eigenständige feste Bauten; die zweite Investition wird separat geprüft.'
      }
    ]
  };
  phases.A.forEach((phase,index)=>{
    phase.at=at[index]; phase.point=points[index]; phase.world=phase.id; phase.index=index;
  });
  window.PitchRoadmapPhases=phases;
})();
