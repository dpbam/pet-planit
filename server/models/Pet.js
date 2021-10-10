const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = require('./User');

const petSchema = new Schema(
  {
    petName: {
      type: String,
      required: true,
      trim: true,
    },
    petType: {
      type: String,
      required: true,
      // match: enums: dog, cat, ...
    },
    petBreed: {
      type: String
      // match: enums:
    },
    petAge: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    playDate: {
      type: Boolean,
      default: false,
    },
    about: {
      type: String,
      trim: true,
    },
    owner: {
      // type: String,
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;
