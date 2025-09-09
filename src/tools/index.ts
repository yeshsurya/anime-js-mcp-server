import { handleGetAnimeComponent } from './components/get-anime-component.js';
import { handleListAnimeComponents } from './components/list-anime-components.js';
import { handleGetAnimeExample } from './examples/get-anime-example.js';
import { handleSearchAnimeExamples } from './examples/search-anime-examples.js';
import { handleGetAnimeDocs } from './repository/get-anime-docs.js';

import { schema as getAnimeComponentSchema } from './components/get-anime-component.js';
import { schema as listAnimeComponentsSchema } from './components/list-anime-components.js';
import { schema as getAnimeExampleSchema } from './examples/get-anime-example.js';
import { schema as searchAnimeExamplesSchema } from './examples/search-anime-examples.js';
import { schema as getAnimeDocsSchema } from './repository/get-anime-docs.js';

export const toolHandlers = {
  get_anime_component: handleGetAnimeComponent,
  list_anime_components: handleListAnimeComponents,
  get_anime_example: handleGetAnimeExample,
  search_anime_examples: handleSearchAnimeExamples,
  get_anime_docs: handleGetAnimeDocs
};

export const toolSchemas = {
  get_anime_component: getAnimeComponentSchema,
  list_anime_components: listAnimeComponentsSchema,
  get_anime_example: getAnimeExampleSchema,
  search_anime_examples: searchAnimeExamplesSchema,
  get_anime_docs: getAnimeDocsSchema
};

export const tools = {
  'get_anime_component': {
    name: 'get_anime_component',
    description: 'Get information and examples for a specific Anime.js component or API',
    inputSchema: {
      type: 'object',
      properties: getAnimeComponentSchema,
      required: ['componentName']
    }
  },
  'list_anime_components': {
    name: 'list_anime_components',
    description: 'Get all available Anime.js components and APIs',
    inputSchema: {
      type: 'object',
      properties: listAnimeComponentsSchema
    }
  },
  'get_anime_example': {
    name: 'get_anime_example',
    description: 'Get example code for a specific Anime.js animation pattern',
    inputSchema: {
      type: 'object',
      properties: getAnimeExampleSchema,
      required: ['exampleType']
    }
  },
  'search_anime_examples': {
    name: 'search_anime_examples',
    description: 'Search Anime.js examples and code snippets',
    inputSchema: {
      type: 'object',
      properties: searchAnimeExamplesSchema,
      required: ['query']
    }
  },
  'get_anime_docs': {
    name: 'get_anime_docs',
    description: 'Get documentation for Anime.js features and concepts',
    inputSchema: {
      type: 'object',
      properties: getAnimeDocsSchema,
      required: ['topic']
    }
  }
};