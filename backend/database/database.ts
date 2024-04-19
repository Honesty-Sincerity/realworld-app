import fs from "fs";
import path from "path";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { DbSchema } from "../../src/models/db-schema";

const databaseFile = path.join(__dirname, "../data/database.json");
const adapter = new FileSync<DbSchema>(databaseFile);

const db = low(adapter);

export const seedDatabase = () => {
  const testSeed = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "data", "database-seed.json"),
      "utf-8"
    )
  );

  // seed database with test data
  db.setState(testSeed).write();
  return;
};
