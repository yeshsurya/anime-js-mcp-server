import { z } from 'zod';
import { cache } from '../../utils/cache.js';
import { logInfo } from '../../utils/logger.js';

export const schema = {
  query: z.string().describe('Search query for examples')
};

export async function handleSearchAnimeExamples(params: { query: string }) {
  const { query } = params;
  
  logInfo(`Searching Anime.js examples for: ${query}`);

  // Check cache first
  const cacheKey = `anime-examples-search-${query.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const results = searchExamples(query);
  
  // Cache for 15 minutes
  cache.set(cacheKey, results, 15 * 60 * 1000);
  
  return results;
}

function searchExamples(query: string) {
  const examples = [
    {
      id: 'basic-transform',
      title: 'Basic Transform Animation',
      description: 'Simple transform animation with translate, rotate, and scale',
      category: 'Basic',
      tags: ['transform', 'translate', 'rotate', 'scale', 'basic', 'simple'],
      code: `anime({
  targets: '.element',
  translateX: 250,
  rotate: '1turn',
  scale: 1.5,
  duration: 2000
});`
    },
    {
      id: 'timeline-sequence',
      title: 'Timeline Sequence Animation',
      description: 'Sequential animations using timeline with offset control',
      category: 'Timeline',
      tags: ['timeline', 'sequence', 'sequential', 'offset', 'chain'],
      code: `const tl = anime.timeline();
tl.add({
  targets: '.title',
  translateY: [-100, 0]
}).add({
  targets: '.subtitle',
  translateX: [-50, 0],
  offset: '-=600'
});`
    },
    {
      id: 'stagger-grid',
      title: 'Staggered Grid Animation',
      description: 'Grid-based stagger animation from center outward',
      category: 'Stagger',
      tags: ['stagger', 'grid', 'delay', 'multiple', 'elements'],
      code: `anime({
  targets: '.grid .item',
  scale: [0, 1],
  delay: anime.stagger(100, {
    grid: [8, 6],
    from: 'center'
  })
});`
    },
    {
      id: 'svg-path',
      title: 'SVG Path Animation',
      description: 'Animate along SVG paths and draw strokes',
      category: 'SVG',
      tags: ['svg', 'path', 'stroke', 'draw', 'morphing', 'vector'],
      code: `anime({
  targets: 'path',
  strokeDashoffset: [anime.setDashoffset, 0],
  duration: 1500
});`
    },
    {
      id: 'morphing',
      title: 'CSS Property Morphing',
      description: 'Animate CSS properties for shape and color morphing',
      category: 'Morphing',
      tags: ['morph', 'css', 'properties', 'shape', 'color', 'size'],
      code: `anime({
  targets: '.box',
  width: [50, 200],
  backgroundColor: '#FF6B6B',
  borderRadius: ['0%', '50%'],
  duration: 2000
});`
    },
    {
      id: 'keyframes',
      title: 'Keyframes Animation',
      description: 'Complex animations using keyframes with different timings',
      category: 'Advanced',
      tags: ['keyframes', 'complex', 'timing', 'advanced', 'multiple'],
      code: `anime({
  targets: '.element',
  keyframes: [
    {translateY: -40, duration: 300},
    {rotateZ: 360, duration: 800},
    {translateY: 0, duration: 800}
  ]
});`
    },
    {
      id: 'text-animation',
      title: 'Text Animation',
      description: 'Animate text letter by letter with stagger effects',
      category: 'Text',
      tags: ['text', 'letters', 'typography', 'stagger', 'writing'],
      code: `anime({
  targets: '.text .letter',
  translateY: ["1.1em", 0],
  delay: (el, i) => 50 * i
});`
    },
    {
      id: 'elastic-bounce',
      title: 'Elastic and Bounce Effects',
      description: 'Using elastic and bounce easing functions for dynamic effects',
      category: 'Easing',
      tags: ['elastic', 'bounce', 'easing', 'spring', 'physics'],
      code: `anime({
  targets: '.element',
  translateX: 300,
  easing: 'easeOutElastic(1, .8)',
  duration: 1500
});`
    },
    {
      id: 'loading-spinner',
      title: 'Loading Spinner Animation',
      description: 'Create animated loading spinners and loaders',
      category: 'UI',
      tags: ['loading', 'spinner', 'loader', 'ui', 'rotation'],
      code: `anime({
  targets: '.spinner',
  rotate: '1turn',
  duration: 1000,
  loop: true,
  easing: 'linear'
});`
    },
    {
      id: 'button-hover',
      title: 'Button Hover Effects',
      description: 'Interactive button animations on hover and click',
      category: 'Interactive',
      tags: ['button', 'hover', 'click', 'interactive', 'ui'],
      code: `const button = document.querySelector('.button');
button.addEventListener('mouseenter', () => {
  anime({
    targets: button,
    scale: 1.1,
    duration: 300
  });
});`
    },
    {
      id: 'card-flip',
      title: 'Card Flip Animation',
      description: '3D card flip effects with perspective transforms',
      category: '3D',
      tags: ['card', 'flip', '3d', 'perspective', 'transform'],
      code: `anime({
  targets: '.card',
  rotateY: 180,
  duration: 800,
  easing: 'easeInOutQuart'
});`
    },
    {
      id: 'particles',
      title: 'Particle System',
      description: 'Create particle effects with random movements',
      category: 'Effects',
      tags: ['particles', 'random', 'effects', 'system', 'dots'],
      code: `anime({
  targets: '.particle',
  translateX: () => anime.random(-500, 500),
  translateY: () => anime.random(-500, 500),
  scale: () => anime.random(0.1, 2),
  duration: 3000
});`
    }
  ];

  const queryLower = query.toLowerCase();
  const matchedExamples = examples.filter(example => {
    return example.title.toLowerCase().includes(queryLower) ||
           example.description.toLowerCase().includes(queryLower) ||
           example.category.toLowerCase().includes(queryLower) ||
           example.tags.some(tag => tag.includes(queryLower)) ||
           example.code.toLowerCase().includes(queryLower);
  });

  if (matchedExamples.length === 0) {
    return {
      content: [{
        type: "text",
        text: `No examples found for "${query}". Try searching for terms like:\n- transform, rotate, scale\n- timeline, sequence\n- stagger, grid\n- svg, path\n- text, letters\n- elastic, bounce\n- morphing, keyframes`
      }]
    };
  }

  let content = `# Anime.js Examples Search Results\n\n`;
  content += `Found ${matchedExamples.length} example(s) for "${query}":\n\n`;

  matchedExamples.forEach((example, index) => {
    content += `## ${index + 1}. ${example.title}\n`;
    content += `**Category:** ${example.category}\n`;
    content += `**Description:** ${example.description}\n`;
    content += `**Tags:** ${example.tags.join(', ')}\n\n`;
    content += `**Code Preview:**\n\`\`\`javascript\n${example.code}\n\`\`\`\n\n`;
    content += `*Use \`get_anime_example\` with type \`${example.id}\` for complete example*\n\n`;
    content += '---\n\n';
  });

  return {
    content: [{
      type: "text",
      text: content
    }]
  };
}