/**
 * Prompts for the Anime.js MCP server
 * 
 * Prompts provide guided assistance for using Anime.js features and creating animations.
 */

export const prompts = {
  animation_tutorial: {
    name: "animation_tutorial",
    description: "Get a step-by-step tutorial for creating animations with Anime.js",
    arguments: {
      animationType: {
        type: "string",
        description: "Type of animation (e.g., 'transform', 'timeline', 'morphing', 'stagger')"
      }
    }
  },
  component_usage: {
    name: "component_usage",
    description: "Get usage examples for a specific Anime.js feature or API",
    arguments: {
      componentName: {
        type: "string",
        description: "Name of the Anime.js feature or API to get usage for"
      }
    }
  },
  performance_optimization: {
    name: "performance_optimization",
    description: "Get performance optimization tips for Anime.js animations",
    arguments: {
      useCase: {
        type: "string",
        description: "Specific use case or performance concern"
      }
    }
  }
};

export const promptHandlers = {
  animation_tutorial: (args: { animationType?: string }) => {
    const animationType = args.animationType || 'basic';
    
    const tutorials = {
      transform: `# Anime.js Transform Animation Tutorial

## Step 1: Basic Setup
\`\`\`javascript
import anime from 'animejs/lib/anime.es.js';

const element = document.querySelector('.my-element');
\`\`\`

## Step 2: Create Transform Animation
\`\`\`javascript
anime({
  targets: '.my-element',
  translateX: 250,
  rotate: '1turn',
  scale: 2,
  duration: 2000,
  easing: 'easeInOutQuad'
});
\`\`\`

## Step 3: Multiple Transforms
\`\`\`javascript
anime({
  targets: '.box',
  translateX: [0, 250],
  translateY: [0, -150],
  rotateZ: '1turn',
  scale: [1, 1.5],
  duration: 3000,
  easing: 'easeOutElastic(1, .8)'
});
\`\`\`

## Advanced: Custom Easing
\`\`\`javascript
anime({
  targets: '.element',
  translateX: 300,
  easing: 'cubicBezier(.5, .05, .1, .3)',
  duration: 2000
});
\`\`\``,
      
      timeline: `# Anime.js Timeline Tutorial

## Step 1: Create Timeline
\`\`\`javascript
const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});
\`\`\`

## Step 2: Add Sequential Animations
\`\`\`javascript
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
});
\`\`\`

## Step 3: Control Timeline
\`\`\`javascript
// Play timeline
tl.play();

// Pause timeline  
tl.pause();

// Restart timeline
tl.restart();
\`\`\``,

      stagger: `# Anime.js Stagger Animation Tutorial

## Step 1: Basic Stagger
\`\`\`javascript
anime({
  targets: '.item',
  translateY: [-40, 0],
  opacity: [0, 1],
  delay: anime.stagger(100)
});
\`\`\`

## Step 2: Direction-based Stagger
\`\`\`javascript
anime({
  targets: '.grid .item',
  scale: [0, 1],
  delay: anime.stagger(100, {grid: [14, 5], from: 'center'})
});
\`\`\`

## Step 3: Complex Stagger Patterns
\`\`\`javascript
anime({
  targets: '.letter',
  translateY: [50, 0],
  opacity: [0, 1],
  easing: 'easeOutExpo',
  duration: 1400,
  delay: (el, i) => 30 * i
});
\`\`\``,

      basic: `# Basic Anime.js Animation Tutorial

## Step 1: Install Anime.js
\`\`\`bash
npm install animejs
\`\`\`

## Step 2: Import and Use
\`\`\`javascript
import anime from 'animejs/lib/anime.es.js';

anime({
  targets: '.my-element',
  translateX: 250,
  duration: 2000
});
\`\`\`

## Step 3: Add Easing
\`\`\`javascript
anime({
  targets: '.element',
  rotate: '1turn',
  easing: 'easeInOutSine',
  duration: 3000
});
\`\`\`

## Step 4: Use Callbacks
\`\`\`javascript
anime({
  targets: '.box',
  scale: 2,
  duration: 1000,
  complete: () => console.log('Animation completed!')
});
\`\`\``
    };

    return {
      description: `Tutorial for ${animationType} animations with Anime.js`,
      messages: [
        {
          role: "assistant",
          content: {
            type: "text",
            text: tutorials[animationType as keyof typeof tutorials] || tutorials.basic
          }
        }
      ]
    };
  },

  component_usage: (args: { componentName?: string }) => {
    const componentName = args.componentName || 'anime';
    
    const examples = {
      anime: `# Using anime() Function

## Basic Usage
\`\`\`javascript
anime({
  targets: '.element',
  translateX: 250,
  duration: 2000
});
\`\`\`

## With Multiple Properties
\`\`\`javascript
anime({
  targets: '.box',
  translateX: 300,
  rotate: '2turn',
  scale: 1.5,
  duration: 3000,
  easing: 'easeInOutQuad'
});
\`\`\``,

      timeline: `# Using anime.timeline()

## Creating Timeline
\`\`\`javascript
const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl.add({
  targets: '.element1',
  translateX: 250
}).add({
  targets: '.element2',
  translateY: 50,
  offset: '-=600'
});
\`\`\``,

      stagger: `# Using anime.stagger()

## Basic Stagger
\`\`\`javascript
anime({
  targets: '.item',
  translateY: 50,
  delay: anime.stagger(100)
});
\`\`\`

## Grid Stagger
\`\`\`javascript
anime({
  targets: '.grid-item',
  scale: [0, 1],
  delay: anime.stagger(50, {grid: [10, 10], from: 'center'})
});
\`\`\``
    };

    return {
      description: `Usage examples for ${componentName}`,
      messages: [
        {
          role: "assistant", 
          content: {
            type: "text",
            text: examples[componentName as keyof typeof examples] || examples.anime
          }
        }
      ]
    };
  },

  performance_optimization: (args: { useCase?: string }) => {
    const useCase = args.useCase || 'general';
    
    return {
      description: `Performance optimization tips for ${useCase} use cases`,
      messages: [
        {
          role: "assistant",
          content: {
            type: "text", 
            text: `# Anime.js Performance Optimization

## General Best Practices
1. **Use CSS transforms** instead of changing layout properties
2. **Batch animations** using timelines
3. **Use hardware acceleration** with transform3d
4. **Limit concurrent animations** to avoid performance issues
5. **Use will-change CSS property** for animated elements

## Code Examples
\`\`\`javascript
// Good: Use transforms
anime({
  targets: '.element',
  translateX: 250,
  scale: 1.2
});

// Avoid: Layout-triggering properties
anime({
  targets: '.element', 
  left: 250,  // Triggers layout
  width: 300  // Triggers layout
});
\`\`\`

## Hardware Acceleration
\`\`\`css
.animated-element {
  will-change: transform;
  transform: translateZ(0); /* Force GPU layer */
}
\`\`\`

## Memory Management
\`\`\`javascript
// Remove animations when done
const animation = anime({
  targets: '.element',
  translateX: 250
});

animation.finished.then(() => {
  anime.remove('.element');
});
\`\`\``
          }
        }
      ]
    };
  }
};