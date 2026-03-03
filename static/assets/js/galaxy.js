// Galaxy Theme Implementation
class GalaxyTheme {
  constructor() {
    this.init();
  }

  init() {
    const mode = localStorage.getItem('themeMode');
    if (mode === 'galaxy') {
      this.setupGalaxy();
    }
  }

  setupGalaxy() {
    // Add necessary styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/galaxy.css';
    document.head.appendChild(link);

    // Apply galaxy class to HTML
    document.documentElement.classList.add('galaxy');

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createGalaxy());
    } else {
      this.createGalaxy();
    }
  }

  createGalaxy() {
    // Create main galaxy container
    const galaxyContainer = document.createElement('div');
    galaxyContainer.id = 'galaxy-container';

    // Create rotating galaxy discs
    const galaxyCore = document.createElement('div');
    galaxyCore.className = 'galaxy-core';

    const outerDisc = document.createElement('div');
    outerDisc.className = 'galaxy-disc outer';

    const middleDisc = document.createElement('div');
    middleDisc.className = 'galaxy-disc middle';

    const innerDisc = document.createElement('div');
    innerDisc.className = 'galaxy-disc inner';

    const coreCenter = document.createElement('div');
    coreCenter.className = 'galaxy-core-center';

    galaxyCore.appendChild(outerDisc);
    galaxyCore.appendChild(middleDisc);
    galaxyCore.appendChild(innerDisc);
    galaxyCore.appendChild(coreCenter);
    galaxyContainer.appendChild(galaxyCore);

    // Create nebula clouds
    const nebulas = [
      { className: 'nebula purple n1' },
      { className: 'nebula pink n2' },
      { className: 'nebula blue n3' },
      { className: 'nebula purple n4' }
    ];

    nebulas.forEach(neb => {
      const nebula = document.createElement('div');
      nebula.className = neb.className;
      galaxyContainer.appendChild(nebula);
    });

    // Create random stars
    this.createStars(galaxyContainer, 200);

    // Insert at the beginning of body
    document.body.insertBefore(galaxyContainer, document.body.firstChild);

    // Setup parallax scrolling
    this.setupParallax();
  }

  createStars(container, count) {
    const sizes = ['small', 'medium', 'large'];
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const isTwinkling = Math.random() > 0.7;

      star.className = `star ${size}${isTwinkling ? ' twinkle' : ''}`;
      star.style.left = Math.random() * width + 'px';
      star.style.top = Math.random() * height + 'px';
      star.style.animationDelay = (Math.random() * 3) + 's';

      container.appendChild(star);
    }
  }

  setupParallax() {
    const galaxyContainer = document.getElementById('galaxy-container');
    const galaxyCore = document.querySelector('.galaxy-core');

    if (!galaxyContainer || !galaxyCore) return;

    // Set perspective on container for 3D effect
    galaxyContainer.style.perspective = '1200px';

    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate rotation angles based on mouse position
      const rotateY = (mouseX - centerX) * 0.02; // Horizontal movement
      const rotateX = (centerY - mouseY) * 0.02; // Vertical movement (inverted)

      // Apply 3D perspective transform to galaxy core
      galaxyCore.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    }, { passive: true });
  }
}

// Initialize galaxy theme if selected
if (localStorage.getItem('themeMode') === 'galaxy') {
  new GalaxyTheme();
}

// Export for use in other scripts
window.GalaxyTheme = GalaxyTheme;
