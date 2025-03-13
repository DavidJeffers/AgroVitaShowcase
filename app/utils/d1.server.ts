import Cloudflare from "cloudflare";
import { Tables } from "database.types";

const client = new Cloudflare({
  apiToken: process.env.CLOUDFLARE_API_TOKEN_D1,
});

export interface D1Farm {
  id: string;
  created_at: string;
  favs: number;
  foods: string | null /* JSON string */;
  latitude: number | null /* Made nullable */;
  longitude: number | null /* Made nullable */;
  name: string | null;
  shipping: number /* 0 or 1 */;
  site: string | null;
  standards: string | null /* JSON string */;
  state: string | null /* Added state field */;
  updated_at: string;
  verified: number /* 0 or 1 */;
  price_snap: string | null;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<T>;
  exec<T = unknown>(query: string): Promise<T>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<T>;
  all<T = unknown>(): Promise<T[]>;
  raw<T = unknown>(): Promise<T[]>;
}

export async function getFarms(): Promise<Tables<"farms">[]> {
  try {
    console.log("d1 ran");

    const queryResult = await client.d1.database.query(
      process.env.D1_DATABASE_ID ?? "databaseId",
      {
        account_id: process.env.CLOUDFLARE_ACCOUNT_ID ?? "accountId",
        sql: "SELECT * FROM farms ORDER BY created_at DESC;",
      }
    );

    const farms = queryResult.result[0].results as D1Farm[];

    return farms.map((farm) => ({
      ...farm,
      foods: farm.foods ? JSON.parse(farm.foods) : [],
      standards: farm.standards ? JSON.parse(farm.standards) : [],
      price_snap: farm.price_snap ? JSON.parse(farm.price_snap) : [],
      shipping: farm.shipping === 1,
      verified: farm.verified === 1,
    }));
  } catch (error) {
    console.error("Error fetching farms from D1:", error);
    return [];
  }
}
