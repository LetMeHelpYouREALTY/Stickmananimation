import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

let client: ReturnType<typeof postgres> | null = null;
let database: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!database) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not configured");
    }
    client = postgres(connectionString);
    database = drizzle(client, { schema });
  }
  return database;
}
