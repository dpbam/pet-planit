const { Schema, model } = require("mongoose");

const feedSchema = new Schema(
  {
    feedName: {
      type: String,
      required: true,
      trim: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

feedSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

const Feed = model("Feed", feedSchema);

module.exports = Feed;
