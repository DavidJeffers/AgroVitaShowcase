import https from "https";

export interface StandardMeta {
  title: string | null;
  description: string | null;
  keywords: string | null;
}

export interface OpenGraphMeta {
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  ogUrl: string | null;
  ogType: string | null;
  ogSiteName: string | null;
}

export interface CompleteMetadata extends StandardMeta {
  openGraph: OpenGraphMeta;
}

const fetchWithRetry = async (url: string): Promise<Response> => {
  const agent = new https.Agent({
    rejectUnauthorized: false,
    keepAlive: true,
    timeout: 0,
  });

  const options = {
    agent,
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; MetadataBot/1.0)",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    },
    timeout: 0,
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return response;
    }
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`
    );
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
};

const getMetaContent = (html: string, pattern: RegExp): string | null => {
  const match = html.match(pattern);
  return match ? match[1] : null;
};

const extractOpenGraphData = (html: string): OpenGraphMeta => {
  const getOgContent = (property: string): string | null => {
    const pattern = new RegExp(
      `<meta[^>]*property=["']og:${property}["'][^>]*content=["']([^"']*)["'][^>]*>`,
      "i"
    );
    return getMetaContent(html, pattern);
  };

  return {
    ogTitle: getOgContent("title"),
    ogDescription: getOgContent("description"),
    ogImage: getOgContent("image"),
    ogUrl: getOgContent("url"),
    ogType: getOgContent("type"),
    ogSiteName: getOgContent("site_name"),
  };
};

export const getProxiedImageUrl = async (
  imageUrl: string
): Promise<string | null> => {
  if (!imageUrl) return null;

  try {
    const response = await fetchWithRetry(imageUrl);

    // Check if it's an image
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      console.warn(`Resource at ${imageUrl} is not an image: ${contentType}`);
      return null;
    }

    // Convert to base64 for direct embedding
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");

    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error(`Error proxying image ${imageUrl}:`, error);
    return null;
  }
};

export const getMetadata = async (url: string): Promise<CompleteMetadata> => {
  console.log("Fetching metadata for", url);
  try {
    const response = await fetchWithRetry(url);
    const html = await response.text();

    // Extract standard metadata
    const titlePatterns = [
      /<title[^>]*>([^<]+)<\/title>/i,
      /<h1[^>]*>([^<]+)<\/h1>/i,
      /<meta[^>]*property="og:title"[^>]*content="([^"]*)"[^>]*>/i,
    ];

    let title: string | null = null;
    for (const pattern of titlePatterns) {
      title = getMetaContent(html, pattern);
      if (title) break;
    }

    const description = getMetaContent(
      html,
      /<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i
    );

    const keywords = getMetaContent(
      html,
      /<meta[^>]*name="keywords"[^>]*content="([^"]*)"[^>]*>/i
    );

    // Extract OpenGraph metadata
    const openGraph = extractOpenGraphData(html);

    // Proxy the image if it exists
    if (openGraph.ogImage) {
      openGraph.ogImage =
        (await getProxiedImageUrl(openGraph.ogImage)) || openGraph.ogImage;
    }

    return {
      title: title || new URL(url).hostname,
      description,
      keywords,
      openGraph,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: new URL(url).hostname,
      description: null,
      keywords: null,
      openGraph: {
        ogTitle: null,
        ogDescription: null,
        ogImage: null,
        ogUrl: null,
        ogType: null,
        ogSiteName: null,
      },
    };
  }
};
