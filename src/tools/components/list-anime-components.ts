import { z } from 'zod';
import { cache } from '../../utils/cache.js';
import { logInfo } from '../../utils/logger.js';

export const schema = {
  category: z.string().optional().describe('Filter by category (core, timeline, utilities, svg)')
};

export async function handleListAnimeComponents(params: { category?: string }) {
  const { category } = params;
  
  logInfo(`Listing Anime.js components${category ? ` for category: ${category}` : ''}`);

  // Check cache first
  const cacheKey = `anime-components-list-${category || 'all'}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const components = getAllComponents();
  let filteredComponents = components;
  
  if (category) {
    filteredComponents = components.filter(comp => comp.category.toLowerCase() === category.toLowerCase());
  }

  const result = {
    content: [{
      type: "text",
      text: formatComponentsList(filteredComponents, category)
    }]
  };
  
  // Cache for 1 hour
  cache.set(cacheKey, result, 60 * 60 * 1000);
  
  return result;
}

function getAllComponents() {
  return [
    {
      name: 'anime()',
      category: 'core',
      description: 'Main animation function for creating animations',
      syntax: 'anime(animationObject)',
      features: ['Element targeting', 'Property animation', 'Easing functions', 'Callbacks']
    },
    {
      name: 'anime.timeline()',
      category: 'timeline',
      description: 'Create and control sequences of animations',
      syntax: 'anime.timeline(parameters)',
      features: ['Sequential animations', 'Timeline control', 'Offset management', 'Nested timelines']
    },
    {
      name: 'anime.stagger()',
      category: 'utilities',
      description: 'Create staggered delays for multiple elements',
      syntax: 'anime.stagger(value, options)',
      features: ['Grid-based stagger', 'Direction control', 'Custom starting points', 'Easing functions']
    },
    {
      name: 'anime.path()',
      category: 'svg',
      description: 'Create path-based animations for SVG elements',
      syntax: 'anime.path(pathElement)',
      features: ['SVG path following', 'Position tracking', 'Rotation alignment', 'Custom properties']
    },
    {
      name: 'anime.random()',
      category: 'utilities',
      description: 'Generate random values for animations',
      syntax: 'anime.random(min, max)',
      features: ['Random value generation', 'Range specification', 'Function callbacks', 'Dynamic properties']
    },
    {
      name: 'anime.set()',
      category: 'utilities',
      description: 'Set CSS properties without animation',
      syntax: 'anime.set(targets, properties)',
      features: ['Instant property setting', 'No animation', 'Multiple targets', 'CSS property support']
    },
    {
      name: 'anime.get()',
      category: 'utilities',
      description: 'Get current CSS property values',
      syntax: 'anime.get(targets, property)',
      features: ['Property value retrieval', 'Multiple targets', 'Computed values', 'Transform values']
    },
    {
      name: 'anime.remove()',
      category: 'utilities',
      description: 'Remove animations from elements',
      syntax: 'anime.remove(targets)',
      features: ['Animation cleanup', 'Memory management', 'Multiple targets', 'Instant removal']
    }
  ];
}

function formatComponentsList(components: any[], category?: string) {
  let content = `# Anime.js Components${category ? ` - ${category.charAt(0).toUpperCase() + category.slice(1)} Category` : ''}\n\n`;
  
  if (category) {
    content += `Showing ${components.length} component(s) in the "${category}" category.\n\n`;
  } else {
    content += `Total: ${components.length} components available\n\n`;
  }

  // Group by category if showing all
  if (!category) {
    const categories = ['core', 'timeline', 'utilities', 'svg'];
    
    categories.forEach(cat => {
      const categoryComponents = components.filter(comp => comp.category === cat);
      if (categoryComponents.length > 0) {
        content += `## ${cat.charAt(0).toUpperCase() + cat.slice(1)} (${categoryComponents.length})\n\n`;
        categoryComponents.forEach(comp => {
          content += formatComponent(comp);
        });
        content += '\n';
      }
    });
  } else {
    // Show components in selected category
    components.forEach(comp => {
      content += formatComponent(comp);
    });
  }

  if (components.length === 0) {
    content += `No components found for category "${category}". Available categories: core, timeline, utilities, svg\n`;
  }

  return content;
}

function formatComponent(comp: any) {
  let content = `### ${comp.name}\n`;
  content += `**Description:** ${comp.description}\n`;
  content += `**Syntax:** \`${comp.syntax}\`\n`;
  content += `**Features:** ${comp.features.join(', ')}\n\n`;
  return content;
}