import { z } from 'zod';
import { cache } from '../../utils/cache.js';
import { logInfo } from '../../utils/logger.js';

export const schema = {
  componentName: z.string().describe('Name of the Anime.js component or API (e.g., "anime", "timeline", "stagger")')
};

export async function handleGetAnimeComponent(params: { componentName: string }) {
  const { componentName } = params;
  
  logInfo(`Getting Anime.js component: ${componentName}`);

  // Check cache first
  const cacheKey = `anime-component-${componentName.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const componentInfo = getComponentInfo(componentName);
  
  // Cache for 30 minutes
  cache.set(cacheKey, componentInfo, 30 * 60 * 1000);
  
  return componentInfo;
}

function getComponentInfo(componentName: string) {
  const components = {
    'anime': {
      name: 'anime()',
      type: 'Main Animation Function',
      description: 'The primary function for creating animations in Anime.js',
      syntax: 'anime(animationObject)',
      parameters: [
        { name: 'targets', type: 'string | Element | NodeList | Array', description: 'CSS selector or DOM elements to animate' },
        { name: 'duration', type: 'number', description: 'Animation duration in milliseconds', default: '1000' },
        { name: 'easing', type: 'string | Array', description: 'Easing function', default: 'easeOutElastic' },
        { name: 'delay', type: 'number | Function', description: 'Delay before animation starts', default: '0' },
        { name: 'direction', type: 'string', description: 'Animation direction', default: 'normal' },
        { name: 'loop', type: 'boolean | number', description: 'Loop animation', default: 'false' },
        { name: 'autoplay', type: 'boolean', description: 'Start animation automatically', default: 'true' }
      ],
      properties: [
        'translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ',
        'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY', 'opacity',
        'backgroundColor', 'color', 'borderRadius', 'width', 'height', 'left', 'top'
      ],
      methods: [
        'play()', 'pause()', 'restart()', 'reverse()', 'seek(time)', 'remove()'
      ],
      callbacks: [
        'update', 'begin', 'complete', 'loopBegin', 'loopComplete', 'change', 'changeBegin', 'changeComplete'
      ],
      example: `anime({
  targets: '.element',
  translateX: 250,
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 2000,
  easing: 'easeInOutQuad',
  complete: () => console.log('Animation finished!')
});`
    },

    'timeline': {
      name: 'anime.timeline()',
      type: 'Timeline Function',
      description: 'Create and control a sequence of animations',
      syntax: 'anime.timeline(parameters)',
      parameters: [
        { name: 'easing', type: 'string', description: 'Default easing for all animations' },
        { name: 'duration', type: 'number', description: 'Default duration for all animations' },
        { name: 'direction', type: 'string', description: 'Default direction for all animations' },
        { name: 'loop', type: 'boolean | number', description: 'Loop the entire timeline' },
        { name: 'autoplay', type: 'boolean', description: 'Start timeline automatically', default: 'true' }
      ],
      methods: [
        'add(animation, offset)', 'play()', 'pause()', 'restart()', 'reverse()', 'seek(time)'
      ],
      example: `const tl = anime.timeline({
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
  offset: '-=600'
}).add({
  targets: '.button',
  scale: [0, 1],
  offset: '-=500'
});`
    },

    'stagger': {
      name: 'anime.stagger()',
      type: 'Stagger Function', 
      description: 'Create staggered delays for multiple elements',
      syntax: 'anime.stagger(value, options)',
      parameters: [
        { name: 'value', type: 'number', description: 'Base delay value in milliseconds' },
        { name: 'grid', type: 'Array', description: '[columns, rows] for grid-based stagger' },
        { name: 'from', type: 'string | number | Array', description: 'Starting point for stagger' },
        { name: 'direction', type: 'string', description: 'Stagger direction', default: 'normal' },
        { name: 'easing', type: 'string', description: 'Easing function for stagger values' }
      ],
      example: `// Basic stagger
anime({
  targets: '.item',
  translateY: 50,
  delay: anime.stagger(100)
});

// Grid stagger
anime({
  targets: '.grid-item',
  scale: [0, 1],
  delay: anime.stagger(50, {
    grid: [10, 10],
    from: 'center'
  })
});`
    },

    'path': {
      name: 'anime.path()',
      type: 'SVG Path Function',
      description: 'Create path-based animations for SVG elements',
      syntax: 'anime.path(pathElement)',
      parameters: [
        { name: 'pathElement', type: 'string | Element', description: 'SVG path element or selector' }
      ],
      properties: [
        'translateX', 'translateY', 'rotate'
      ],
      example: `const path = anime.path('svg path');

anime({
  targets: '.element',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  duration: 3000,
  easing: 'easeInOutQuad'
});`
    },

    'random': {
      name: 'anime.random()',
      type: 'Utility Function',
      description: 'Generate random values for animations',
      syntax: 'anime.random(min, max)',
      parameters: [
        { name: 'min', type: 'number', description: 'Minimum value' },
        { name: 'max', type: 'number', description: 'Maximum value' }
      ],
      example: `anime({
  targets: '.element',
  translateX: () => anime.random(-100, 100),
  translateY: () => anime.random(-100, 100),
  scale: () => anime.random(0.5, 2),
  duration: 2000
});`
    }
  };

  const normalizedName = componentName.toLowerCase().replace(/[()]/g, '');
  const component = components[normalizedName as keyof typeof components];

  if (!component) {
    return {
      content: [{
        type: "text",
        text: `Component "${componentName}" not found. Available components: ${Object.keys(components).join(', ')}`
      }]
    };
  }

  let content = `# ${component.name}\n\n`;
  content += `**Type:** ${component.type}\n\n`;
  content += `**Description:** ${component.description}\n\n`;
  content += `**Syntax:** \`${component.syntax}\`\n\n`;

  if (component.parameters) {
    content += `## Parameters\n\n`;
    component.parameters.forEach(param => {
      content += `- **${param.name}** (${param.type}): ${param.description}`;
      if ('default' in param && param.default) content += ` - Default: \`${param.default}\``;
      content += `\n`;
    });
    content += `\n`;
  }

  if ('properties' in component && component.properties) {
    content += `## Animatable Properties\n\n`;
    content += component.properties.map((prop: string) => `- ${prop}`).join('\n') + '\n\n';
  }

  if ('methods' in component && component.methods) {
    content += `## Methods\n\n`;
    content += component.methods.map((method: string) => `- ${method}`).join('\n') + '\n\n';
  }

  if ('callbacks' in component && component.callbacks) {
    content += `## Callbacks\n\n`;
    content += component.callbacks.map((callback: string) => `- ${callback}`).join('\n') + '\n\n';
  }

  if (component.example) {
    content += `## Example\n\n\`\`\`javascript\n${component.example}\n\`\`\`\n`;
  }

  return {
    content: [{
      type: "text",
      text: content
    }]
  };
}