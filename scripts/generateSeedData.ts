import { MongoClient } from "mongodb";
import chalk from "chalk";
import dotenv from "dotenv";
import { times } from "lodash";
import shortid from "shortid";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { DefaultPrivacyLevel, User } from "../src/models";

dotenv.config();

export const userbaseSize = +process.env.SEED_USERBASE_SIZE!;
export const defaultPassword = process.env.SEED_DEFAULT_USER_PASSWORD!;

export const passwordHash = bcrypt.hashSync(defaultPassword, 10);

const url = process.env.MONGO_DB || "";
console.log("URL", url);

const client = new MongoClient(url);

const handleError = (err: any, client: any) => {
  if (err) {
    console.log(
      chalk.redBright("Couldn't connect MongoDB! Please check env file or network connect.")
    );

    try {
      client.close();
    } catch (error) {
    } finally {
      process.exit(1);
    }
  }
};

export const getUserAvatar = (identifier: string) => {
  return `https://avatars.dicebear.com/api/human/${identifier}.svg`;
};

export const createFakeUser = (): User => {
  const id = shortid();
  return {
    id,
    uuid: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.userName(),
    password: passwordHash,
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    avatar: getUserAvatar(id),
    defaultPrivacyLevel: faker.helpers.arrayElement([
      DefaultPrivacyLevel.public,
      DefaultPrivacyLevel.private,
      DefaultPrivacyLevel.contacts,
    ]),
    balance: faker.number.int({ min: 10000, max: 200000 }),
    createdAt: faker.date.past(),
    modifiedAt: faker.date.recent(),
  };
};

export const createSeedUsers = () => times(userbaseSize, () => createFakeUser());

export const buildDatabase = () => {
  const seedUsers: User[] = createSeedUsers();

  return {
    users: seedUsers,
  };
};

const seed = async () => {
  const data = buildDatabase();
  console.log("fake datas", data);
};

seed()
  .then(() => {
    console.log(chalk.green("Complete generate seed database."));
    client.close();
  })
  .catch((err) => handleError(err, client));
