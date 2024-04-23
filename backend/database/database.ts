import fs from "fs";
import path from "path";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import bcrypt from "bcryptjs";
import shortId from "shortid";
import { v4 } from "uuid";
import { remove } from "lodash";
import { DbSchema } from "../../src/models/db-schema";
import { User } from "../../src/models/user";

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

export const getAllUsers = () => db.get(USER_TABLE).value();

export const getAllForEntity = (entity: keyof DbSchema) => db.get(entity).value();

export const getBy = (entity: keyof DbSchema, key: string, value: any) => {
  const result = db
    .get(entity)
    .find({ [`${key}`]: value })
    .value();

  return result;
};

export const removeUserFromResults = (userId: User["id"], results: User[]) =>
  remove(results, { id: userId });

//User
export const getUserBy = (key: string, value: any) => getBy(USER_TABLE, key, value);
export const getuserById = (id: string) => getUserBy("id", id);

export const createUser = (userDetails: Partial<User>): User => {
  const password = bcrypt.hashSync(userDetails.password!, 10);
  const user: User = {
    id: shortId(),
    uuid: v4(),
    firstName: userDetails.firstName!,
    lastName: userDetails.lastName!,
    username: userDetails.username!,
    password,
    email: userDetails.email!,
    phoneNumber: userDetails.phoneNumber!,
    balance: userDetails.balance! || 0,
    avatar: userDetails.avatar!,
    defaultPrivacyLevel: userDetails.defaultPrivacyLevel!,
    createAt: new Date(),
    modifiedAt: new Date(),
  };

  saveUser(user);
  return user;
};

const saveUser = (user: User) => {
  db.get(USER_TABLE).push(user).write();
};
