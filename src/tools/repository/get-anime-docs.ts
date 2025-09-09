import { z } from 'zod';
import { cache } from '../../utils/cache.js';
import { axios } from '../../utils/axios.js';
import { logInfo, logWarning } from '../../utils/logger.js';

export const schema = {
  topic: z.string().describe('Documentation topic (e.g., "getting-started", "animation-controls", "performance", "easing")')
};

export async function handleGetAnimeDocs(params: { topic: string }) {
  const { topic } = params;
  
  logInfo(`Getting Anime.js documentation for topic: ${topic}`);

  // Check cache first
  const cacheKey = `anime-docs-${topic.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const documentation = getDocumentation(topic);
  
  // Cache for 1 hour
  cache.set(cacheKey, documentation, 60 * 60 * 1000);
  
  return documentation;
}

function getDocumentation(topic: string) {
  const docs = {
    'getting-started': {
      title: 'Getting Started with Anime.js',
      content: `# Getting Started with Anime.js

## Installation

### Via CDN
\`\`\`html
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
\`\`\`

### Via npm
\`\`\`bash
npm install animejs
\`\`\`

\`\`\`javascript
import anime from 'animejs/lib/anime.es.js';
\`\`\`

## Basic Usage

### Simple Animation
\`\`\`javascript
anime({
  targets: '.my-element',
  translateX: 250,
  duration: 2000
});
\`\`\`

### Multiple Properties
\`\`\`javascript
anime({
  targets: '.element',
  translateX: 250,
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 3000
});
\`\`\`

### Multiple Targets
\`\`\`javascript
anime({
  targets: ['.element1', '.element2', document.querySelector('.element3')],
  translateY: 100,
  duration: 1000
});
\`\`\`

## Key Concepts

### Targets
- CSS Selectors: \`.class\`, \`#id\`, \`div\`
- DOM Elements: \`document.querySelector('.element')\`
- Arrays: \`['.el1', '.el2']\`
- Objects: \`{x: 100, y: 200}\` for non-DOM animations

### Properties
- Transforms: \`translateX\`, \`rotate\`, \`scale\`
- CSS Properties: \`opacity\`, \`color\`, \`width\`
- Object Properties: Custom object properties
- SVG Attributes: \`cx\`, \`r\`, \`stroke-width\`

### Values
- Absolute: \`100\`
- Relative: \`'+=100'\`, \`'-=50'\`
- Unit specific: \`'100px'\`, \`'50%'\`, \`'1.5em'\`
- Keywords: \`'left'\`, \`'center'\`
- From-to: \`[0, 100]\`

## Next Steps
- Learn about [Animation Controls](#animation-controls)
- Explore [Easing Functions](#easing)
- Try [Timeline](#timeline) for complex sequences
- Use [Stagger](#stagger) for multiple elements`
    },

    'animation-controls': {
      title: 'Animation Controls',
      content: `# Animation Controls

## Basic Controls

### Play/Pause
\`\`\`javascript
const animation = anime({
  targets: '.element',
  translateX: 250,
  duration: 2000,
  autoplay: false // Don't start automatically
});

// Control methods
animation.play();    // Play animation
animation.pause();   // Pause animation
animation.restart(); // Restart from beginning
animation.reverse(); // Reverse direction
\`\`\`

### Seek to Time
\`\`\`javascript
animation.seek(1000); // Jump to 1 second
animation.seek(animation.duration * 0.5); // Jump to 50%
\`\`\`

## Animation Properties

### Direction
\`\`\`javascript
anime({
  targets: '.element',
  translateX: 250,
  direction: 'reverse',    // 'normal', 'reverse', 'alternate'
  duration: 2000
});
\`\`\`

### Looping
\`\`\`javascript
anime({
  targets: '.element',
  rotate: '1turn',
  loop: true,           // Infinite loop
  // loop: 3,           // Loop 3 times
  direction: 'alternate', // Reverse on alternate loops
  duration: 1000
});
\`\`\`

### Autoplay
\`\`\`javascript
const animation = anime({
  targets: '.element',
  translateX: 250,
  autoplay: false,
  duration: 2000
});

// Start manually
setTimeout(() => animation.play(), 1000);
\`\`\`

## Advanced Controls

### Progress-based Control
\`\`\`javascript
const animation = anime({
  targets: '.element',
  translateX: 250,
  autoplay: false,
  duration: 2000
});

// Control with slider
const slider = document.querySelector('.slider');
slider.addEventListener('input', () => {
  animation.seek(animation.duration * (slider.value / 100));
});
\`\`\`

### Animation States
\`\`\`javascript
animation.began;      // true if animation has started
animation.paused;     // true if animation is paused
animation.completed;  // true if animation has completed
animation.reversed;   // true if animation is reversed
\`\`\`

### Remove Animation
\`\`\`javascript
anime.remove('.element'); // Remove all animations from element
animation.pause();        // Pause before removing
\`\`\``
    },

    'easing': {
      title: 'Easing Functions',
      content: `# Easing Functions

## Built-in Easing Functions

### Linear
\`\`\`javascript
anime({
  targets: '.element',
  translateX: 250,
  easing: 'linear',
  duration: 2000
});
\`\`\`

### Quadratic
\`\`\`javascript
easing: 'easeInQuad'     // Slow start
easing: 'easeOutQuad'    // Slow end  
easing: 'easeInOutQuad'  // Slow start and end
\`\`\`

### Cubic
\`\`\`javascript
easing: 'easeInCubic'
easing: 'easeOutCubic'
easing: 'easeInOutCubic'
\`\`\`

### Other Functions
\`\`\`javascript
// Quartic
easing: 'easeInQuart'
easing: 'easeOutQuart'
easing: 'easeInOutQuart'

// Quintic
easing: 'easeInQuint'
easing: 'easeOutQuint'
easing: 'easeInOutQuint'

// Sine
easing: 'easeInSine'
easing: 'easeOutSine'
easing: 'easeInOutSine'

// Exponential
easing: 'easeInExpo'
easing: 'easeOutExpo'
easing: 'easeInOutExpo'

// Circular
easing: 'easeInCirc'
easing: 'easeOutCirc'
easing: 'easeInOutCirc'
\`\`\`

## Spring and Physics

### Elastic
\`\`\`javascript
easing: 'easeInElastic'
easing: 'easeOutElastic'
easing: 'easeInOutElastic'

// With parameters
easing: 'easeOutElastic(1, .6)'  // amplitude, period
\`\`\`

### Back
\`\`\`javascript
easing: 'easeInBack'
easing: 'easeOutBack'
easing: 'easeInOutBack'

// With overshoot parameter
easing: 'easeOutBack(1.7)'
\`\`\`

### Bounce
\`\`\`javascript
easing: 'easeInBounce'
easing: 'easeOutBounce'
easing: 'easeInOutBounce'
\`\`\`

## Custom Easing

### Cubic Bezier
\`\`\`javascript
anime({
  targets: '.element',
  translateX: 250,
  easing: 'cubicBezier(.5, .05, .1, .3)',
  duration: 2000
});
\`\`\`

### Spring Physics
\`\`\`javascript
anime({
  targets: '.element',
  translateX: 250,
  easing: 'spring(1, 80, 10, 0)', // mass, stiffness, damping, velocity
  duration: anime.random(1200, 1800)
});
\`\`\`

### Steps
\`\`\`javascript
anime({
  targets: '.element',
  translateX: 250,
  easing: 'steps(10)', // 10 discrete steps
  duration: 2000
});
\`\`\`

## Per-Property Easing
\`\`\`javascript
anime({
  targets: '.element',
  translateX: {
    value: 250,
    easing: 'easeOutExpo'
  },
  rotate: {
    value: 360,
    easing: 'easeInOutSine'
  },
  duration: 2000
});
\`\`\``
    },

    'performance': {
      title: 'Performance Optimization',
      content: `# Performance Optimization

## Best Practices

### 1. Use Hardware-Accelerated Properties
\`\`\`javascript
// ✅ Good - Uses GPU acceleration
anime({
  targets: '.element',
  translateX: 250,    // transform
  rotateY: 180,      // transform
  scale: 1.5,        // transform
  opacity: 0.5       // opacity
});

// ❌ Avoid - Causes layout/repaint
anime({
  targets: '.element',
  left: 250,         // layout
  width: 300,        // layout
  padding: 20        // layout
});
\`\`\`

### 2. Batch DOM Operations
\`\`\`javascript
// ✅ Good - Single animation
anime({
  targets: '.element',
  translateX: 250,
  translateY: 100,
  rotate: 180,
  scale: 1.2,
  duration: 1000
});

// ❌ Avoid - Multiple separate animations
anime({targets: '.element', translateX: 250});
anime({targets: '.element', translateY: 100});
anime({targets: '.element', rotate: 180});
\`\`\`

### 3. Use will-change CSS Property
\`\`\`css
.animated-element {
  will-change: transform, opacity;
}

/* Remove when animation is done */
.animation-complete {
  will-change: auto;
}
\`\`\`

### 4. Limit Concurrent Animations
\`\`\`javascript
// ✅ Good - Use timeline for sequences
const tl = anime.timeline();
tl.add({targets: '.el1', translateX: 100})
  .add({targets: '.el2', translateX: 100}, '-=500');

// ❌ Avoid - Too many concurrent animations
for(let i = 0; i < 100; i++) {
  anime({targets: \`.item-\${i}\`, rotate: 360});
}
\`\`\`

## Memory Management

### Remove Completed Animations
\`\`\`javascript
const animation = anime({
  targets: '.element',
  translateX: 250,
  complete: () => {
    // Clean up after completion
    anime.remove('.element');
  }
});
\`\`\`

### Use Object Pooling for Particles
\`\`\`javascript
const particlePool = [];

function createParticle() {
  return particlePool.pop() || document.createElement('div');
}

function releaseParticle(particle) {
  anime.remove(particle);
  particlePool.push(particle);
}
\`\`\`

## Optimization Techniques

### 1. Reduce Animation Complexity
\`\`\`javascript
// ✅ Simple easing for performance
anime({
  targets: '.element',
  translateX: 250,
  easing: 'easeOutQuad', // Simple easing
  duration: 1000
});

// ⚠️ Complex easing - use sparingly
anime({
  targets: '.element',
  translateX: 250,
  easing: 'easeOutElastic(1, .6)', // Complex calculation
  duration: 1000
});
\`\`\`

### 2. Use requestAnimationFrame for Custom Updates
\`\`\`javascript
let isAnimating = false;

function updateAnimation() {
  if (!isAnimating) return;
  
  // Your update logic here
  requestAnimationFrame(updateAnimation);
}

// Start/stop efficiently
function startAnimation() {
  isAnimating = true;
  requestAnimationFrame(updateAnimation);
}

function stopAnimation() {
  isAnimating = false;
}
\`\`\`

### 3. Throttle Scroll/Resize Animations
\`\`\`javascript
let ticking = false;

function updateScrollAnimation() {
  // Animation logic
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollAnimation);
    ticking = true;
  }
});
\`\`\`

## Profiling and Debugging

### Monitor Performance
\`\`\`javascript
const animation = anime({
  targets: '.element',
  translateX: 250,
  update: (anim) => {
    // Monitor performance
    console.log('Progress:', anim.progress + '%');
  }
});

// Check animation properties
console.log('Duration:', animation.duration);
console.log('Remaining:', animation.remaining);
\`\`\`

### Use Browser DevTools
- Performance tab to check for jank
- Rendering tab to highlight repaints
- Console timing for animation duration`
    },

    'timeline': {
      title: 'Timeline and Sequencing',
      content: `# Timeline and Sequencing

## Basic Timeline

### Creating a Timeline
\`\`\`javascript
const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});
\`\`\`

### Adding Animations
\`\`\`javascript
tl.add({
  targets: '.title',
  translateY: [-100, 0],
  opacity: [0, 1]
}).add({
  targets: '.subtitle',
  translateX: [-50, 0],
  opacity: [0, 1]
}).add({
  targets: '.button',
  scale: [0, 1]
});
\`\`\`

## Timeline Control

### Playback Control
\`\`\`javascript
tl.play();      // Play timeline
tl.pause();     // Pause timeline
tl.restart();   // Restart timeline
tl.reverse();   // Reverse direction
tl.seek(1500);  // Jump to specific time
\`\`\`

### Timeline Properties
\`\`\`javascript
console.log(tl.duration);    // Total duration
console.log(tl.progress);    // Current progress %
console.log(tl.currentTime); // Current time
console.log(tl.remaining);   // Remaining time
\`\`\`

## Advanced Timing

### Offset Control
\`\`\`javascript
const tl = anime.timeline();

tl.add({
  targets: '.el1',
  translateX: 100
}).add({
  targets: '.el2',
  translateX: 100,
  offset: 500  // Start 500ms after timeline start
}).add({
  targets: '.el3',
  translateX: 100,
  offset: '-=200'  // Start 200ms before previous animation ends
}).add({
  targets: '.el4',
  translateX: 100,
  offset: '+=300'  // Start 300ms after previous animation ends
});
\`\`\`

### Relative Timing
\`\`\`javascript
tl.add({
  targets: '.el1',
  translateX: 100,
  duration: 1000
}).add({
  targets: '.el2',
  translateX: 100,
  offset: '-=800'  // Overlap by 800ms
});
\`\`\`

## Complex Sequences

### Nested Timelines
\`\`\`javascript
// Sub-timeline for intro
const introTl = anime.timeline();
introTl.add({
  targets: '.logo',
  scale: [0, 1],
  duration: 800
}).add({
  targets: '.tagline',
  opacity: [0, 1],
  translateY: [20, 0],
  duration: 600
});

// Main timeline
const mainTl = anime.timeline();
mainTl.add(introTl)  // Add entire intro timeline
  .add({
    targets: '.menu-item',
    translateY: [-30, 0],
    opacity: [0, 1],
    delay: anime.stagger(100),
    duration: 500
  });
\`\`\`

### Conditional Animations
\`\`\`javascript
const tl = anime.timeline();

tl.add({
  targets: '.element',
  translateX: 100
});

// Add animation based on condition
if (window.innerWidth > 768) {
  tl.add({
    targets: '.desktop-only',
    opacity: [0, 1]
  });
}
\`\`\`

## Timeline Callbacks

### Timeline-level Callbacks
\`\`\`javascript
const tl = anime.timeline({
  begin: () => console.log('Timeline started'),
  update: (tl) => console.log('Progress:', tl.progress + '%'),
  complete: () => console.log('Timeline completed'),
  loopBegin: () => console.log('Loop started'),
  loopComplete: () => console.log('Loop completed')
});
\`\`\`

### Animation-level Callbacks in Timeline
\`\`\`javascript
tl.add({
  targets: '.element',
  translateX: 100,
  begin: () => console.log('This animation started'),
  complete: () => console.log('This animation completed')
});
\`\`\`

## Practical Examples

### Page Load Sequence
\`\`\`javascript
const pageLoadTl = anime.timeline({
  easing: 'easeOutExpo'
});

pageLoadTl
  .add({
    targets: '.header',
    translateY: [-100, 0],
    opacity: [0, 1],
    duration: 800
  })
  .add({
    targets: '.hero-title',
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 600,
    offset: '-=400'
  })
  .add({
    targets: '.hero-subtitle',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 500,
    offset: '-=200'
  })
  .add({
    targets: '.cta-button',
    scale: [0, 1],
    duration: 400,
    offset: '-=100'
  });
\`\`\`

### Staggered Cards with Timeline
\`\`\`javascript
const cardsTl = anime.timeline();

// Animate container first
cardsTl.add({
  targets: '.cards-container',
  opacity: [0, 1],
  duration: 500
});

// Then animate cards with stagger
cardsTl.add({
  targets: '.card',
  translateY: [50, 0],
  scale: [0.8, 1],
  opacity: [0, 1],
  delay: anime.stagger(100),
  duration: 600,
  offset: '-=200'
});
\`\`\``
    },

    'stagger': {
      title: 'Stagger Effects',
      content: `# Stagger Effects

## Basic Stagger

### Simple Delay Stagger
\`\`\`javascript
anime({
  targets: '.item',
  translateY: [50, 0],
  opacity: [0, 1],
  delay: anime.stagger(100) // 100ms delay between each element
});
\`\`\`

### Function-based Stagger
\`\`\`javascript
anime({
  targets: '.item',
  translateY: [50, 0],
  delay: (el, i) => i * 100 // Same as above, manual approach
});
\`\`\`

## Direction Control

### Start Position
\`\`\`javascript
anime({
  targets: '.item',
  scale: [0, 1],
  delay: anime.stagger(50, {
    from: 'first',  // 'first', 'last', 'center', or index number
  })
});

// From specific index
anime({
  targets: '.item',
  opacity: [0, 1],
  delay: anime.stagger(50, {
    from: 3  // Start from the 4th element (0-indexed)
  })
});
\`\`\`

### Direction
\`\`\`javascript
anime({
  targets: '.item',
  translateX: [100, 0],
  delay: anime.stagger(100, {
    direction: 'reverse'  // 'normal' or 'reverse'
  })
});
\`\`\`

## Grid-based Stagger

### Basic Grid
\`\`\`javascript
anime({
  targets: '.grid-item',
  scale: [0, 1],
  delay: anime.stagger(50, {
    grid: [8, 6],    // 8 columns, 6 rows
    from: 'center'   // Start from center
  })
});
\`\`\`

### Grid with Coordinates
\`\`\`javascript
anime({
  targets: '.grid-item',
  rotate: [180, 0],
  delay: anime.stagger(30, {
    grid: [10, 10],
    from: [2, 3]  // Start from grid position [2, 3]
  })
});
\`\`\`

## Advanced Stagger

### Range-based Values
\`\`\`javascript
anime({
  targets: '.item',
  translateX: anime.stagger([-100, 100]), // Distribute values from -100 to 100
  rotate: anime.stagger([0, 360]),        // Distribute rotation values
  delay: anime.stagger(50)
});
\`\`\`

### Easing in Stagger
\`\`\`javascript
anime({
  targets: '.item',
  translateY: [100, 0],
  delay: anime.stagger(50, {
    easing: 'easeOutQuad'  // Easing function for stagger timing
  })
});
\`\`\`

## Complex Stagger Patterns

### Wave Effect
\`\`\`javascript
anime({
  targets: '.wave-item',
  translateY: [
    {value: -40, duration: 600, easing: 'easeOutSine'},
    {value: 0, duration: 600, easing: 'easeInSine'}
  ],
  delay: anime.stagger(100, {
    from: 'center'
  }),
  loop: true
});
\`\`\`

### Ripple Effect
\`\`\`javascript
anime({
  targets: '.ripple-item',
  scale: [
    {value: 1.2, duration: 300, easing: 'easeOutSine'},
    {value: 1, duration: 300, easing: 'easeInSine'}
  ],
  delay: anime.stagger(50, {
    grid: [15, 15],
    from: 'center'
  })
});
\`\`\`

### Random Stagger
\`\`\`javascript
anime({
  targets: '.random-item',
  translateX: () => anime.random(-50, 50),
  translateY: () => anime.random(-50, 50),
  rotate: () => anime.random(0, 360),
  delay: (el, i) => anime.random(0, 1000), // Random delay up to 1 second
  duration: () => anime.random(800, 1200)  // Random duration
});
\`\`\`

## Practical Examples

### Text Reveal
\`\`\`javascript
// Split text into spans first
const textWrapper = document.querySelector('.text');
textWrapper.innerHTML = textWrapper.textContent.replace(/\\S/g, "<span class='letter'>$&</span>");

anime({
  targets: '.text .letter',
  translateY: [100, 0],
  opacity: [0, 1],
  easing: 'easeOutExpo',
  duration: 1400,
  delay: (el, i) => 30 * i
});
\`\`\`

### Loading Dots
\`\`\`javascript
anime({
  targets: '.loading-dot',
  translateY: [-20, 0],
  scale: [1, 1.2, 1],
  delay: anime.stagger(200),
  duration: 600,
  loop: true,
  direction: 'alternate',
  easing: 'easeInOutSine'
});
\`\`\`

### Menu Animation
\`\`\`javascript
anime({
  targets: '.menu-item',
  translateX: [-50, 0],
  opacity: [0, 1],
  delay: anime.stagger(100, {
    from: 'first'
  }),
  duration: 500,
  easing: 'easeOutBack'
});
\`\`\`

### Card Gallery
\`\`\`javascript
anime({
  targets: '.gallery-card',
  translateY: [60, 0],
  scale: [0.9, 1],
  opacity: [0, 1],
  delay: anime.stagger(100, {
    grid: [3, 4],  // 3 columns, 4 rows
    from: 'center'
  }),
  duration: 800,
  easing: 'easeOutElastic(1, .6)'
});
\`\`\``
    }
  };

  const normalizedTopic = topic.toLowerCase().replace(/[-_]/g, '-');
  const doc = docs[normalizedTopic as keyof typeof docs];

  if (!doc) {
    return {
      content: [{
        type: "text",
        text: `Documentation for "${topic}" not found. Available topics:\n\n${Object.keys(docs).map(key => `- ${key}`).join('\n')}\n\nTry searching for topics like: getting-started, animation-controls, easing, performance, timeline, stagger`
      }]
    };
  }

  return {
    content: [{
      type: "text",
      text: doc.content
    }]
  };
}