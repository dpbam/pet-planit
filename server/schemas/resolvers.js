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
          .populate("posts")
          .populate("replies")
          .populate("donations");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("pets")
        .populate("posts")
        .populate("replies")
        .populate("donations");
    },
    user: async (parent, { userId, username }) => {
      if (username) {
        return User.findOne({ username: username })
          .select("-__v -password")
          .populate("pets")
          .populate("posts")
          .populate("replies")
          .populate("donations");
      } else if (userId) {
        return User.findById(userId)
          .select("-__v -password")
          .populate("pets")
          .populate("posts")
          .populate("replies")
          .populate("donations");
      }
    },
    pets: async () => {
      return Pet.find().populate("owner");
    },
    pet: async (parent, { petId }) => {
      return Pet.findById(petId).populate("owner");
    },
    petsByOwner: async (parent, { ownerId, username }) => {
      if (username) {
        let selectedUser = await User.findOne({ username: username });
        return Pet.find({ owner: selectedUser._id }).populate("owner");
      } else if (ownerId) {
        return Pet.find({ owner: ownerId }).populate("owner");
      }
    },
    feeds: async () => {
      return Feed.find().populate("posts");
    },
    feed: async (parent, { feedId, feedName }) => {
      if (feedName) {
        return Feed.findOne({ feedName: feedName }).populate("posts");
      } else if (feedId) {
        return Feed.findById(feedId).populate("posts");
      } else {
        return Feed.find({}).populate("posts");
      }
    },
    posts: async () => {
      return Post.find().populate("feed").populate("user");
    },
    postsByFeed: async (parent, { feedId, feedName }) => {
      if (feedName) {
        let selectedFeed = await Feed.findOne({ feedName: feedName });
        return Post.find({ feed: selectedFeed._id })
          .sort({ createdAt: -1 })
          .populate("feed")
          .populate("user");
      } else if (feedId) {
        return Post.find({ feed: feedId })
          .sort({ createdAt: -1 })
          .populate("feed")
          .populate("user");
      } else {
        return Post.find({})
          .sort({ createdAt: -1 })
          .populate("feed")
          .populate("user");
      }
    },
    postsByUser: async (parent, { userId, username }) => {
      if (username) {
        let selectedUser = await User.findOne({ username: username });
        return Post.find({ user: selectedUser._id })
          .sort({ createdAt: -1 })
          .populate("feed")
          .populate("user");
      } else if (userId) {
        return Post.find({ user: userId })
          .sort({ createdAt: -1 })
          .populate("feed")
          .populate("user");
      } else {
        return Post.find({})
          .sort({ createdAt: -1 })
          .populate("feed")
          .populate("user");
      }
    },
    post: async (parent, { postId }) => {
      return Post.findById(postId).populate("feed").populate("user");
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
        let updatedUserData = await User.findByIdAndUpdate(
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
          owner: context.user._id,
          ...args,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { pets: pet._id } },
          { new: true, runValidators: true }
        );
        return pet.populate("owner");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updatePet: async (parent, { petId, ...args }, context) => {
      if (context.user) {
        const updatedPet = await Pet.findByIdAndUpdate(
          { _id: petId },
          { ...args },
          { new: true, runValidators: true }
        );

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pets: updatedPet._id } },
          { new: true, runValidators: true }
        );
        return updatedPet.populate("owner");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deletePet: async (parent, { petId }, context) => {
      if (context.user) {
        const deletedPet = await Pet.findByIdAndDelete(petId);

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { pets: petId } },
          { new: true }
        );

        return deletedPet.populate("owner");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          user: context.user._id,
          feed: args.feed,
          ...args,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true, runValidators: true }
        );
        await Feed.findByIdAndUpdate(
          { _id: args.feed },
          { $push: { posts: post._id } },
          { new: true, runValidators: true }
        );
        return post.populate("feed").populate("user");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updatePost: async (parent, { postId, args }, context) => {
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { ...args },
          { new: true, runValidators: true }
        );
        console.log("updated post: ", updatedPost);

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $set: { posts: { _id: postId } } },
          { new: true, runValidators: true }
        );
        await Feed.findByIdAndUpdate(
          { _id: updatedPost.feed },
          { $set: { posts: { _id: postId } } },
          { new: true, runValidators: true }
        );

        return updatedPost;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const deletedPost = await Post.findByIdAndDelete(postId);

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: postId } },
          { new: true }
        );
        await Feed.findByIdAndUpdate(
          { _id: deletedPost.feed },
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
              replies: { replyText, user: context.user._id, post: postId },
            },
          },
          { new: true, runValidators: true }
        );
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              replies: { replyText, post: postId, user: context.user._id },
            },
          },
          { new: true, runValidators: true }
        );
        return createReplyPost.populate("post").populate("user");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateReply: async (parent, { replyId, postId, replyText }, context) => {
      if (context.user) {
        const updatedReplyPost = await Post.findByIdAndUpdate(
          { _id: postId },
          {
            $set: {
              replies: {
                _id: replyId,
                replyText: replyText,
                user: context.user._id,
                post: postId,
              },
            },
          },
          { new: true, runValidators: true }
        );
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              replies: {
                _id: replyId,
                replyText: replyText,
                user: context.user._id,
                post: postId,
              },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedReplyPost.populate("post").populate("user");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteReply: async (parent, { replyId, postId }, context) => {
      if (context.user) {
        const deletedReplyPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $pull: { replies: { _id: replyId } } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { replies: { _id: replyId } } },
          { new: true }
        );
        return deletedReplyPost.populate("post").populate("user");
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
