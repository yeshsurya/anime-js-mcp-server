import { z } from 'zod';
import { cache } from '../../utils/cache.js';
import { logInfo } from '../../utils/logger.js';

export const schema = {
  exampleType: z.string().describe('Type of example (e.g., "basic-transform", "timeline-sequence", "stagger-grid", "svg-path", "morphing")')
};

export async function handleGetAnimeExample(params: { exampleType: string }) {
  const { exampleType } = params;
  
  logInfo(`Getting Anime.js example: ${exampleType}`);

  // Check cache first
  const cacheKey = `anime-example-${exampleType.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const example = getExample(exampleType);
  
  // Cache for 30 minutes
  cache.set(cacheKey, example, 30 * 60 * 1000);
  
  return example;
}

function getExample(exampleType: string) {
  const examples = {
    'basic-transform': {
      title: 'Basic Transform Animation',
      description: 'Simple transform animation with translate, rotate, and scale',
      category: 'Basic',
      code: `anime({
  targets: '.element',
  translateX: 250,
  translateY: -100,
  rotate: '1turn',
  scale: 1.5,
  duration: 2000,
  easing: 'easeInOutQuad',
  complete: () => console.log('Animation completed!')
});`,
      html: `<div class="element">Transform me!</div>`,
      css: `.element {
  width: 50px;
  height: 50px;
  background: #FF6B6B;
  margin: 100px;
}`
    },

    'timeline-sequence': {
      title: 'Timeline Sequence Animation',
      description: 'Sequential animations using timeline with offset control',
      category: 'Timeline',
      code: `const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl.add({
  targets: '.title',
  translateY: [-100, 0],
  opacity: [0, 1]
}).add({
  targets: '.subtitle',
  translateX: [-50, 0],
  opacity: [0, 1],
  offset: '-=600' // Start 600ms before previous animation ends
}).add({
  targets: '.button',
  scale: [0, 1],
  rotate: [180, 0],
  offset: '-=500' // Start 500ms before previous animation ends
});

// Control timeline
tl.play();
// tl.pause();
// tl.restart();`,
      html: `<div class="title">Main Title</div>
<div class="subtitle">Subtitle text</div>
<div class="button">Button</div>`,
      css: `.title, .subtitle, .button {
  margin: 20px;
  padding: 10px;
  background: #4ECDC4;
  display: inline-block;
}`
    },

    'stagger-grid': {
      title: 'Staggered Grid Animation',
      description: 'Grid-based stagger animation from center outward',
      category: 'Stagger',
      code: `anime({
  targets: '.grid .item',
  scale: [0, 1],
  opacity: [0, 1],
  translateY: [50, 0],
  delay: anime.stagger(100, {
    grid: [8, 6], // 8 columns, 6 rows
    from: 'center' // Start from center
  }),
  duration: 800,
  easing: 'easeOutBack'
});

// Alternative: stagger from specific index
anime({
  targets: '.list .item',
  translateX: [-30, 0],
  opacity: [0, 1],
  delay: anime.stagger(100, {
    from: 'first' // or 'last', specific index, or [x,y] coordinates
  })
});`,
      html: `<div class="grid">
  <!-- 48 items (8x6 grid) -->
  <div class="item"></div>
  <div class="item"></div>
  <!-- ... more items ... -->
</div>`,
      css: `.grid {
  display: grid;
  grid-template-columns: repeat(8, 30px);
  gap: 10px;
  padding: 50px;
}

.item {
  width: 30px;
  height: 30px;
  background: #FFE66D;
}`
    },

    'svg-path': {
      title: 'SVG Path Animation',
      description: 'Animate along SVG paths and morph shapes',
      category: 'SVG',
      code: `// Path drawing animation
anime({
  targets: 'path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: (el, i) => i * 250
});

// Element following path
const path = anime.path('svg path');

anime({
  targets: '.element',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  duration: 3000,
  easing: 'easeInOutQuad',
  loop: true
});

// Path morphing
anime({
  targets: 'path',
  d: [
    { value: 'M12,2 L2,22 L22,22 Z' }, // Triangle
    { value: 'M2,2 L22,2 L22,22 L2,22 Z' } // Square
  ],
  duration: 2000,
  easing: 'easeInOutQuart'
});`,
      html: `<svg width="200" height="200">
  <path d="M50,50 Q100,25 150,50 T250,50" 
        stroke="#FF6B6B" 
        fill="none" 
        stroke-width="3"/>
</svg>
<div class="element">🚀</div>`,
      css: `.element {
  position: absolute;
  font-size: 20px;
}`
    },

    'morphing': {
      title: 'CSS Property Morphing',
      description: 'Animate CSS properties for shape and color morphing',
      category: 'Morphing',
      code: `anime({
  targets: '.morphing-box',
  width: [
    { value: 50, duration: 500 },
    { value: 200, duration: 1000 },
    { value: 100, duration: 500 }
  ],
  height: [
    { value: 50, duration: 500 },
    { value: 200, duration: 1000 },
    { value: 100, duration: 500 }
  ],
  backgroundColor: [
    { value: '#FF6B6B', duration: 500 },
    { value: '#4ECDC4', duration: 1000 },
    { value: '#45B7D1', duration: 500 }
  ],
  borderRadius: [
    { value: '0%', duration: 500 },
    { value: '50%', duration: 1000 },
    { value: '10%', duration: 500 }
  ],
  duration: 2000,
  easing: 'easeInOutElastic(1, .6)',
  loop: true,
  direction: 'alternate'
});`,
      html: `<div class="morphing-box">Morph</div>`,
      css: `.morphing-box {
  width: 50px;
  height: 50px;
  background: #FF6B6B;
  margin: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}`
    },

    'keyframes': {
      title: 'Keyframes Animation',
      description: 'Complex animations using keyframes with different timings',
      category: 'Advanced',
      code: `anime({
  targets: '.keyframe-element',
  keyframes: [
    {translateY: -40, duration: 300},
    {rotateZ: 360, duration: 800, delay: 100},
    {translateY: 0, rotateZ: 0, duration: 800, delay: 100}
  ],
  duration: 2000,
  easing: 'easeOutElastic(1, .8)',
  loop: true
});

// Alternative keyframe syntax
anime({
  targets: '.element',
  translateX: [
    { value: 100, duration: 1200 },
    { value: 0, duration: 800 }
  ],
  rotate: [
    { value: '1turn', duration: 1800, easing: 'easeInOutSine' }
  ],
  scale: [
    { value: 2, duration: 1600, delay: 600, easing: 'easeInOutQuart' },
    { value: 1, duration: 800, easing: 'easeOutQuart' }
  ]
});`,
      html: `<div class="keyframe-element">Keyframes</div>`,
      css: `.keyframe-element {
  width: 60px;
  height: 60px;
  background: #96CEB4;
  margin: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}`
    },

    'text-animation': {
      title: 'Text Animation',
      description: 'Animate text letter by letter with stagger effects',
      category: 'Text',
      code: `// Split text into spans
const textWrapper = document.querySelector('.text-animation');
textWrapper.innerHTML = textWrapper.textContent.replace(/\\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.text-animation .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.text-animation',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Another text effect
anime({
  targets: '.floating-letters .letter',
  translateY: [
    {value: -100, easing: 'easeOutSine', duration: 300},
    {value: 0, easing: 'easeInSine', duration: 300}
  ],
  opacity: [
    {value: [0, 1], easing: 'easeOutSine', duration: 300}
  ],
  delay: anime.stagger(100, {start: 500})
});`,
      html: `<div class="text-animation">Hello World!</div>
<div class="floating-letters">
  <span class="letter">F</span>
  <span class="letter">L</span>
  <span class="letter">O</span>
  <span class="letter">A</span>
  <span class="letter">T</span>
</div>`,
      css: `.text-animation, .floating-letters {
  font-size: 3em;
  font-weight: bold;
  margin: 50px;
  color: #333;
}

.letter {
  display: inline-block;
  line-height: 1em;
}`
    },

    'elastic-bounce': {
      title: 'Elastic and Bounce Effects',
      description: 'Using elastic and bounce easing functions for dynamic effects',
      category: 'Easing',
      code: `// Elastic effect
anime({
  targets: '.elastic',
  translateX: 300,
  scale: 2,
  rotate: 180,
  easing: 'easeOutElastic(1, .8)',
  duration: 1500
});

// Bounce effect
anime({
  targets: '.bounce',
  translateY: -150,
  direction: 'alternate',
  loop: true,
  easing: 'easeOutBounce',
  duration: 800
});

// Custom spring physics
anime({
  targets: '.spring',
  translateX: 250,
  scale: [0.2, 1],
  easing: 'spring(1, 80, 10, 0)',
  duration: anime.random(1200, 1800)
});

// Combining multiple easing functions
anime({
  targets: '.mixed-easing',
  translateX: [
    {value: 100, easing: 'easeOutExpo', duration: 800},
    {value: 200, easing: 'easeInBounce', duration: 600},
    {value: 0, easing: 'easeOutElastic(1, 0.5)', duration: 1000}
  ]
});`,
      html: `<div class="elastic">Elastic</div>
<div class="bounce">Bounce</div>
<div class="spring">Spring</div>
<div class="mixed-easing">Mixed</div>`,
      css: `.elastic, .bounce, .spring, .mixed-easing {
  width: 50px;
  height: 50px;
  margin: 20px 50px;
  background: #FD79A8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  border-radius: 5px;
}`
    }
  };

  const normalizedType = exampleType.toLowerCase().replace(/[-_]/g, '-');
  const example = examples[normalizedType as keyof typeof examples];

  if (!example) {
    return {
      content: [{
        type: "text",
        text: `Example "${exampleType}" not found. Available examples:\n\n${Object.keys(examples).map(key => `- ${key}`).join('\n')}`
      }]
    };
  }

  let content = `# ${example.title}\n\n`;
  content += `**Category:** ${example.category}\n\n`;
  content += `**Description:** ${example.description}\n\n`;
  
  content += `## JavaScript\n\`\`\`javascript\n${example.code}\n\`\`\`\n\n`;
  
  if (example.html) {
    content += `## HTML\n\`\`\`html\n${example.html}\n\`\`\`\n\n`;
  }
  
  if (example.css) {
    content += `## CSS\n\`\`\`css\n${example.css}\n\`\`\`\n\n`;
  }

  content += `## Usage Notes\n`;
  content += `- Include Anime.js library: \`<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>\`\n`;
  content += `- Or via npm: \`npm install animejs\` then \`import anime from 'animejs/lib/anime.es.js'\`\n`;

  return {
    content: [{
      type: "text",
      text: content
    }]
  };
}