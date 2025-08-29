export interface WikimediaImage {
  title: string;
  url: string;
  description?: string;
  sourcePage: string;
}

export class WikipediaService {
  private static readonly COMMONS_API_BASE = 'https://commons.wikimedia.org/w/api.php';

  static async searchImages(query: string, limit: number = 4): Promise<WikimediaImage[]> {
    try {
      // Only search in File namespace to get real images
      const searchUrl = `${this.COMMONS_API_BASE}?${new URLSearchParams({
        action: 'query',
        format: 'json',
        origin: '*',
        generator: 'search',
        gsrlimit: limit.toString(),
        gsrsearch: query,
        gsrnamespace: '6', // namespace 6 = File
        prop: 'imageinfo',
        iiprop: 'url|extmetadata',
        iiurlwidth: '300',
      })}`;

      const response = await fetch(searchUrl);
      const data = await response.json();

      if (!data.query?.pages) return [];

      const images: WikimediaImage[] = Object.values(data.query.pages)
        .map((page: any) => {
          const info = page.imageinfo?.[0];
          if (!info?.thumburl) return null;
          return {
            title: page.title,
            url: info.thumburl,
            description: info.extmetadata?.ImageDescription?.value || '',
            sourcePage: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
          };
        })
        .filter(Boolean) as WikimediaImage[];

      return images;
    } catch (err) {
      console.error('Error fetching Wikimedia Commons images:', err);
      return [];
    }
  }
}
