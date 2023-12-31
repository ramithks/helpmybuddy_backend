import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
} else {
  console.error(".env file not found.");
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production";

export const PORT = (process.env.PORT || 3000) as number;

export const MONGO_URI = prod
  ? (process.env.MONGO_PROD as string)
  : (process.env.MONGO_LOCAL as string);

export const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

if (!MONGO_URI) {
  if (prod) {
    console.error(
      "No mongo connection string. Set MONGO_PROD environment variable."
    );
  } else {
    console.error(
      "No mongo connection string. Set MONGO_LOCAL environment variable."
    );
  }
  process.exit(1);
}
