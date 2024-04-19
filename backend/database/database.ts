import fs from "fs";
import path from "path";

export const seedDatabase = () => {
  const testSeed = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "data", "database-seed.json"),
      "utf-8"
    )
  );
};
