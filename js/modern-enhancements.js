/**
 * Modern Enhancements for Portfolio Site
 * Includes: Preloader, Smooth Scroll, Lazy Loading, Performance Optimizations
 */

;(function () {
	'use strict';

	// ============================================
	// PRELOADER
	// ============================================
	const preloader = {
		init: function() {
			const loader = document.getElementById('preloader');
			if (!loader) return;

			window.addEventListener('load', () => {
				setTimeout(() => {
					loader.classList.add('fade-out');
					setTimeout(() => {
						loader.style.display = 'none';
						document.body.classList.add('loaded');
					}, 500);
				}, 800);
			});
		}
	};

	// ============================================
	// SMOOTH SCROLL
	// ============================================
	const smoothScroll = {
		init: function() {
			document.querySelectorAll('a[href^="#"]').forEach(anchor => {
				anchor.addEventListener('click', function (e) {
					const href = this.getAttribute('href');
					if (href === '#' || href === '#!') return;
					
					const target = document.querySelector(href);
					if (target) {
						e.preventDefault();
						target.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						});
					}
				});
			});
		}
	};

	// ============================================
	// LAZY LOADING IMAGES
	// ============================================
	const lazyLoad = {
		init: function() {
			if ('IntersectionObserver' in window) {
				const imageObserver = new IntersectionObserver((entries, observer) => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							const img = entry.target;
							if (img.dataset.src) {
								img.src = img.dataset.src;
								img.classList.add('loaded');
								observer.unobserve(img);
							}
						}
					});
				}, {
					rootMargin: '50px 0px',
					threshold: 0.01
				});

				document.querySelectorAll('img[data-src]').forEach(img => {
					imageObserver.observe(img);
				});
			} else {
				// Fallback for older browsers
				document.querySelectorAll('img[data-src]').forEach(img => {
					img.src = img.dataset.src;
				});
			}
		}
	};

	// ============================================
	// PARALLAX EFFECT
	// ============================================
	const parallax = {
		elements: [],
		init: function() {
			this.elements = document.querySelectorAll('[data-parallax]');
			if (this.elements.length === 0) return;

			let ticking = false;
			window.addEventListener('scroll', () => {
				if (!ticking) {
					window.requestAnimationFrame(() => {
						this.update();
						ticking = false;
					});
					ticking = true;
				}
			});
		},
		update: function() {
			const scrolled = window.pageYOffset;
			this.elements.forEach(el => {
				const speed = el.dataset.parallax || 0.5;
				const yPos = -(scrolled * speed);
				el.style.transform = `translate3d(0, ${yPos}px, 0)`;
			});
		}
	};

	// ============================================
	// SCROLL REVEAL ANIMATIONS
	// ============================================
	const scrollReveal = {
		init: function() {
			if ('IntersectionObserver' in window) {
				const revealObserver = new IntersectionObserver((entries) => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							entry.target.classList.add('revealed');
						}
					});
				}, {
					threshold: 0.15,
					rootMargin: '0px 0px -50px 0px'
				});

				document.querySelectorAll('.reveal-on-scroll').forEach(el => {
					revealObserver.observe(el);
				});
			}
		}
	};

	// ============================================
	// AUDIO PLAYER ENHANCEMENT
	// ============================================
	const audioPlayer = {
		init: function() {
			const audio = document.querySelector('audio');
			if (!audio) return;

			// Create custom audio controls
			const controlsHTML = `
				<div class="audio-controls">
					<button class="audio-toggle" aria-label="Toggle music">
						<i class="icon-music"></i>
					</button>
				</div>
			`;
			
			const controlsDiv = document.createElement('div');
			controlsDiv.innerHTML = controlsHTML;
			document.body.appendChild(controlsDiv.firstElementChild);

			const toggleBtn = document.querySelector('.audio-toggle');
			let isPlaying = false;

			toggleBtn.addEventListener('click', () => {
				if (isPlaying) {
					audio.pause();
					toggleBtn.classList.remove('playing');
					isPlaying = false;
				} else {
					audio.currentTime = 0; // Restart from beginning
					audio.play().catch(e => console.log('Audio play failed:', e));
					toggleBtn.classList.add('playing');
					isPlaying = true;
				}
			});

			// Update button state when audio ends
			audio.addEventListener('ended', () => {
				toggleBtn.classList.remove('playing');
				isPlaying = false;
			});

			// Auto-play once with user interaction
			document.addEventListener('click', function initAudio() {
				if (!isPlaying) {
					audio.play().catch(e => {});
					toggleBtn.classList.add('playing');
					isPlaying = true;
				}
				document.removeEventListener('click', initAudio);
			}, { once: true });
		}
	};

	// ============================================
	// PERFORMANCE OPTIMIZATIONS
	// ============================================
	const performance = {
		init: function() {
			// Debounce resize events
			let resizeTimer;
			window.addEventListener('resize', () => {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(() => {
					this.handleResize();
				}, 250);
			});

			// Reduce motion for users who prefer it
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				document.documentElement.classList.add('reduce-motion');
			}
		},
		handleResize: function() {
			// Trigger custom resize event
			window.dispatchEvent(new CustomEvent('optimizedResize'));
		}
	};

	// ============================================
	// FORM ENHANCEMENTS
	// ============================================
	const forms = {
		init: function() {
			const forms = document.querySelectorAll('form');
			forms.forEach(form => {
				// Add floating labels
				const inputs = form.querySelectorAll('input, textarea');
				inputs.forEach(input => {
					if (input.value) {
						input.classList.add('has-value');
					}
					
					input.addEventListener('blur', () => {
						if (input.value) {
							input.classList.add('has-value');
						} else {
							input.classList.remove('has-value');
						}
					});
				});
			});
		}
	};

	// ============================================
	// NAVIGATION ENHANCEMENTS
	// ============================================
	const navigation = {
		init: function() {
			const header = document.querySelector('header');
			if (!header) return;

			let lastScroll = 0;
			let ticking = false;

			window.addEventListener('scroll', () => {
				if (!ticking) {
					window.requestAnimationFrame(() => {
						this.handleScroll(header, lastScroll);
						lastScroll = window.pageYOffset;
						ticking = false;
					});
					ticking = true;
				}
			});
		},
		handleScroll: function(header, lastScroll) {
			const currentScroll = window.pageYOffset;

			// Add shadow on scroll
			if (currentScroll > 100) {
				header.classList.add('scrolled');
			} else {
				header.classList.remove('scrolled');
			}

			// Hide/show header on scroll
			if (currentScroll > lastScroll && currentScroll > 500) {
				header.classList.add('header-hidden');
			} else {
				header.classList.remove('header-hidden');
			}
		}
	};

	// ============================================
	// CURSOR EFFECTS (Optional Enhancement)
	// ============================================
	const cursor = {
		init: function() {
			if (window.innerWidth < 768) return; // Skip on mobile

			const cursor = document.createElement('div');
			cursor.className = 'custom-cursor';
			document.body.appendChild(cursor);

			const cursorDot = document.createElement('div');
			cursorDot.className = 'custom-cursor-dot';
			document.body.appendChild(cursorDot);

			let mouseX = 0, mouseY = 0;
			let cursorX = 0, cursorY = 0;
			let dotX = 0, dotY = 0;

			document.addEventListener('mousemove', (e) => {
				mouseX = e.clientX;
				mouseY = e.clientY;
			});

			const animateCursor = () => {
				// Smooth cursor follow
				cursorX += (mouseX - cursorX) * 0.15;
				cursorY += (mouseY - cursorY) * 0.15;
				cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

				// Dot follows faster
				dotX += (mouseX - dotX) * 0.3;
				dotY += (mouseY - dotY) * 0.3;
				cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

				requestAnimationFrame(animateCursor);
			};
			animateCursor();

			// Cursor interactions
			const interactiveElements = document.querySelectorAll('a, button, .btn, [role="button"]');
			interactiveElements.forEach(el => {
				el.addEventListener('mouseenter', () => {
					cursor.classList.add('cursor-hover');
					cursorDot.classList.add('cursor-hover');
				});
				el.addEventListener('mouseleave', () => {
					cursor.classList.remove('cursor-hover');
					cursorDot.classList.remove('cursor-hover');
				});
			});
		}
	};

	// ============================================
	// INITIALIZE ALL MODULES
	// ============================================
	document.addEventListener('DOMContentLoaded', () => {
		preloader.init();
		smoothScroll.init();
		lazyLoad.init();
		parallax.init();
		scrollReveal.init();
		audioPlayer.init();
		performance.init();
		forms.init();
		navigation.init();
		// cursor.init(); // Uncomment for custom cursor
	});

})();
