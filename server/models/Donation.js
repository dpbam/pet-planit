const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const donationSchema = new Schema(
  {
    donationAmount: {
      type: Number,
      required: true,
      min: 5
    },
    donationRecipient: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    user: {
      //type: String,
      type: Schema.Types.ObjectId,
      ref: "User",
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
