import { D1Database } from "./d1.server";

export interface Environment {
  DB: D1Database;
  ENVIRONMENT: "development" | "production";
}
