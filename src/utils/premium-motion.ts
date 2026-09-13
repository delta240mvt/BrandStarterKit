import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const media = gsap.matchMedia();
media.add({ desktop: '(min-width: 821px)', motion: '(prefers-reduced-motion: no-preference)' }, context => {
  if (!context.conditions?.motion) return;
  document.documentElement.classList.toggle('has-smooth-motion', !!context.conditions.desktop);
  const smoother = context.conditions.desktop ? ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: .8, smoothTouch: false, effects: false }) : null;
  gsap.from('.hero-line', { y: 32, opacity: 0, duration: .85, stagger: .1, ease: 'power3.out', clearProps: 'all' });
  gsap.from('.hero-enter', { y: 18, opacity: 0, duration: .7, stagger: .1, delay: .3, ease: 'power2.out', clearProps: 'all' });
  gsap.from('.portrait-label span', { y: 35, opacity: 0, duration: .9, stagger: .12, delay: .4, ease: 'power3.out', clearProps: 'all' });
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
    gsap.from(element, { y: 28, opacity: 0, duration: .75, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
  });
  gsap.to('.reading-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: 'body', start: 0, end: 'max', scrub: .25 } });
  if (context.conditions.desktop) {
    gsap.fromTo('.hero-portrait', { scale: 1.06, y: 0 }, { scale: 1.06, y: 35, ease: 'none', scrollTrigger: { trigger: '.sales-hero', start: 'top top', end: 'bottom top', scrub: .7 } });
    gsap.fromTo('.mini-browser', { rotation: -5, y: 10 }, { rotation: 2, y: -10, ease: 'none', scrollTrigger: { trigger: '.work-grid', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    gsap.to('.focus-orbit', { rotation: 25, ease: 'none', scrollTrigger: { trigger: '.work-grid', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    gsap.to('.focus-orbit>span', { rotation: -25, ease: 'none', scrollTrigger: { trigger: '.work-grid', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  }
  const onAnchor = (event: MouseEvent) => {
    if (!smoother || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!link || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    history.pushState(null, '', url.hash);
    target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true });
    smoother.scrollTo(target, true, 'top 98px');
  };
  document.addEventListener('click', onAnchor);
  const refresh = () => ScrollTrigger.refresh();
  document.querySelectorAll('img').forEach(image => { if (!image.complete) image.addEventListener('load', refresh, { once: true }); });
  document.fonts.ready.then(refresh);
  document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', refresh));
  return () => { document.documentElement.classList.remove('has-smooth-motion'); document.removeEventListener('click', onAnchor); document.querySelectorAll('details').forEach(details => details.removeEventListener('toggle', refresh)); document.querySelectorAll('img').forEach(image => image.removeEventListener('load', refresh)); smoother?.kill(); };
});
window.addEventListener('pagehide', () => media.revert(), { once: true });
