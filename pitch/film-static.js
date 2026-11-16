/* Settled, sequential core graphics for reduced motion. The film creates these
 * lazily; this helper owns no event listeners, animation frames or scroll state. */
(() => {
  'use strict';
  let sequenceNumber = 0;
  const supported = new Set([1, 2, 3, 4, 5, 7, 8]);
  const fragmentURL = /url\(\s*(['"]?)#([^\s)'"\u005c]+)\1\s*\)/g;
  const idReferences = new Set(['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns', 'aria-activedescendant', 'headers', 'for']);
  const phaseSelectors = {
    1: ['.fa-mission', '[data-flow-panel="facts"]'],
    2: ['.fa-hube-rows'],
    3: ['.fa-radar-labels', '.fa-trend-grid, .fa-trend-key', '[data-stufen-phase="0"]', '[data-stufen-phase="1"]', '.fa-matrix-phase', '.fa-selection-final'],
    4: ['.fa-cases-phase', '.fa-score-phase', '.fa-revenue-phase'],
    5: ['[data-fe-layout]', '[data-fe-panorama]', '[data-fe-price]', '[data-fe-marketing]'],
    7: ['.fe-engine-label', '.fe-engine-label', '.fe-engine-label', '.fe-engine-label, .fe-system-foundation'],
    8: ['[data-fq-panel="0"]', '[data-fq-panel="1"]', '[data-fq-panel="2"]']
  };

  function phaseGroups(art, chapter, index, beat) {
    const selector = beat.view || phaseSelectors[chapter.step]?.[index];
    if (!selector) return [];
    try { return Array.from(art.querySelectorAll(selector)); }
    catch (_) { return []; }
  }

  const normalized = value => String(value || '').replace(/\s+/g, ' ').trim();
  const isHTML = node => node.namespaceURI === 'http://www.w3.org/1999/xhtml';

  function describePhase(art, groups, beat) {
    const roots = groups.filter(group => !groups.some(other => other !== group && other.contains(group)));
    const labels = roots.flatMap(group => {
      if (!isHTML(group)) {
        return (group.matches('text') ? [group] : Array.from(group.querySelectorAll('text')))
          .map(text => normalized(text.textContent));
      }
      const copy = group.cloneNode(true);
      copy.querySelectorAll('style, script, defs, title, [aria-hidden="true"], [hidden]').forEach(node => node.remove());
      const text = [];
      const walker = document.createTreeWalker(copy, 4);
      while (walker.nextNode()) text.push(walker.currentNode.textContent);
      return [normalized(text.join(' '))];
    });
    const description = Array.from(new Set([beat.cue, beat.copy, ...labels].map(normalized).filter(Boolean))).join('. ');
    art.setAttribute('role', 'group');
    art.setAttribute('aria-label', normalized(beat.cue));
    art.setAttribute('aria-description', description);
    art.querySelectorAll('[role="img"], [role="group"]').forEach(image => {
      if (roots.length && !roots.some(group => image.contains(group) || group.contains(image))) return;
      image.removeAttribute('aria-labelledby');
      // HTML methods keep their headings, lists and links in the accessibility tree.
      const htmlPanel = roots.some(group => isHTML(group) && image.contains(group));
      if (htmlPanel && image.getAttribute('role') === 'img') image.setAttribute('role', 'group');
      image.setAttribute('aria-label', htmlPanel ? normalized(beat.cue) : description);
    });
    art.querySelectorAll('svg > title').forEach(title => { title.textContent = description; });
  }

  function settleHTML(art, groups) {
    const panels = groups.filter(isHTML);
    if (!panels.length) return;
    const branches = new Set([art]);
    panels.forEach(panel => {
      panel.classList.add('film-static-panel');
      panel.setAttribute('aria-hidden', 'false');
      for (let parent = panel.parentElement; parent && parent !== art; parent = parent.parentElement) {
        parent.classList.add('film-static-flow');
        branches.add(parent);
      }
    });
    branches.forEach(branch => Array.from(branch.children).forEach(child => {
      if (child.matches('style, defs') || panels.some(panel => child === panel || child.contains(panel) || panel.contains(child))) return;
      child.classList.add('film-static-inactive');
    }));
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
    meta.textContent = `PART ${String(chapter.step).padStart(2, '0')} / ROCKETLIGHT · ZEITRAHMEN ${Math.floor(chapter.seconds/60)}:${String(chapter.seconds%60).padStart(2,'0')} MIN`;
    const heading = document.createElement('h2');
    heading.id = `${prefix}-heading`;
    heading.textContent = chapter.label;
    header.append(meta, heading);
    element.append(header);

    let currentContext = {...context, reduced: false, static: true, mobile: false};
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
      const groups = phaseGroups(art, chapter, index, beat);
      namespaceArt(art, phasePrefix);
      const html = groups.some(isHTML);
      if (html) [figure, diagram, art].forEach(node => node.classList.add('is-html'));
      if (chapter.step === 5 && beat.art === 'panorama') {
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
      if (!html && (beat.dense ?? [2, 3, 4].includes(chapter.step))) {
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
      const shot = {renderer, point: stillPoints[index], art, groups, beat};
      renderShot(shot);
      renderers.push(shot);
      return figure;
    });

    function renderShot({renderer, point, art, groups, beat}) {
      renderer.update(point, currentContext);
      settleHTML(art, groups);
      describePhase(art, groups, beat);
      art.getAnimations?.({subtree: true}).forEach(animation => animation.cancel());
    }

    function updateContext(next) {
      currentContext = {...currentContext, ...next, reduced: false, static: true, mobile: false};
      renderers.forEach(renderShot);
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
