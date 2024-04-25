import shortid from "shortid";
import { DefaultPrivacyLevel, User } from "../src/models";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { times } from "lodash";

dotenv.config();

const defaultPassword = process.env.SEED_DEFAULT_USER_PASSWORD!;
const userbaseSize = +process.env.SEED_USERBASE_SIZE!;

export const passwordHash = bcrypt.hashSync(defaultPassword, 10);

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
    balance: faker.number.int({ min: 1000, max: 200000 }),
    createdAt: faker.date.past(),
    modifiedAt: faker.date.recent(),
  };
};

export const createSeedUsers = () => times(userbaseSize, () => createFakeUser());
