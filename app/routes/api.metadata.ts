import type { LoaderFunctionArgs } from "react-router";
import { getMetadata } from "~/utils/metadataFetcher.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return {
      status: 400,
    };
  }

  try {
    const metadata = await getMetadata(url);
    return metadata;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: new URL(url).hostname,
      description: "Unable to fetch site details",
      keywords: null,
    };
  }
}
