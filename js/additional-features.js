/**
 * Additional Features & Micro-interactions
 */

;(function () {
	'use strict';

	// ============================================
	// BACK TO TOP BUTTON
	// ============================================
	const backToTop = {
		button: null,
		init: function() {
			// Create button
			this.button = document.createElement('button');
			this.button.className = 'back-to-top';
			this.button.innerHTML = '<i class="icon-arrow-up"></i>';
			this.button.setAttribute('aria-label', 'Back to top');
			document.body.appendChild(this.button);

			// Show/hide on scroll
			let ticking = false;
			window.addEventListener('scroll', () => {
				if (!ticking) {
					window.requestAnimationFrame(() => {
						this.toggleVisibility();
						ticking = false;
					});
					ticking = true;
				}
			});

			// Click handler
			this.button.addEventListener('click', () => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			});
		},
		toggleVisibility: function() {
			if (window.pageYOffset > 500) {
				this.button.classList.add('visible');
			} else {
				this.button.classList.remove('visible');
			}
		}
	};

	// ============================================
	// KEYBOARD SHORTCUTS
	// ============================================
	const keyboardShortcuts = {
		init: function() {
			document.addEventListener('keydown', (e) => {
				// Ctrl/Cmd + K: Focus search (if exists)
				if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
					e.preventDefault();
					const searchInput = document.getElementById('search');
					if (searchInput) {
						searchInput.focus();
					}
				}

				// Escape: Close menu
				if (e.key === 'Escape') {
					if (document.body.classList.contains('menu-show')) {
						document.querySelector('.js-colorlib-nav-toggle').click();
					}
				}

				// Home: Scroll to top
				if (e.key === 'Home' && !e.target.matches('input, textarea')) {
					e.preventDefault();
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}

				// End: Scroll to bottom
				if (e.key === 'End' && !e.target.matches('input, textarea')) {
					e.preventDefault();
					window.scrollTo({ 
						top: document.body.scrollHeight, 
						behavior: 'smooth' 
					});
				}
			});
		}
	};

	// ============================================
	// COPY TO CLIPBOARD
	// ============================================
	const clipboard = {
		init: function() {
			document.querySelectorAll('[data-copy]').forEach(el => {
				el.style.cursor = 'pointer';
				el.addEventListener('click', () => {
					const text = el.dataset.copy || el.textContent;
					this.copy(text);
					this.showFeedback(el);
				});
			});
		},
		copy: function(text) {
			if (navigator.clipboard) {
				navigator.clipboard.writeText(text);
			} else {
				// Fallback
				const textarea = document.createElement('textarea');
				textarea.value = text;
				textarea.style.position = 'fixed';
				textarea.style.opacity = '0';
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand('copy');
				document.body.removeChild(textarea);
			}
		},
		showFeedback: function(el) {
			const originalText = el.textContent;
			el.textContent = 'Copied!';
			el.style.color = '#CA82F8';
			setTimeout(() => {
				el.textContent = originalText;
				el.style.color = '';
			}, 2000);
		}
	};

	// ============================================
	// IMAGE LIGHTBOX ENHANCEMENT
	// ============================================
	const lightbox = {
		init: function() {
			// Add keyboard navigation to existing magnific popup
			$(document).on('keydown', function(e) {
				if ($('.mfp-wrap').length) {
					if (e.key === 'ArrowLeft') {
						$('.mfp-arrow-left').click();
					} else if (e.key === 'ArrowRight') {
						$('.mfp-arrow-right').click();
					}
				}
			});
		}
	};

	// ============================================
	// READING TIME ESTIMATOR
	// ============================================
	const readingTime = {
		init: function() {
			document.querySelectorAll('[data-reading-time]').forEach(el => {
				const text = el.textContent;
				const words = text.trim().split(/\s+/).length;
				const minutes = Math.ceil(words / 200); // Average reading speed
				
				const badge = document.createElement('span');
				badge.className = 'badge reading-time';
				badge.textContent = `${minutes} min read`;
				badge.style.marginLeft = '10px';
				
				const heading = el.querySelector('h2, h3');
				if (heading) {
					heading.appendChild(badge);
				}
			});
		}
	};

	// ============================================
	// EXTERNAL LINK INDICATOR
	// ============================================
	const externalLinks = {
		init: function() {
			const domain = window.location.hostname;
			document.querySelectorAll('a[href^="http"]').forEach(link => {
				if (!link.href.includes(domain)) {
					link.setAttribute('target', '_blank');
					link.setAttribute('rel', 'noopener noreferrer');
					
					// Add icon
					if (!link.querySelector('.external-icon')) {
						const icon = document.createElement('i');
						icon.className = 'icon-external-link external-icon';
						icon.style.marginLeft = '5px';
						icon.style.fontSize = '0.8em';
						link.appendChild(icon);
					}
				}
			});
		}
	};

	// ============================================
	// VIEWPORT HEIGHT FIX (Mobile)
	// ============================================
	const viewportFix = {
		init: function() {
			// Fix for mobile browsers where 100vh includes address bar
			const setVH = () => {
				const vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
			};
			
			setVH();
			window.addEventListener('resize', setVH);
			window.addEventListener('orientationchange', setVH);
		}
	};

	// ============================================
	// EASTER EGG (Konami Code)
	// ============================================
	const easterEgg = {
		sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
		current: 0,
		init: function() {
			document.addEventListener('keydown', (e) => {
				if (e.key === this.sequence[this.current]) {
					this.current++;
					if (this.current === this.sequence.length) {
						this.activate();
						this.current = 0;
					}
				} else {
					this.current = 0;
				}
			});
		},
		activate: function() {
			// Fun animation
			document.body.style.animation = 'rainbow 2s linear';
			setTimeout(() => {
				document.body.style.animation = '';
			}, 2000);
			
			// Add rainbow animation
			if (!document.getElementById('rainbow-style')) {
				const style = document.createElement('style');
				style.id = 'rainbow-style';
				style.textContent = `
					@keyframes rainbow {
						0% { filter: hue-rotate(0deg); }
						100% { filter: hue-rotate(360deg); }
					}
				`;
				document.head.appendChild(style);
			}
			
			console.log('🎉 You found the easter egg!');
		}
	};

	// ============================================
	// ANALYTICS HELPER
	// ============================================
	const analytics = {
		init: function() {
			// Track outbound links
			document.querySelectorAll('a[href^="http"]').forEach(link => {
				link.addEventListener('click', (e) => {
					if (typeof gtag !== 'undefined') {
						gtag('event', 'click', {
							event_category: 'outbound',
							event_label: link.href
						});
					}
				});
			});

			// Track scroll depth
			let maxScroll = 0;
			window.addEventListener('scroll', () => {
				const scrollPercent = Math.round(
					(window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100
				);
				
				if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
					maxScroll = scrollPercent;
					if (typeof gtag !== 'undefined') {
						gtag('event', 'scroll', {
							event_category: 'engagement',
							event_label: `${scrollPercent}%`
						});
					}
				}
			});
		}
	};

	// ============================================
	// CONSOLE MESSAGE
	// ============================================
	const consoleMessage = {
		init: function() {
			const styles = [
				'color: #CA82F8',
				'font-size: 20px',
				'font-weight: bold',
				'text-shadow: 2px 2px 4px rgba(0,0,0,0.2)'
			].join(';');
			
			console.log('%c👋 Hello Developer!', styles);
			console.log('%cInterested in how this site works?', 'color: #666; font-size: 14px;');
			console.log('%cCheck out the code on GitHub or reach out!', 'color: #666; font-size: 14px;');
			console.log('%c🎸 Built with passion by Robbie Belson', 'color: #CA82F8; font-size: 12px;');
		}
	};

	// ============================================
	// INITIALIZE ALL FEATURES
	// ============================================
	document.addEventListener('DOMContentLoaded', () => {
		backToTop.init();
		keyboardShortcuts.init();
		clipboard.init();
		lightbox.init();
		// readingTime.init(); // Uncomment if needed
		externalLinks.init();
		viewportFix.init();
		easterEgg.init();
		aboutCarousel.init();
		experienceTabs.init();
		customCarousel.init();
		quickNav.init();
		// analytics.init(); // Uncomment when analytics is set up
		consoleMessage.init();
	});

})();


	// ============================================
	// ABOUT IMAGE CAROUSEL
	// ============================================
	const aboutCarousel = {
		currentSlide: 0,
		slides: [],
		interval: null,
		
		init: function() {
			const carousel = document.querySelector('.about-image-carousel');
			if (!carousel) return;
			
			this.slides = carousel.querySelectorAll('.about-slide');
			if (this.slides.length === 0) return;
			
			// Auto-rotate every 15 seconds
			this.interval = setInterval(() => this.nextSlide(), 15000);
		},
		
		nextSlide: function() {
			this.currentSlide = (this.currentSlide + 1) % this.slides.length;
			this.updateSlide();
		},
		
		updateSlide: function() {
			this.slides.forEach((slide, index) => {
				if (index === this.currentSlide) {
					slide.classList.add('active');
				} else {
					slide.classList.remove('active');
				}
			});
		}
	};

	// ============================================
	// EXPERIENCE TABS
	// ============================================
	const experienceTabs = {
		init: function() {
			const tabs = document.querySelectorAll('.experience-tab');
			const panels = document.querySelectorAll('.experience-panel');
			
			if (tabs.length === 0) return;
			
			tabs.forEach(tab => {
				tab.addEventListener('click', () => {
					const targetId = tab.dataset.tab;
					
					// Remove active class from all tabs and panels
					tabs.forEach(t => t.classList.remove('active'));
					panels.forEach(p => p.classList.remove('active'));
					
					// Add active class to clicked tab and corresponding panel
					tab.classList.add('active');
					document.getElementById(targetId).classList.add('active');
				});
			});
		}
	};

	// ============================================
	// CUSTOM CAROUSEL
	// ============================================
	const customCarousel = {
		currentSlide: 0,
		slides: [],
		dots: [],
		slidesToShow: 3,
		
		init: function() {
			const carousel = document.querySelector('.custom-carousel');
			if (!carousel) return;
			
			this.slides = carousel.querySelectorAll('.carousel-slide');
			if (this.slides.length === 0) return;
			
			// Determine slides to show based on screen size
			this.updateSlidesToShow();
			window.addEventListener('resize', () => {
				this.updateSlidesToShow();
				this.updateSlide();
			});
			
			// Create dots (one for each possible starting position)
			const dotsContainer = carousel.querySelector('.carousel-dots');
			const numDots = Math.max(1, this.slides.length - this.slidesToShow + 1);
			for (let i = 0; i < numDots; i++) {
				const dot = document.createElement('button');
				dot.className = 'carousel-dot';
				dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
				dot.addEventListener('click', () => this.goToSlide(i));
				dotsContainer.appendChild(dot);
				this.dots.push(dot);
			}
			
			// Set up navigation buttons
			const prevBtn = carousel.querySelector('.carousel-prev');
			const nextBtn = carousel.querySelector('.carousel-next');
			
			prevBtn.addEventListener('click', () => this.prevSlide());
			nextBtn.addEventListener('click', () => this.nextSlide());
			
			// Keyboard navigation
			document.addEventListener('keydown', (e) => {
				if (e.key === 'ArrowLeft') this.prevSlide();
				if (e.key === 'ArrowRight') this.nextSlide();
			});
			
			// Auto-advance every 8 seconds
			setInterval(() => this.nextSlide(), 8000);
			
			// Show first slide
			this.updateSlide();
		},
		
		updateSlidesToShow: function() {
			const width = window.innerWidth;
			if (width >= 992) {
				this.slidesToShow = 3;
			} else if (width >= 768) {
				this.slidesToShow = 2;
			} else {
				this.slidesToShow = 1;
			}
		},
		
		goToSlide: function(index) {
			const maxIndex = Math.max(0, this.slides.length - this.slidesToShow);
			this.currentSlide = Math.min(index, maxIndex);
			this.updateSlide();
		},
		
		nextSlide: function() {
			const maxIndex = Math.max(0, this.slides.length - this.slidesToShow);
			this.currentSlide = (this.currentSlide + 1) % (maxIndex + 1);
			this.updateSlide();
		},
		
		prevSlide: function() {
			const maxIndex = Math.max(0, this.slides.length - this.slidesToShow);
			this.currentSlide = (this.currentSlide - 1 + maxIndex + 1) % (maxIndex + 1);
			this.updateSlide();
		},
		
		updateSlide: function() {
			// Update slides
			this.slides.forEach((slide, index) => {
				if (index >= this.currentSlide && index < this.currentSlide + this.slidesToShow) {
					slide.classList.add('active');
				} else {
					slide.classList.remove('active');
				}
			});
			
			// Update dots
			this.dots.forEach((dot, index) => {
				if (index === this.currentSlide) {
					dot.classList.add('active');
				} else {
					dot.classList.remove('active');
				}
			});
		}
	};


	// ============================================
	// QUICK NAVIGATION MENU
	// ============================================
	const quickNav = {
		init: function() {
			const navToggle = document.querySelector('.js-quick-nav');
			if (!navToggle) return;

			// Create quick nav menu
			const menu = document.createElement('div');
			menu.className = 'quick-nav-menu';
			menu.innerHTML = `
				<div class="quick-nav-header">
					<button class="quick-nav-close" aria-label="Close menu">&times;</button>
				</div>
				<nav class="quick-nav-links">
					<a href="#colorlib-about" class="quick-nav-link">
						<i class="icon-user"></i>
						<span>About</span>
					</a>
					<a href="#colorlib-services" class="quick-nav-link">
						<i class="icon-briefcase"></i>
						<span>Background</span>
					</a>
					<a href="#colorlib-blog" class="quick-nav-link">
						<i class="icon-music"></i>
						<span>Repertoire</span>
					</a>
					<a href="#contact" class="quick-nav-link">
						<i class="icon-envelope"></i>
						<span>Contact</span>
					</a>
				</nav>
			`;
			document.body.appendChild(menu);

			const closeBtn = menu.querySelector('.quick-nav-close');
			const links = menu.querySelectorAll('.quick-nav-link');

			// Toggle menu
			navToggle.addEventListener('click', (e) => {
				e.preventDefault();
				menu.classList.toggle('active');
				document.body.classList.toggle('quick-nav-open');
			});

			// Close menu
			closeBtn.addEventListener('click', () => {
				menu.classList.remove('active');
				document.body.classList.remove('quick-nav-open');
			});

			// Navigate and close
			links.forEach(link => {
				link.addEventListener('click', (e) => {
					e.preventDefault();
					const target = document.querySelector(link.getAttribute('href'));
					if (target) {
						menu.classList.remove('active');
						document.body.classList.remove('quick-nav-open');
						setTimeout(() => {
							target.scrollIntoView({ behavior: 'smooth', block: 'start' });
						}, 300);
					}
				});
			});

			// Close on escape
			document.addEventListener('keydown', (e) => {
				if (e.key === 'Escape' && menu.classList.contains('active')) {
					menu.classList.remove('active');
					document.body.classList.remove('quick-nav-open');
				}
			});

			// Close on outside click
			menu.addEventListener('click', (e) => {
				if (e.target === menu) {
					menu.classList.remove('active');
					document.body.classList.remove('quick-nav-open');
				}
			});
		}
	};


