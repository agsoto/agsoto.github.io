import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'

// Utility function to remove duplicates and normalize tags
function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

// Extract id (slug) without duplicated lang from the file path
function extractId(filePath) {
  const parsedPath = path.parse(filePath);
  const parentFolder = path.basename(path.dirname(filePath));
  return `${parentFolder}/${parsedPath.name}`;
}

const blogPostSchema = ({ image }) =>
  z.object({
    // Required
    title: z.string().max(60),
    description: z.string().max(160),
    publishDate: z.coerce.date(),
    // Optional
    updatedDate: z.coerce.date().optional(),
    heroImage: z
      .object({
        src: image(),
        alt: z.string().optional(),
        color: z.string().optional()
      })
      .optional(),
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    language: z.string().optional(),
    draft: z.boolean().default(false),
    lang: z.enum(['en', 'es']).default('en'), // Language enum
    // Integrations
    comment: z.boolean().default(true),
  });

const blog_es = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog/es', pattern: '**/*.{md,mdx}' }),
  // Required
  schema: blogPostSchema
})

const blog_en = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog/en', pattern: '**/*.{md,mdx}' }),
  // Required
  schema: blogPostSchema
})

export const collections = { blog_es, blog_en }
