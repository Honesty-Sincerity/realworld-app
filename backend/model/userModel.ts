import { DefaultPrivacyLevel, User } from "../../src/models/user";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<User>({
  id: { require: true, type: String },
  uuid: { require: true, type: String },
  firstName: { require: true, type: String },
  lastName: { require: true, type: String },
  username: { require: true, type: String },
  password: { require: true, type: String },
  email: { require: true, type: String },
  phoneNumber: { require: true, type: String },
  balance: { require: true, type: Number },
  avatar: { require: true, type: String },
  defaultPrivacyLevel: {
    require: true,
    type: String,
    enum: [DefaultPrivacyLevel.public, DefaultPrivacyLevel.private, DefaultPrivacyLevel.contacts],
  },
  createdAt: Date,
  modifiedAt: Date,
});

const UserModel = mongoose.model("User", userSchema);

export { UserModel }; // Export UserModel as a named export
