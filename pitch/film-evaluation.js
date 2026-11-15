/* Part 08: editorial evaluation of the methods actually used in the project.
 * Source limitations are preserved; proposed checks are not completed evidence.
 * The shared film controller supplies progress. No timer or private RAF. */
(() => {
  'use strict';
  const scenes = window.PitchScenes = window.PitchScenes || {};
  const clamp = value => Math.max(0, Math.min(1, Number(value) || 0));
  const smooth = (start, end, value) => {
    const t = clamp((value - start) / (end - start));
    return t * t * (3 - 2 * t);
  };
  const n = value => Number(value.toFixed(4));
  const set = (node, property, value) => node.style.setProperty(property, String(value));
  const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

  const methods = [
    {
      part: '02', name: 'Innovationsprüfstand',
      contribution: 'Neuheit, Reife & Nutzen',
      limitation: 'Nullfaktor maskiert Teilstärken',
      complement: 'TRL + Nutzenprofil',
      detail: 'Das multiplikative Modell macht die Bewertungslogik explizit. Ein einzelner Nullfaktor setzt jedoch das gesamte Ergebnis auf null. Bei Starlink bewertet das Team den Nutzen mit 4 und den Reifegrad mit 0; das Produkt 0 beschreibt daher keinen fehlenden Nutzen. Die drei Starship-Technologien gehören zudem zu einem System, ihre Nutzen dürfen nicht einfach addiert werden.',
      next: 'Technische Reife anhand dokumentierter Nachweise separat mit Technology Readiness Levels (TRL) prüfen; Neuheit und Nutzen als eigenständiges Profil erhalten. Der Vorschlag vergibt keine neuen TRL-Werte.',
      sources: [{label:'Part 2 · Originalarbeitsmappe',url:'../quellen/step-2-innovation-assessment.xlsx'},{label:'NASA · Technology Readiness Levels',url:'https://www.nasa.gov/directorates/somd/space-communications-navigation-program/technology-readiness-levels/'}]
    },
    {
      part: '03', name: 'Trendportfolio + Ideenmatrix',
      contribution: '8 Trends → Ideenprioritäten',
      limitation: '5/5 ist kein Marktnachweis',
      complement: 'Szenarien + Hypothesentests',
      detail: 'Portfolio, Stufenmodell und Now/How/Wow-Matrix strukturieren die Suche. Die Koordinaten bleiben Einschätzungen; alle acht Trends liegen im Handlungsfeld. Die Höchstwertung 5/5 für RocketLight belegt weder Nachfrage noch genehmigte Machbarkeit. Die Dreierauswahl ist eine weitere Projektentscheidung; RocketLight stammt aus Open Innovation.',
      next: 'Alternative Zukunftsszenarien und veränderte Bewertungen vergleichen. Die kritischen Annahmen jeder favorisierten Idee in konkrete Hypothesen, Tests, Messgrößen und vorab definierte Erfolgsschwellen übersetzen.',
      sources: [{label:'Part 3 · Originalarbeitsmappe',url:'../quellen/step-3-trend-portfolio.xlsx'},{label:'Strategyzer · Test Card',url:'https://www.strategyzer.com/library/validate-your-ideas-with-the-test-card'}]
    },
    {
      part: '04', name: 'Inno-Rendite + Finanzmodell',
      contribution: 'Nutzen/Aufwand vergleichen',
      limitation: 'Rang hängt an Annahmen',
      complement: 'Sensitivität + Cashflow',
      detail: 'Die Innovationsrendite ist ein gewichteter Bewertungsscore, keine finanzielle Rendite. RocketLight erreicht im Team 1,83 und bei der KI 0,73, vor allem durch den unterschiedlich geschätzten Aufwand. Der Gewinnindikator überträgt die operative Marge des Kerngeschäfts Space + Connectivity und ersetzt keine Projekt-GuV. Variante B besitzt keine eigene konsistente Jahresrechnung.',
      next: 'Gewichte und zentrale Annahmen variieren und die Stabilität der Rangfolge prüfen. Eine eigenständige Projekt-GuV und Liquiditätsrechnung mit Vollkosten, Startausfällen und Nachfrageszenarien ergänzen; A und B separat kalkulieren.',
      sources: [{label:'Part 4 · RocketLight-Kalkulation',url:'../quellen/step-4-rocketlight.xlsm'},{label:'Part 4 · Insights-Kalkulation',url:'../quellen/step-4-starlink-insights.xlsm'},{label:'Part 4 · Cloud-Kalkulation',url:'../quellen/step-4-launch-engineering-cloud.xlsm'}]
    },
    {
      part: '05', name: '5P-Marketingmix',
      contribution: 'Angebot & Marktzugang',
      limitation: 'Preis bleibt eine Hypothese',
      complement: 'Test Card + bezahlter Pilot',
      detail: 'Der Mix stimmt Kunden, Produkt, Preis, Ort und Kommunikation aufeinander ab. Persona, Zugangskanäle und Zahlungsbereitschaft sind zunächst Konzeptannahmen. Der vorgesehene Pilotpreis von 35.000 USD und der spätere Zielpreis bis 50.000 USD je Gast sind noch kein beobachtetes Kaufverhalten.',
      next: 'Kundeninterviews zur Schärfung der Bedürfnisse mit beobachtbaren Buchungen im bezahlten Pilot ergänzen. Eine Test Card legt Hypothese, Versuch, Messgröße und Erfolgsschwelle vor dem Test fest.',
      sources: [{label:'Part 5 · Originalarbeitsmappe',url:'../quellen/step-5-marketing-mix.xlsx'},{label:'Strategyzer · Test Card',url:'https://www.strategyzer.com/library/validate-your-ideas-with-the-test-card'}]
    },
    {
      part: '06', name: 'Roadmap / Maßnahmenplan',
      contribution: 'Arbeitspakete & Termine',
      limitation: 'Termine sind keine Freigaben',
      complement: 'Risikoregister + Abhängigkeiten',
      detail: 'Die Roadmap verbindet Teilprojekte, Verantwortungen, Budget und geplante Gates. Die Zeitachse ist jedoch kein Nachweis erteilter Genehmigungen, verbindlicher Starttermine oder gesicherter Partner. Standort, Sichtlinie, Zugang und der Ablauf bei Startverschiebung bleiben zu bestätigen.',
      next: 'Kritische Abhängigkeiten und Puffer explizit führen. Im Risikoregister je Unsicherheit Auswirkung, Maßnahme, Verantwortung und Prüftermin festhalten; Gates nur mit dokumentiertem Nachweis passieren.',
      sources: [{label:'Part 6 · Roadmap A',url:'../praesentation/Part6_Roadmap_RocketLightDinner_A_Mobiler-Pavillon.pptx'},{label:'Part 6 · Roadmap B',url:'../praesentation/Part6_Roadmap_RocketLightDinner_B_Lounge-Titusville.pptx'}]
    },
    {
      part: '07', name: 'Innovationsmanagement',
      contribution: 'Vier Handlungsfelder',
      limitation: 'Wirkung bislang ungemessen',
      complement: 'Rollenmatrix + Reviewziele',
      detail: 'Die Analyse von sechs Feldern und die vier Empfehlungen verbinden Struktur, Prozesse, Kultur und Kompetenzen. Die Projektbewertung bleibt eine Außenperspektive; eine Empfehlung allein belegt weder Umsetzung noch Wirkung.',
      next: 'Mit internen Interviews und nachvollziehbaren Prozessdaten abgleichen. Eine Rollenmatrix legt Verantwortung fest; wenige messbare Ziele und regelmäßige Reviews zeigen, ob die Veränderungen tatsächlich greifen.',
      sources: [{label:'Part 7 · Empfehlungen',url:'../quellen/step-1-7-company-recommendations.pptx'}]
    }
  ];

  const gates = [
    {label:'Nachfrage',assumption:'35.000 USD je Gast',test:'Bezahlter Pilot',measure:'Buchungen · Storno · Kundenfeedback'},
    {label:'Betrieb',assumption:'Start als Höhepunkt',test:'Standort- & Ablaufprüfung',measure:'Sichtlinien · Zugang · Ersatzablauf'},
    {label:'Wirtschaftlichkeit',assumption:'90 % Auslastung nach Pilot',test:'Szenarien + Projekt-Cashflow',measure:'Vollkosten · Ausfälle · Liquidität'}
  ];

  // An editorial test proposal derived from the existing 5P review. No target
  // value or completed customer evidence is implied by this example.
  const pilotMethod = methods.find(method => method.part === '05');
  const pilotTest = {
    title: 'Werden aus Interesse Buchungen?',
    steps: [
      {label:'Annahme',copy:'Zielgäste buchen das Pilot-Erlebnis für 35.000 USD je Gast.'},
      {label:'Test',copy:'Vorgeschlagener bezahlter Pilot; Kundeninterviews schärfen zuvor das Bedürfnis.'},
      {label:'Messung',copy:gates[0].measure},
      {label:'Entscheidung',copy:'Ergebnisse mit vorab festgelegten Erfolgsschwellen vergleichen: freigeben, anpassen oder stoppen.'}
    ],
    threshold:'Erfolgsschwellen vor dem Test festlegen. Ein belastbarer Zielwert ist noch offen.',
    source:pilotMethod.sources.find(source => source.label === 'Strategyzer · Test Card')
  };

  function testCardMarkup() {
    return `<div class="fq-panel fq-test-card" data-fq-panel="2">
      <header class="fq-panel-heading"><span>VORGESCHLAGENE TESTKARTE · NACHFRAGE</span><h3>${escape(pilotTest.title)}</h3></header>
      <ol class="fq-test-steps">${pilotTest.steps.map((step,index)=>`<li class="fq-test-step" data-fq-test-step="${index}">
        <span class="fq-test-number" aria-hidden="true">0${index+1}</span>
        <div><h4>${escape(step.label)}</h4><p>${escape(step.copy)}</p></div>
      </li>`).join('')}</ol>
      <p class="fq-test-threshold method-attention" data-method-attention="pilot-success-threshold"><strong>Der offene Maßstab</strong>${escape(pilotTest.threshold)}</p>
      <p class="fq-test-source">Redaktioneller Vorschlag · noch nicht durchgeführt.<br><a href="${escape(pilotTest.source.url)}">${escape(pilotTest.source.label)}</a></p>
    </div>`;
  }

  function testCardDetailMarkup() {
    return `<section class="fq-detail-test"><h3>Vorgeschlagene Testkarte: Nachfrage im Pilot</h3><p>${escape(pilotMethod.next)}</p>
      <ol>${pilotTest.steps.map(step=>`<li><strong>${escape(step.label)}:</strong> ${escape(step.copy)}</li>`).join('')}</ol>
      <p><strong>${escape(pilotTest.threshold)}</strong> Die Karte ist eine redaktionelle Konkretisierung; der Test wurde noch nicht durchgeführt.</p>
      <div class="fq-detail-sources"><a href="${escape(pilotTest.source.url)}">${escape(pilotTest.source.label)}</a></div></section>`;
  }

  function methodRows(items) {
    return items.map(method => `<li class="fq-method" data-fq-row>
      <div class="fq-method-name"><span>${method.part}</span><h4>${escape(method.name)}</h4></div>
      <div class="fq-method-cells">
        <p class="fq-contribution"><span class="fq-cell-label">Beitrag</span>${escape(method.contribution)}</p>
        <p class="fq-limitation"><span class="fq-cell-label">Grenze</span>${escape(method.limitation)}</p>
        <p class="fq-complement"><span class="fq-cell-label">Ergänzung</span>${escape(method.complement)}</p>
      </div>
      <div class="fq-row-track" aria-hidden="true"><i></i><b></b></div>
    </li>`).join('');
  }

  function matrixMarkup(items, index, title, note) {
    return `<div class="fq-panel fq-matrix" data-fq-panel="${index}">
      <header class="fq-panel-heading"><span>METHODEN-CHECK ${index+1}/2</span><h3>${title}</h3></header>
      <div class="fq-column-head" aria-hidden="true"><span>BEITRAG</span><span>GRENZE</span><span>ERGÄNZUNG</span></div>
      <ol class="fq-methods">${methodRows(items)}</ol>
      <p class="fq-panel-note">${note}</p>
    </div>`;
  }

  scenes[8] = {
    markup: () => `<div class="fq-scene" aria-label="Strukturierte kritische Methodenevaluation mit vorgeschlagenen ergänzenden Instrumenten">
      ${matrixMarkup(methods.slice(0,3),0,'Was die Auswahl trägt.','Mensch & KI: Abweichungen begründen. Bewertungen nicht zu scheinbarer Gewissheit mitteln.')}
      ${matrixMarkup(methods.slice(3),1,'Was die Umsetzung braucht.','Planung schafft Orientierung. Kundenverhalten und Wirkung müssen danach beobachtet werden.')}
      ${testCardMarkup()}
      <div class="fq-panel fq-validation" data-fq-panel="3">
        <header class="fq-panel-heading"><span>NÄCHSTE NACHWEISE</span><h3>Von der Annahme zur Evidenz.</h3></header>
        <div class="fq-validation-legend"><span>ANNAHME</span><svg viewBox="0 0 40 12" aria-hidden="true"><path d="M1 6H38M32 1L38 6 32 11"/></svg><span>VORGESCHLAGENER TEST</span></div>
        <ol class="fq-gates">${gates.map((gate,index)=>`<li class="fq-gate" data-fq-gate="${index}">
          <div class="fq-gate-number" aria-hidden="true">0${index+1}</div>
          <div class="fq-gate-content"><div class="fq-gate-label"><h4>${escape(gate.label)}</h4><span>OFFEN</span></div>
          <div class="fq-gate-pair"><p>${escape(gate.assumption)}</p><span aria-hidden="true">→</span><p>${escape(gate.test)}</p></div>
          <p class="fq-gate-measure">${escape(gate.measure)}</p></div>
        </li>`).join('')}</ol>
        <div class="fq-decision"><svg viewBox="0 0 32 32" aria-hidden="true"><path pathLength="1" d="M16 2 30 16 16 30 2 16Z"/><path d="M10 16H22M17 11 22 16 17 21"/></svg><p><strong>Erst der Nachweis entscheidet.</strong><span>Pilot freigeben · anpassen · stoppen</span></p></div>
        <p class="fq-panel-note">Erfolgsschwellen vorab festlegen. Die Tests sind vorgeschlagen und noch nicht durchgeführt.</p>
      </div>
    </div>`,
    mount(root) {
      const scene = root.querySelector('.fq-scene');
      const panels = Array.from(root.querySelectorAll('[data-fq-panel]'));
      const rows = panels.slice(0,2).map(panel=>Array.from(panel.querySelectorAll('[data-fq-row]')));
      const testSteps = Array.from(root.querySelectorAll('[data-fq-test-step]'));
      const threshold = root.querySelector('.fq-test-threshold');
      const gateRows = Array.from(root.querySelectorAll('[data-fq-gate]'));
      const decision = root.querySelector('.fq-decision');
      let last = '';
      return {
        update(progress, context = {}) {
          const isStatic = Boolean(context.static);
          const p = context.reduced && !isStatic ? 1 : clamp(progress);
          const all = !isStatic && Boolean(context.reduced || context.mobile || document.body.classList.contains('is-reduced'));
          const settled = all || isStatic;
          const key = `${n(p)}|${all}|${isStatic}`;
          if (key === last) return;
          last = key;
          scene.dataset.fqMode = isStatic ? 'static' : all ? 'all' : 'animated';
          const boundaries = [0,.24,.48,.73,1.1];
          panels.forEach((panel,index)=>{
            const enter = index === 0 ? 1 : smooth(boundaries[index]-.014,boundaries[index]+.018,p);
            const leave = index === panels.length-1 ? 1 : 1-smooth(boundaries[index+1]-.014,boundaries[index+1]+.018,p);
            const opacity = enter * leave;
            set(panels[index],'--fq-opacity',all?1:n(opacity));
            set(panels[index],'--fq-shift',settled?'0px':`${n((1-opacity)*16)}px`);
            // Invisible pages leave the accessibility tree; their complete text
            // remains in the main scene during static/reduced presentation.
            const hidden = !all && opacity < .5;
            panel.setAttribute('aria-hidden',String(hidden));
            panel.inert = hidden;
          });
          rows.forEach((group,groupIndex)=>group.forEach((row,index)=>{
            const start=groupIndex*.24+.025+index*.045;
            const trace=settled?1:smooth(start,start+.08,p);
            set(row,'--fq-trace',n(trace));
          }));
          testSteps.forEach((row,index)=>{
            const start=[.49,.54,.585,.63][index];
            set(row,'--fq-trace',settled?1:n(smooth(start,start+.04,p)));
          });
          set(threshold,'--fq-trace',settled?1:n(smooth(.65,.70,p)));
          gateRows.forEach((row,index)=>{
            const trace=settled?1:smooth(.76+index*.055,.84+index*.055,p);
            set(row,'--fq-trace',n(trace));
          });
          set(decision,'--fq-trace',settled?1:n(smooth(.90,.98,p)));
        }
      };
    }
  };

  // A read-only source mapping also supplies the complete HTML dossier. The
  // evaluation is an editorial synthesis, not an absent Part-8 source file.
  window.PitchMethodReview = Object.freeze({
    origin:'Redaktionelle Methodenevaluation auf Basis der Projektunterlagen 2–7; ergänzende Instrumente sind Vorschläge.',
    methods: Object.freeze(methods.map(method=>Object.freeze(method))),
    fullMarkup: () => `<p class="section-note">Redaktionelle Methodenevaluation auf Basis der Projektunterlagen 2–7. Die ergänzenden Instrumente sind Vorschläge; die Prüfungen wurden noch nicht durchgeführt.</p><div class="fq-detail-table-wrap"><table class="fq-detail-table"><caption>Beitrag, Grenzen und alternative Instrumente der verwendeten Methoden</caption><thead><tr><th scope="col">Methode</th><th scope="col">Beitrag und kritische Bewertung</th><th scope="col">Ergänzung / Alternative</th></tr></thead><tbody>${methods.map(method=>`<tr><th scope="row">${escape(method.name)}</th><td>${escape(method.detail)}</td><td>${escape(method.next)}<div class="fq-detail-sources">${method.sources.map(source=>`<a href="${escape(source.url)}">${escape(source.label)}</a>`).join('')}</div></td></tr>`).join('')}</tbody></table></div>${testCardDetailMarkup()}<p class="section-note">Mensch &amp; KI sind zwei Bewertungsperspektiven, keine unabhängigen Marktbelege. Unterschiede werden auf Kriterien, Quellen und Annahmen zurückgeführt; sie werden nicht durch einen Mittelwert verdeckt.</p>`
  });
})();
