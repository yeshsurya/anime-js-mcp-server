/**
 * Resource templates for the Anime.js MCP server
 * 
 * Resource templates allow for dynamic generation of resources based on patterns.
 * These are used for generating component-specific documentation and examples.
 */

export const resourceTemplates = [
  {
    uriTemplate: "anime://component/{componentName}",
    name: "Anime.js Component Documentation",
    description: "Get detailed documentation for a specific Anime.js component or API",
    mimeType: "text/plain"
  },
  {
    uriTemplate: "anime://example/{exampleType}",
    name: "Anime.js Example Code",
    description: "Get example code for specific animation patterns",
    mimeType: "text/javascript"
  }
];

export const getResourceTemplate = (uri: string): (() => { contentType: string; content: string }) | null => {
  // Component documentation
  const componentMatch = uri.match(/^anime:\/\/component\/(.+)$/);
  if (componentMatch) {
    const componentName = componentMatch[1];
    return () => generateComponentDoc(componentName);
  }

  // Example code
  const exampleMatch = uri.match(/^anime:\/\/example\/(.+)$/);
  if (exampleMatch) {
    const exampleType = exampleMatch[1];
    return () => generateExampleCode(exampleType);
  }

  return null;
};

function generateComponentDoc(componentName: string): { contentType: string; content: string } {
  const docs = {
    'anime': `# anime() Function

The main function for creating animations in Anime.js.

## Syntax
\`\`\`javascript
anime(animationObject)
\`\`\`

## Parameters
- **targets**: CSS selector, DOM element, or array of elements to animate
- **properties**: Animation properties (translateX, rotate, scale, etc.)
- **duration**: Animation duration in milliseconds
- **easing**: Easing function name or custom bezier curve
- **delay**: Delay before animation starts
- **direction**: 'normal', 'reverse', 'alternate'
- **loop**: Boolean or number of loops
- **autoplay**: Boolean, whether to start automatically

## Example
\`\`\`javascript
anime({
  targets: '.element',
  translateX: 250,
  rotate: '1turn',
  duration: 2000,
  easing: 'easeInOutQuad',
  complete: () => console.log('Done!')
});
\`\`\``,

    'timeline': `# anime.timeline()

Creates a timeline for sequencing multiple animations.

## Syntax
\`\`\`javascript
anime.timeline(parameters)
\`\`\`

## Parameters
- **easing**: Default easing for all animations in timeline
- **duration**: Default duration for all animations
- **direction**: Default direction for all animations
- **loop**: Whether to loop the entire timeline
- **autoplay**: Whether to start automatically

## Methods
- **add()**: Add animation to timeline
- **play()**: Play timeline
- **pause()**: Pause timeline
- **restart()**: Restart timeline
- **reverse()**: Reverse timeline

## Example
\`\`\`javascript
const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl.add({
  targets: '.title',
  translateY: [-100, 0]
}).add({
  targets: '.subtitle',
  translateX: [-50, 0],
  offset: '-=600'
});
\`\`\``,

    'stagger': `# anime.stagger()

Creates staggered delays for multiple elements.

## Syntax
\`\`\`javascript
anime.stagger(value, options)
\`\`\`

## Parameters
- **value**: Base delay value in milliseconds
- **options**: Stagger configuration object
  - **grid**: [columns, rows] for grid-based stagger
  - **from**: Starting point ('first', 'last', 'center', index, or [x,y])
  - **direction**: 'normal' or 'reverse'
  - **easing**: Easing function for the stagger

## Examples
\`\`\`javascript
// Basic stagger
anime({
  targets: '.item',
  translateY: 50,
  delay: anime.stagger(100)
});

// Grid stagger from center
anime({
  targets: '.grid-item',
  scale: [0, 1],
  delay: anime.stagger(50, {grid: [10, 10], from: 'center'})
});
\`\`\``
  };

  return {
    contentType: "text/plain",
    content: docs[componentName as keyof typeof docs] || `# ${componentName}\n\nDocumentation for ${componentName} is not available.`
  };
}

function generateExampleCode(exampleType: string): { contentType: string; content: string } {
  const examples = {
    'basic-transform': `// Basic transform animation
anime({
  targets: '.element',
  translateX: 250,
  translateY: -100,
  rotate: '1turn',
  scale: 1.5,
  duration: 2000,
  easing: 'easeInOutQuad'
});`,

    'timeline-sequence': `// Timeline with sequential animations
const tl = anime.timeline({
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
  rotate: [180, 0],
  offset: '-=500'
});`,

    'stagger-grid': `// Staggered grid animation
anime({
  targets: '.grid .item',
  scale: [0, 1],
  opacity: [0, 1],
  translateY: [50, 0],
  delay: anime.stagger(100, {
    grid: [8, 6], 
    from: 'center'
  }),
  duration: 800,
  easing: 'easeOutBack'
});`,

    'svg-path': `// SVG path animation
anime({
  targets: 'path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: (el, i) => i * 250
});`,

    'morphing': `// CSS property morphing
anime({
  targets: '.box',
  width: [50, 200],
  height: [50, 200], 
  backgroundColor: '#FF6B6B',
  borderRadius: ['0%', '50%'],
  duration: 2000,
  easing: 'easeInOutElastic(1, .6)'
});`
  };

  return {
    contentType: "text/javascript",
    content: examples[exampleType as keyof typeof examples] || `// Example for ${exampleType} not found`
  };
}