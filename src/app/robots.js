export default function robots() {
  const baseUrl = 'https://pandi.com.ec';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
