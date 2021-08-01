import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * Method to check if the user login password match the password in the database
 * @param {*} enteredPassword
 * @returns
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * middleware to encrpyt password
 */
userSchema.pre("save", async function (next) {
  // only encrpyt the password if it is newly created or modifity, isModified is provided by mongoose
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// create a user model
const User = mongoose.model("User", userSchema);

export default User;
