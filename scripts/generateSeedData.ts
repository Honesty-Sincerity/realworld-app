import chalk from "chalk";
import { userSeed } from "./generateUserSeedData";

const seed = async () => {
  try {
    await userSeed();
  } catch (error) {
    console.log(chalk.red("Error inserting data:", error));
  }
};

seed().then(() => {
  console.log(chalk.green("Complete generate seed database."));
});
