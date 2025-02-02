import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    avatarUrl: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/09/49/33/40/360_F_949334010_NkTcv6gckVYZSI8MbhUITBqAJiEGiYtG.jpg",
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
      default: "Earth",
    },
    sex: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
