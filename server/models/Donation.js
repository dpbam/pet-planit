const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const donationSchema = new Schema(
  {
    donationMoney: {
      type: Number,
      required: true,
      min: 5
    },
    recipient: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Donation = model('Donation', donationSchema);

module.exports = Donation;
