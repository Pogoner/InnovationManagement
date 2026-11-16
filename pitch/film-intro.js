/* Opening clip. Manual start, optional sound, frozen last frame, then the quote.
 * Native scrolling stays untouched; the clip pauses when scrolled out of view. */
(() => {
  'use strict';
  const section = document.getElementById('einstieg');
  const video = section?.querySelector('.intro-video');
  if (!section || !video) return;
  const status = document.getElementById('intro-status');
  const mute = section.querySelector('[data-intro="mute"]');
  let state = 'ready';
  let pausedByScroll = false;

  const setState = next => { state = next; section.dataset.state = next; };
  const paintMute = () => {
    mute.setAttribute('aria-pressed', String(!video.muted));
    mute.textContent = video.muted ? 'Ton an' : 'Ton aus';
  };
  const finish = () => {
    setState('ended');
    if (status) status.textContent = 'Quote by Elon Musk: If things are not failing, you are not innovating enough.';
  };
  // A missing or unplayable clip falls back to the quote over the poster image.
  const fail = () => { video.pause(); finish(); };
  const play = withSound => {
    video.muted = !withSound;
    paintMute();
    if (state === 'ended') video.currentTime = 0;
    setState('playing');
    pausedByScroll = false;
    video.play().catch(error => {
      if (error?.name === 'NotAllowedError' && withSound) play(false);
      else fail();
    });
  };

  section.addEventListener('click', event => {
    const action = event.target.closest('[data-intro]')?.dataset.intro;
    if (action === 'sound') play(true);
    else if (action === 'silent') play(false);
    else if (action === 'replay') play(!video.muted);
    else if (action === 'mute') { video.muted = !video.muted; paintMute(); }
    else if (action === 'skip') {
      video.pause();
      if (Number.isFinite(video.duration)) video.currentTime = Math.max(0, video.duration - .05);
      finish();
    }
  });
  video.addEventListener('ended', finish);
  video.addEventListener('error', () => { if (state === 'playing') fail(); });
  paintMute();

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      document.body.classList.toggle('is-intro-active', entry.intersectionRatio > .5);
      if (state !== 'playing') return;
      if (entry.intersectionRatio < .25 && !video.paused) { pausedByScroll = true; video.pause(); }
      else if (entry.intersectionRatio >= .5 && pausedByScroll) { pausedByScroll = false; video.play().catch(() => {}); }
    }, {threshold: [0, .25, .5, .75, 1]}).observe(section);
  }
})();
