import { UserModel } from "../model/userModel";

//User
export const getUserBy = async (key: string, value: any) => {
  try {
    const data = await UserModel.findOne({ [key]: value }).exec();
    console.log("data", data);
  } catch (error) {}
  console.log(key, value);
  return { password: "1234" };
};
// export const getuserById = (id: string) => getUserBy("id", id);
export const getuserById = (id: string) => {
  console.log("id", id);
  return null;
};
