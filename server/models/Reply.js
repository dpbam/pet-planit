const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const replySchema = new Schema(
  {
    replyText: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      //type: String,
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = replySchema;
