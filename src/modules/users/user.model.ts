import mongoose from "mongoose";
import * as bcrypt from "bcrypt";

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      min: [3, "Too short username!"],
      max: [32, "Too long username!"],
      required: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      min: [8, "Too weak password!"],
      max: [256, "Too long password!"],
    },
    avatar: {
      type: String,
      default: undefined,
    },
  },
  { timestamps: true }
);

/**
 * hashing user password pre save and pre update
 */
User.pre("save", async function (next): Promise<void> {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

User.pre("updateOne", async function (): Promise<void> {
  const obj = this.getUpdate();
  if ("password" in obj) {
    obj.password = await bcrypt.hash(obj.password, 12);
  }
});

export const UserModel = mongoose.model("User", User);
