import fs from "fs";
import path from "path";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { DbSchema } from "../../src/models/db-schema";

const USER_TABLE = "users";

const databaseFile = path.join(__dirname, "../../data/database.json");
const adapter = new FileSync<DbSchema>(databaseFile);

const db = low(adapter);

export const seedDatabase = () => {
  const testSeed = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data", "database-seed.json"), "utf-8")
  );

  // seed database with test data
  db.setState(testSeed).write();
  return;
};

export const getAllForEntity = (entity: keyof DbSchema) => db.get(entity).value();

export const getBy = (entity: keyof DbSchema, key: string, value: any) => {
  const result = db
    .get(entity)
    .find({ [`${key}`]: value })
    .value();

  return result;
};

//User
export const getUserBy = (key: string, value: any) => getBy(USER_TABLE, key, value);
export const getuserById = (id: string) => getUserBy("id", id);
