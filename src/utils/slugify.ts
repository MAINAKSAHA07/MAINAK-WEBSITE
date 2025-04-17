export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
}

export const slugify = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove all special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export const matchSlug = (urlSlug: string, blogTitle: string): boolean => {
  const generatedSlug = slugify(blogTitle);
  console.log('Comparing slugs:', { urlSlug, generatedSlug }); // Add logging for debugging
  return urlSlug === generatedSlug;
};

export const createBlogUrl = (title: string): string => {
  return `/blog/${slugify(title)}`;
}; 