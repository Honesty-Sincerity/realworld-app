import chalk from "chalk";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const url = process.env.MONGO_DB || "";
const dbName = process.env.DB_NAME || "";

const client = new MongoClient(url);

const resetDatabase = async () => {
  try {
    await client.connect();

    const db = client.db(dbName);

    await db.dropDatabase();
    console.log(chalk.green("Database reset successful."));
  } catch (error) {
    console.log(chalk.red("Error resetting database:", error));
  } finally {
    await client.close();
  }
};

resetDatabase();
