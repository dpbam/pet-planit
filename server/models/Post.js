const { Schema, model } = require('mongoose');
const replySchema = require('./Reply');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      minlength: 1,
      maxlength: 50
    },
    postText: {
      type: String,
      required: 'You need to leave a post!',
      minlength: 1,
      maxlength: 1000,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    user: {
      // type: String,
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    feed: {
        // type: String,
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    replies: [replySchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

postSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Post = model('Post', postSchema);

module.exports = Post;
