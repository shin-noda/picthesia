export interface WikimediaImage {
  title: string;
  url: string;
  description?: string;
  sourcePage: string;
}

export class WikipediaService {
  private static readonly COMMONS_API_BASE = 'https://commons.wikimedia.org/w/api.php';
  private static readonly WIKI_API_BASE = 'https://en.wikipedia.org/w/api.php';

  // Fetch the main article thumbnail
  private static async fetchThumbnail(query: string): Promise<WikimediaImage | null> {
    try {
      const url = `${this.WIKI_API_BASE}?${new URLSearchParams({
        action: 'query',
        format: 'json',
        origin: '*',
        titles: query,
        prop: 'pageimages',
        piprop: 'thumbnail',
        pithumbsize: '300'
      })}`;

      const response = await fetch(url);
      const data = await response.json();
      const pages = data.query?.pages;
      if (!pages) return null;

      const page = Object.values(pages)[0] as any;
      if (!page.thumbnail?.source) return null;

      return {
        title: page.title,
        url: page.thumbnail.source,
        description: '',
        sourcePage: `https://en.wikipedia.org/?curid=${page.pageid}`
      };
    } catch (err) {
      console.error('Error fetching Wikipedia thumbnail:', err);
      return null;
    }
  }

  // Fetch images from Wikimedia Commons
  private static async fetchCommonsImages(query: string, limit: number = 3): Promise<WikimediaImage[]> {
    try {
      const searchUrl = `${this.COMMONS_API_BASE}?${new URLSearchParams({
        action: 'query',
        format: 'json',
        origin: '*',
        generator: 'search',
        gsrlimit: limit.toString(),
        gsrsearch: query,
        gsrnamespace: '6', // namespace 6 = File
        gsrsort: 'relevance',
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

  // Public method with duplicate filtering
  static async searchImages(query: string, limit: number = 4): Promise<WikimediaImage[]> {
    try {
      const thumbnail = await this.fetchThumbnail(query);
      let commonsImages = await this.fetchCommonsImages(query, limit - 1);

      // Remove duplicates (same URL as thumbnail)
      if (thumbnail) {
        commonsImages = commonsImages.filter(img => img.url !== thumbnail.url);
      }

      // Trim the total results to the limit
      const results = thumbnail ? [thumbnail, ...commonsImages] : commonsImages;
      return results.slice(0, limit);
    } catch (err) {
      console.error('Error fetching images:', err);
      return [];
    }
  }
}