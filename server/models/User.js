const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 1
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1
    },
    zipcode: {
      type: String,
      maxlength: 5,
    },
    playDate: {
      type: Boolean,
      default: false 
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    donations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Donation",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("petCount").get(function () {
  return this.pets.length;
});

userSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

userSchema.virtual("donationCount").get(function () {
  return this.donations.length;
});

const User = model("User", userSchema);

module.exports = User;
