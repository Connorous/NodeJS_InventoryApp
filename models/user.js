const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100, minLength: 3 },
  password: { type: String, required: true, maxLength: 100, minLength: 3 },
  admin: { type: Boolean, required: true },
});

// Export model
module.exports = mongoose.model("User", UserSchema);
