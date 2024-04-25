import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import chalk from "chalk";
import { User } from "../src/models";
import { createSeedUsers } from "./createFakeUser";

dotenv.config();

const uri = process.env.MONGO_DB!;
const dbName = process.env.DB_NAME!;

const client = new MongoClient(uri);

export const userSeed = async () => {
  try {
    await client.connect();

    const fakeUsers: User[] = createSeedUsers();

    const db = client.db(dbName);
    const userCollection = db.collection("users");

    const result = await userCollection.insertMany(fakeUsers);
    console.log(chalk.green(`${result.insertedCount} documents inserted in users collection`));
  } catch (error) {
    console.log(chalk.red(`Error inserting data in users collection :`, error));
  } finally {
    await client.close();
  }
};

userSeed();
