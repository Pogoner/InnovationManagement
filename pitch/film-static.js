/* Settled, sequential core graphics for reduced motion. The film creates these
 * lazily; this helper owns no event listeners, animation frames or scroll state. */
(() => {
  'use strict';
  let sequenceNumber = 0;
  const supported = new Set([3, 4, 5]);
  const fragmentURL = /url\(\s*(['"]?)#([^\s)'"\u005c]+)\1\s*\)/g;
  const idReferences = new Set(['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns', 'aria-activedescendant', 'headers', 'for']);
  const phaseSelectors = {
    3: ['.fa-radar-labels', '.fa-trend-grid, .fa-trend-key', '[data-stufen-phase="0"]', '[data-stufen-phase="1"]', '.fa-matrix-phase', '.fa-selection-final'],
    4: ['.fa-cases-phase', '.fa-score-phase', '.fa-revenue-phase'],
    5: ['[data-fe-layout]', '[data-fe-panorama]', '[data-fe-price]', '[data-fe-marketing]']
  };

  function describePhase(art, chapter, index, beat) {
    const labels = [];
    art.querySelectorAll(phaseSelectors[chapter.step][index]).forEach(group => {
      group.querySelectorAll('text').forEach(text => {
        labels.push(Array.from(text.childNodes).map(node => node.textContent).join(' ').replace(/\s+/g, ' ').trim());
      });
    });
    const description = `${beat.cue}. ${beat.copy} ${labels.join('. ')}`;
    const image = art.querySelector('[role="img"]');
    if (image) {
      image.removeAttribute('aria-labelledby');
      image.setAttribute('aria-label', description);
    }
    art.querySelectorAll('svg > title').forEach(title => { title.textContent = description; });
  }

  function replaceURLs(value, ids) {
    return value.replace(fragmentURL, (original, quote, id) => ids.has(id) ? `url(#${ids.get(id)})` : original);
  }

  // A few paints are declared in the shared CSS rather than SVG attributes.
  // Copy only those declarations, scoped to this one art element, so every
  // cloned scene uses its own definitions even when the film stage is hidden.
  function paintRules(rules, ids, scope) {
    let output = '';
    for (const rule of Array.from(rules || [])) {
      if (rule.style && rule.selectorText) {
        const declarations = [];
        for (const property of Array.from(rule.style)) {
          const value = rule.style.getPropertyValue(property);
          const next = replaceURLs(value, ids);
          if (next !== value) declarations.push(`${property}:${next}${rule.style.getPropertyPriority(property) ? ' !important' : ''}`);
        }
        if (declarations.length) output += `#${scope} :is(${rule.selectorText}){${declarations.join(';')}}\n`;
      } else if (rule.cssRules) {
        const nested = paintRules(rule.cssRules, ids, scope);
        if (nested) output += `${rule.cssText.slice(0, rule.cssText.indexOf('{'))}{${nested}}\n`;
      }
    }
    return output;
  }

  function namespaceArt(art, prefix) {
    const ids = new Map();
    art.querySelectorAll('[id]').forEach(node => {
      const original = node.id;
      const replacement = `${prefix}-${original}`;
      ids.set(original, replacement);
      node.id = replacement;
    });
    art.querySelectorAll('*').forEach(node => {
      for (const attribute of Array.from(node.attributes)) {
        let next = replaceURLs(attribute.value, ids);
        if ((attribute.localName === 'href') && next.startsWith('#') && ids.has(next.slice(1))) next = `#${ids.get(next.slice(1))}`;
        if (idReferences.has(attribute.name)) next = next.split(/\s+/).map(id => ids.get(id) || id).join(' ');
        if (next !== attribute.value) {
          if (attribute.namespaceURI) node.setAttributeNS(attribute.namespaceURI, attribute.name, next);
          else node.setAttribute(attribute.name, next);
        }
      }
      if (node.localName === 'style') node.textContent = replaceURLs(node.textContent, ids);
    });
    let styles = '';
    for (const sheet of Array.from(document.styleSheets)) {
      try { styles += paintRules(sheet.cssRules, ids, art.id); }
      catch (_) { /* Only local, readable stylesheets supply the site's paints. */ }
    }
    if (styles) {
      const style = document.createElement('style');
      style.textContent = styles;
      art.prepend(style);
    }
  }

  function create(chapter, scene, stillPoints, context = {}) {
    if (!supported.has(Number(chapter?.step)) || !scene?.markup || !scene?.mount) return null;
    if (!Array.isArray(stillPoints) || stillPoints.length !== chapter.beats.length) throw new Error('Static pitch: every story beat needs its settled graphic.');

    const prefix = `film-static-${chapter.step}-${++sequenceNumber}`;
    const element = document.createElement('section');
    element.className = 'film-static-sequence';
    element.dataset.staticStep = chapter.step;
    element.setAttribute('aria-labelledby', `${prefix}-heading`);
    const header = document.createElement('header');
    header.className = 'film-static-intro';
    const meta = document.createElement('p');
    meta.className = 'film-static-meta';
    meta.textContent = `PART ${String(chapter.step).padStart(2, '0')} / ROCKETLIGHT`;
    const heading = document.createElement('h2');
    heading.id = `${prefix}-heading`;
    heading.textContent = chapter.label;
    header.append(meta, heading);
    element.append(header);

    let currentContext = {...context, reduced: false};
    const renderers = [];
    const phases = chapter.beats.map((beat, index) => {
      const phasePrefix = `${prefix}-${index + 1}`;
      const figure = document.createElement('figure');
      figure.className = 'film-static-shot';
      figure.dataset.staticPhase = index;
      figure.setAttribute('aria-labelledby', `${phasePrefix}-title`);
      const caption = document.createElement('figcaption');
      caption.className = 'film-static-caption';
      const tag = document.createElement('p');
      tag.className = 'eyebrow';
      tag.textContent = beat.tag;
      const title = document.createElement('h3');
      title.id = `${phasePrefix}-title`;
      title.innerHTML = beat.title;
      const copy = document.createElement('p');
      copy.className = 'film-static-copy';
      copy.textContent = beat.copy;
      caption.append(tag, title, copy);

      const diagram = document.createElement('div');
      diagram.className = 'film-static-diagram';
      const scroller = document.createElement('div');
      scroller.className = 'film-static-scroll';
      const art = document.createElement('div');
      art.className = 'film-static-art';
      art.id = `${phasePrefix}-art`;
      art.innerHTML = scene.markup();
      namespaceArt(art, phasePrefix);
      describePhase(art, chapter, index, beat);
      if (chapter.step === 5 && index === 1) {
        const image = document.createElement('img');
        image.className = 'film-static-photo';
        image.src = context.diningImage || 'assets/dining-panorama.webp';
        image.alt = '';
        image.setAttribute('aria-hidden', 'true');
        image.loading = 'lazy';
        image.width = 1672;
        image.height = 941;
        art.prepend(image);
      }
      scroller.append(art);
      diagram.append(scroller);
      if (chapter.step === 3 || chapter.step === 4) {
        diagram.classList.add('is-dense');
        scroller.tabIndex = 0;
        scroller.setAttribute('role', 'region');
        scroller.setAttribute('aria-label', beat.cue);
        scroller.setAttribute('aria-describedby', `${phasePrefix}-hint`);
        const hint = document.createElement('p');
        hint.className = 'film-static-scroll-hint';
        hint.id = `${phasePrefix}-hint`;
        hint.textContent = 'Grafik seitlich verschieben · auch mit den Pfeiltasten';
        diagram.append(hint);
      }
      figure.append(caption, diagram);
      element.append(figure);
      const renderer = scene.mount(art);
      renderer.update(stillPoints[index], currentContext);
      renderers.push({renderer, point: stillPoints[index]});
      return figure;
    });

    function updateContext(next) {
      currentContext = {...currentContext, ...next, reduced: false};
      renderers.forEach(({renderer, point}) => renderer.update(point, currentContext));
    }
    return {
      element,
      headingId: heading.id,
      phases,
      updateVariant(variant) { updateContext({variant}); },
      updateContext
    };
  }
  window.PitchStatic = {create};
})();
