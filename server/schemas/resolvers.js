const { User, Pet, Post, Donation, Feed } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const Product = require('../models/Product');
const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('pets')
          .populate('posts')
          .populate('donations');

        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('pets')
        .populate('posts')
        .populate('donations');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('pets')
        .populate('posts')
        .populate('donations');
    },
    pets: async () => {
      return Pet.find();
    },
    pet: async (parent, { owner }) => {
      const params = owner ? { owner } : {};
      return Pet.find(params);
    },
    feeds: async () => {
      return Feed.find().populate('posts');
    },
    feed: async (parent, { feedName }) => {
      const params = feedName ? { feedName } : {};
      return Feed.find(params).populate('posts');
    },
    posts: async () => {
      return Post.find();
    },
    postsByFeed: async (parent, { feedName }) => {
      const params = feedName ? { feedName } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    postsByUser: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
    checkout: async (parent, args, context) => {
      const storeItems = new Map([
        [20, { priceInCents: 20000, name: 'Donate $5 to this website' }],
        [50, { priceInCents: 50000, name: 'Donate $10 to this website' }],
        [100, { priceInCents: 100000, name: 'Donate $20 to this website' }],
      ]);

      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const { products } = await order.populate('products').execPopulate();

      const line_items = [];

      for (let i = 0; i < products.length; i++) {
        //  generate product id
        const product = await stripe.products.create({
          name: products[i].name,
        });

        const storeItem = storeItems.get(products[i].id);

        // generate price id using the product id
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: storeItem.priceInCents * 100,
          currency: 'usd',
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    products: async (parent, { category, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }
      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });
        return user.orders.id(_id);
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
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
      throw new AuthenticationError('You need to be logged in!');
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
      throw new AuthenticationError('You need to be logged in!');
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
        return updatedPet;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deletePet: async (parent, { petId }, context) => {
      if (context.user) {
        const deletedPet = await Pet.findByIdAndDelete(petId);

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { pets: petId } },
          { new: true }
        );

        return deletedPet;
      }
      throw new AuthenticationError('You need to be logged in!');
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
      throw new AuthenticationError('You need to be logged in!');
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
      throw new AuthenticationError('You need to be logged in!');
    },
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const deletedPost = await Post.findByIdAndDelete(postId);

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: postId } },
          { new: true }
        );
        return deletedPost;
      }
      throw new AuthenticationError('You need to be logged in!');
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
      throw new AuthenticationError('You need to be logged in!');
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
                username: context.user.username,
              },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedReplyPost;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteReply: async (parent, { replyId, postId }, context) => {
      if (context.user) {
        const deletedReplyPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $pull: { replies: { _id: replyId } } },
          { new: true }
        );
        return deletedReplyPost;
      }
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        return order;
      }
      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
