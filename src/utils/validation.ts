import { z } from 'zod';
import { logWarning } from './logger.js';

// Common validation schemas
const stringSchema = z.string().min(1).max(1000);
const optionalStringSchema = z.string().optional();

const methodSchemas = {
  get_anime_component: z.object({
    componentName: stringSchema
  }),
  list_anime_components: z.object({
    category: optionalStringSchema
  }),
  get_anime_example: z.object({
    exampleType: stringSchema
  }),
  search_anime_examples: z.object({
    query: stringSchema
  }),
  get_anime_docs: z.object({
    topic: stringSchema
  }),
  list_resources: z.object({}),
  list_resource_templates: z.object({}),
  list_tools: z.object({}),
  list_prompts: z.object({}),
  read_resource: z.object({
    uri: stringSchema
  }),
  get_prompt: z.object({
    name: stringSchema,
    arguments: z.any().optional()
  }),
  call_tool: z.object({
    name: stringSchema,
    arguments: z.any().optional()
  })
};

export function validateAndSanitizeParams(method: string, params: any): any {
  const schema = methodSchemas[method as keyof typeof methodSchemas];
  
  if (!schema) {
    logWarning(`No validation schema found for method: ${method}`);
    return params || {};
  }

  try {
    return schema.parse(params || {});
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = `Validation failed for ${method}: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`;
      throw new Error(errorMessage);
    }
    throw error;
  }
}

export function sanitizeString(input: string): string {
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .substring(0, 1000);
}