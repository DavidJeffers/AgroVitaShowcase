import { ClientLoaderFunctionArgs, LoaderFunctionArgs } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";

const cache = new Map();

function generateCacheKey(request: Request): string {
  return new URL(request.url).pathname;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: favorites } = await supabase.client
    .from("favorites")
    .select("farm_id")
    .eq("user_id", user.id);

  if (!favorites || favorites.length === 0) {
    return [];
  }

  const { data: farms } = await supabase.client
    .from("farms")
    .select("*")
    .in(
      "id",
      favorites.map((f) => f.farm_id)
    );

  return farms || [];
}

let isInitialRequest = true;

export async function clientLoader({
  request,
  serverLoader,
}: ClientLoaderFunctionArgs) {
  const cacheKey = generateCacheKey(request);

  if (isInitialRequest) {
    isInitialRequest = false;
    const serverData = await serverLoader();
    cache.set(cacheKey, serverData);
    return serverData;
  }

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const serverData = await serverLoader();
  cache.set(cacheKey, serverData);
  return serverData;
}

clientLoader.hydrate = false;
