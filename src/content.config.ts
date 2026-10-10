import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.mdx' }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string().optional(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
      heroImageWidth: z.number().int().positive().optional(),
      heroImageHeight: z.number().int().positive().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    })
    .superRefine((data, ctx) => {
      if (data.heroImage && (!data.heroImageWidth || !data.heroImageHeight)) {
        ctx.addIssue({
          code: 'custom',
          message:
            'Set heroImageWidth and heroImageHeight when heroImage is set, so the layout can reserve space and the hero can be preloaded.',
        });
      }
    }),
});

export const collections = {
  blog: blogCollection,
};
