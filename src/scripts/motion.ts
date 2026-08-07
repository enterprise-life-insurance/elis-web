import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
	const lenis = new Lenis();
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => lenis.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
}

document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
	if (prefersReducedMotion) {
		el.style.opacity = '1';
		return;
	}

	gsap.fromTo(
		el,
		{ opacity: 0, y: 32 },
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: el,
				start: 'top 85%',
				once: true,
			},
		},
	);
});
