/* A single media clock for the launch picture, sound and scroll timeline. */
(() => {
  'use strict';
  const clamp = value => Math.min(1, Math.max(0, Number(value) || 0));
  const smooth = (a, b, value) => { const p = clamp((value - a) / (b - a)); return p * p * (3 - 2 * p); };
  const timeLabel = seconds => `${Math.floor(Math.max(0, seconds) / 60)}:${String(Math.floor(Math.max(0, seconds) % 60)).padStart(2, '0')}`;

  window.PitchLaunch = {
    mount(root, options = {}) {
      const stage = root?.matches?.('.launch-stage') ? root : root?.querySelector?.('.launch-stage');
      if (!stage) return {update: value => clamp(value), destroy() {}};
      if (stage._launchCinemaController) return stage._launchCinemaController;
      const cinema = document.createElement('div');
      cinema.className = 'launch-cinema';
      cinema.setAttribute('aria-hidden', 'true');
      const video = document.createElement('video');
      video.className = 'launch-video';
      video.poster = options.poster || 'assets/starship-launch-poster.jpg';
      video.preload = 'none';
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.muted = true;
      video.defaultMuted = true;
      video.volume = .8;
      video.disablePictureInPicture = true;
      video.tabIndex = -1;
      cinema.append(video);
      stage.prepend(cinema);
      stage.classList.add('has-video-launch');
      const controls = {
        play: stage.querySelector('#launch-button'),
        replay: stage.querySelector('#launch-replay'),
        sound: stage.querySelector('#launch-sound'),
        timeline: stage.querySelector('#launch-timeline'),
        time: stage.querySelector('#launch-time'),
        status: stage.querySelector('#launch-status')
      };
      let mode = 'scroll', reduced = document.body.classList.contains('is-reduced');
      let duration = 27, desired = 0, raw = 0, previousRaw = null, anchor = null;
      let loaded = false, failed = false, waiting = false, destroyed = false;
      let visible = false, near = false, lastStatus = '', playRequest = 0;
      const removers = [];
      const on = (node, name, callback, options) => {
        if (!node) return;
        node.addEventListener(name, callback, options);
        removers.push(() => node.removeEventListener(name, callback, options));
      };
      const endTime = () => Math.max(0, duration - 1 / 30);
      const mediaProgress = () => clamp(video.currentTime / Math.max(.001, endTime()));
      const effectiveProgress = () => mode === 'playing' ? mediaProgress() : desired;
      const changed = () => { if (!destroyed) document.dispatchEvent(new CustomEvent('pitch:launchchange')); };
      function load() {
        if (loaded || destroyed) return;
        loaded = true;
        video.preload = 'auto';
        video.src = options.src || 'assets/starship-launch-27s.mp4';
        video.load();
      }
      function seek() {
        if (!loaded || !video.readyState || mode === 'playing' || video.seeking || failed) return;
        const target = desired * endTime();
        if (Math.abs(video.currentTime - target) > .025) {
          try { video.currentTime = target; } catch (_) { /* Metadata will retry the pending target. */ }
        }
      }
      function mapped(value) {
        if (!anchor) return value;
        const {scroll, progress} = anchor;
        if (value < scroll) return scroll > 0 ? progress * value / scroll : 0;
        return scroll < 1 ? progress + (1 - progress) * (value - scroll) / (1 - scroll) : 1;
      }
      function hold() {
        if (mode === 'playing') desired = mediaProgress();
        anchor = {scroll: raw, progress: desired};
        mode = 'paused';
        playRequest++;
        video.pause();
        waiting = false;
      }
      function render() {
        const p = effectiveProgress();
        const isPlaying = mode === 'playing';
        const complete = p >= .999 && !isPlaying;
        const state = failed ? 'error' : complete ? 'complete' : mode;
        stage.dataset.launchMode = state;
        stage.dataset.launchReduced = String(reduced);
        stage.dataset.filmFlight = p > .16 ? 'ignited' : 'ready';
        stage.dataset.launchPhase = p < .16 ? 'ready' : p < .43 ? 'ignition' : p < .8 ? 'ascent' : 'climax';
        stage.classList.toggle('is-launch-playing', isPlaying);
        stage.classList.toggle('is-launch-loading', !failed && (near || isPlaying) && loaded && (video.readyState < 2 || waiting));
        stage.classList.toggle('is-launch-error', failed);
        stage.style.setProperty('--launch-film-progress', p.toFixed(4));
        // The heading leaves the image to the actual ignition and ascent.
        stage.style.setProperty('--launch-copy-opacity', (1 - smooth(.035, .16, p)).toFixed(4));
        if (controls.play) {
          controls.play.textContent = isPlaying ? 'Film pausieren' : complete ? 'Film erneut abspielen' : p > .01 ? 'Film fortsetzen' : 'Film abspielen';
          controls.play.setAttribute('aria-pressed', String(isPlaying));
          controls.play.disabled = failed;
        }
        if (controls.replay) controls.replay.disabled = failed;
        if (controls.sound) {
          controls.sound.textContent = video.muted ? 'Ton einschalten' : 'Ton ausschalten';
          controls.sound.setAttribute('aria-pressed', String(!video.muted));
        }
        if (controls.timeline) {
          controls.timeline.value = String(Math.round(p * 1000));
          controls.timeline.setAttribute('aria-valuetext', `${timeLabel(p * duration)} von ${timeLabel(duration)}`);
          controls.timeline.disabled = failed;
        }
        if (controls.time) controls.time.textContent = `${timeLabel(p * duration)} / ${timeLabel(duration)}`;
        const phase = p < .16 ? 'Bereit zum Start.' : p < .43 ? 'Zündung.' : p < .8 ? 'Liftoff.' : 'Ein neuer Horizont.';
        const status = failed ? 'Der Film konnte nicht geladen werden. Bitte die Seite neu laden.' :
          isPlaying ? (waiting ? 'Film lädt …' : `${phase} Film läuft${video.muted ? ' ohne Ton' : ' mit Sounddesign'}.`) :
          complete ? 'Der Start ist abgeschlossen. Das letzte Filmbild bleibt stehen.' :
          mode === 'paused' ? 'Film pausiert. Abspielen oder weiterscrollen.' :
          reduced ? 'Ruhige Darstellung. Du kannst den Film bewusst abspielen.' : `${phase} Scrollen oder den Film abspielen.`;
        if (controls.status && status !== lastStatus) { controls.status.textContent = status; lastStatus = status; }
        return p;
      }
      async function play(restart = false) {
        if (failed || destroyed) return;
        load();
        const p = effectiveProgress();
        if (restart || p >= .999) desired = 0;
        else desired = p;
        anchor = {scroll: raw, progress: desired};
        // Queue the chosen frame before play; this also works while metadata loads.
        if (video.readyState) video.currentTime = desired * endTime();
        mode = 'playing';
        waiting = video.readyState < 3;
        const request = ++playRequest;
        render(); changed();
        try {
          await video.play();
          // An older play promise must not interrupt a newer user-initiated play.
          if (destroyed || mode !== 'playing') video.pause();
        } catch (_) {
          if (destroyed || request !== playRequest) return;
          hold();
          render(); changed();
        }
      }
      function pause() { hold(); render(); changed(); }
      function setMuted(value) { video.muted = Boolean(value); render(); changed(); }
      const controller = {
        update(value, context = {}) {
          if (destroyed) return desired;
          const nextRaw = clamp(value);
          const nextReduced = Boolean(context.reduced);
          const scrollChanged = previousRaw !== null && Math.abs(nextRaw - previousRaw) > .00001;
          visible = context.visible ?? visible;
          near = context.near ?? visible;
          if (near) load();
          if (mode === 'playing' && (document.hidden || !visible || (nextReduced && !reduced))) hold();
          if (scrollChanged && !nextReduced) {
            if (mode === 'playing') hold();
            mode = 'scroll';
            desired = clamp(mapped(nextRaw));
            if (nextRaw === 0 || nextRaw === 1) anchor = null;
          } else if (mode === 'scroll' && !nextReduced && !anchor) desired = nextRaw;
          raw = nextRaw;
          previousRaw = nextRaw;
          reduced = nextReduced;
          // In reduced motion the poster / chosen still stays put. Playback is opt-in.
          if (mode !== 'playing') seek();
          return render();
        },
        play: () => play(),
        pause,
        restart: () => play(true),
        setMuted,
        getProgress: effectiveProgress,
        destroy() {
          destroyed = true;
          playRequest++;
          video.pause();
          removers.forEach(remove => remove());
          delete stage._launchCinemaController;
        }
      };
      on(controls.play, 'click', () => mode === 'playing' ? pause() : play());
      on(controls.replay, 'click', () => play(true));
      on(controls.sound, 'click', () => setMuted(!video.muted));
      on(controls.timeline, 'input', () => {
        hold();
        desired = clamp(Number(controls.timeline.value) / 1000);
        anchor = {scroll: raw, progress: desired};
        load(); seek(); render(); changed();
      });
      on(video, 'loadedmetadata', () => {
        if (Number.isFinite(video.duration) && video.duration > 0) duration = video.duration;
        if (mode === 'playing') video.currentTime = desired * endTime();
        else seek();
        render(); changed();
      });
      on(video, 'loadeddata', () => { seek(); render(); changed(); });
      on(video, 'seeked', () => { seek(); render(); changed(); });
      on(video, 'timeupdate', () => { render(); changed(); });
      on(video, 'waiting', () => { waiting = mode === 'playing'; render(); changed(); });
      on(video, 'playing', () => { waiting = false; render(); changed(); });
      on(video, 'canplay', () => { waiting = false; render(); changed(); });
      on(video, 'pause', () => {
        if (mode === 'playing' && video.paused && !video.ended) pause();
      });
      on(video, 'ended', () => {
        desired = 1;
        mode = 'paused';
        anchor = {scroll: raw, progress: 1};
        waiting = false;
        render(); changed();
      });
      on(video, 'error', () => {
        failed = true;
        hold(); render(); changed();
      });
      on(document, 'visibilitychange', () => { if (document.hidden && mode === 'playing') pause(); });
      stage._launchCinemaController = controller;
      render();
      return controller;
    }
  };
})();
