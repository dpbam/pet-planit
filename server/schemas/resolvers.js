const { User, Pet, Post, Reply, Donation, Feed } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("pets")
          .populate("posts");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("pets")
        .populate("posts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("pets")
        .populate("posts");
    },
    pet: async (parent, { owner }) => {
      return Pet.find({ owner });
    },
    feeds: async () => {
      return Feed.find().populate("posts");
    },
    feed: async (parent, { feedName }) => {
      const params = feedName ? { feedName } : {};
      return Feed.find(params).populate("posts");
    },
    posts: async (parent, { feedName }) => {
      const params = feedName ? { feedName } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
  },
};

module.exports = resolvers;
