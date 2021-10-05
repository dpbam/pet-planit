const { User, Pet, Post, Donation, Feed } = require("../models");
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
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const updatedUserData = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { ...args },
          { new: true, runValidators: true }
        );
        return updatedUserData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addPet: async (parent, args, context) => {
      if (context.user) {
        const pet = await Pet.create({
          ...args,
          owner: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { pets: pet._id } },
          { new: true, runValidators: true }
        );
        return pet;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updatePet: async (parent, { petId, ...args }, context) => {
      if (context.user) {
        const updatedPet = await Pet.findByIdAndUpdate(
          { id: petId },
          { ...args },
          { new: true, runValidators: true }
        );

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pets: updatedPet._id } },
          { new: true, runValidators: true }
        );
        return updatedPet;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deletePet: async (parent, petId, context) => {
      if (context.user) {
        const deletedPet = await Pet.findByAndDelete({
          _id: petId,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { pets: petId } },
          { new: true }
        );

        return deletedPet;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true, runValidators: true }
        );
        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updatePost: async (parent, { postId, postText }, context) => {
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { postText: postText }
        );

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: postId } },
          { new: true, runValidators: true }
        );

        return updatedPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deletePost: async (parent, postId, context) => {
      if (context.user) {
        const deletedPost = await Post.findByIdAndDelete({
          _id: postId,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: postId } },
          { new: true }
        );
        return deletedPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addReply: async (parent, { postId, replyText }, context) => {
      if (context.user) {
        const createReplyPost = await Post.findByIdAndUpdate(
          { _id: postId },
          {
            $push: {
              replies: { replyText, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
        return createReplyPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateReply: async (parent, { replyId, postId, replyText }, context) => {
      if (context.user) {
        const updatedReplyPost = await Post.findByIdAndUpdate(
          { _id: postId },
          {
            $addToSet: { replies: { replyId: replyId, replyText: replyText } },
          },
          { new: true, runValidators: true }
        );
        return updatedReplyPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteReply: async (parent, { replyId, postId }, context) => {
      if (context.user) {
        const deletedReplyPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $removeFromSet: { replies: replyId } },
          { new: true }
        );
        return deletedReplyPost;
      }
    },
    addDonation: async (parent, args, context) => {
      if (context.user) {
        const donation = await Donation.create({
          ...args,
          username: context.user._id,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true, runValidators: true }
        );
        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
