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
        const updatedUserData = await User.findOneAndUpdate({
          ...args,
          _id: context.user._id,
        });

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
    updatePet: async (parent, args, context) => {
      if (context.user) {
        const updatedPet = await Pet.findOneAndUpdate({
          ...args,
          _id: args._id,
        });

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
        const deletedPet = await Pet.findOneAndDelete({
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
    updatePost: async (parent, args, context) => {
        if (context.user) {
            const updatedPost = await Post.findOneAndUpdate({
                ...args,
                _id: args._id
            });

            await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { posts: updatedPost._id } },
                { new: true, runValidators: true }
              );

            return updatedPost;
        }
        throw new AuthenticationError("You need to be logged in!");
    },
    deletePost: async (parent, postId, context) => {
        if (context.user) {
          const deletedPost = await Post.findOneAndDelete({
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
    addReply: async (parent, { postId, reactionText }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              replies: { reactionText, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateReply: async (parent, { replyId, postId, ...args }, context) => {
        if (context.user) {
            const updatedReply = await Reply.findOneAndUpdate
        }
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
