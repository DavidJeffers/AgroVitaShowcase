import { D1Database } from "@cloudflare/workers-types";

interface Farm {
  id: string;
  created_at: string;
  favs: number;
  foods: string[] | null;
  latitude: number | null;
  longitude: number | null;
  name: string;
  shipping: boolean;
  state: string | null;
  site: string;
  standards: string[] | null;
  updated_at: string;
  verified: boolean;
  price_snap: string[] | null;
}

export interface Env {
  DB: D1Database;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_KEY: string;
  AUTH_TOKEN: string;
}

async function syncFarms(env: Env): Promise<{ success: true; count: number }> {
  try {
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/farms?select=*`, {
      headers: {
        apikey: env.SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Supabase API error: ${response.status} ${response.statusText}`
      );
    }

    const farms: Farm[] = await response.json();

    await env.DB.batch([
      env.DB.prepare("DELETE FROM farms"),

      ...farms.map((farm) =>
        env.DB.prepare(
          `
            INSERT INTO farms (
            id, created_at, favs, foods, latitude, longitude,
            name, shipping, site, standards, state, updated_at, verified, price_snap
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        ).bind(
          farm.id,
          farm.created_at,
          farm.favs,
          JSON.stringify(farm.foods),
          farm.latitude,
          farm.longitude,
          farm.name,
          Number(farm.shipping),
          farm.site,
          JSON.stringify(farm.standards),
          farm.state,
          farm.updated_at,
          Number(farm.verified),
          JSON.stringify(farm.price_snap)
        )
      ),
    ]);

    return { success: true, count: farms.length };
  } catch (error) {
    console.error("Error syncing farms:", error);
    throw error;
  }
}

export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    ctx.waitUntil(
      (async () => {
        try {
          const result = await syncFarms(env);
          console.log(`Scheduled sync completed: ${result.count} farms synced`);
        } catch (error) {
          console.error("Scheduled sync failed:", error);
        }
      })()
    );
  },

  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext
  ): Promise<Response> {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers,
      });
    }

    const authHeader = request.headers.get("Authorization");
    console.log("Received auth header:", authHeader);
    console.log("Expected token:", env.AUTH_TOKEN);
    if (!authHeader || authHeader !== `Bearer ${env.AUTH_TOKEN}`) {
      return new Response("Unauthorized", {
        status: 401,
        headers,
      });
    }

    try {
      const result = await syncFarms(env);
      return Response.json(
        {
          success: true,
          message: `Successfully synced ${result.count} farms`,
        },
        { headers }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return Response.json(
        {
          success: false,
          error: errorMessage,
        },
        {
          status: 500,
          headers,
        }
      );
    }
  },
};
