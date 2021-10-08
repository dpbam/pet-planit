const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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
      type: String,
      required: true,
      // match: enums: 
    },
    petAge: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    about: {
        type: String,
        trim: true,
    },
    owner: {
        type: String,
        required: true
      },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;