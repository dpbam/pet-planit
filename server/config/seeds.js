const faker = require('faker');

const db = require('./connection');
const {
  User,
  Pet,
  Feed,
  Post,
  Donation,
  Order,
  Category,
  Product,
} = require('../models');

db.once('open', async () => {
  console.log('seed start');
  await User.deleteMany({});
  await Pet.deleteMany({});
  await Feed.deleteMany({});
  await Post.deleteMany({});
  await Donation.deleteMany({});
  await Order.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const zipcode = faker.address.zipCode();

    userData.push({ username, email, password, zipcode });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create pet data
  let createdPets = [];
  const petTypeArr = ['dog', 'cat'];

  for (let i = 0; i < 50; i += 1) {
    const { username, _id: userId } = createdUsers.ops[i];
    const randomPetTypeIndex = Math.floor(Math.random() * petTypeArr.length);

    const owner = username;
    const petName = faker.name.firstName();
    const petType = petTypeArr[randomPetTypeIndex];
    const petBreed = 'N/A';
    const petAge = faker.datatype.number({
      min: 1,
      max: 15,
    });
    const about = faker.lorem.sentences();

    const createdPet = await Pet.create({
      owner,
      petName,
      petType,
      petBreed,
      petAge,
      about,
    });
    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { pets: createdPet._id } }
    );
    createdPets.push(createdPet);
  }

  // create feeds
  const feedData = [];
  const feedArr = [
    'General',
    'Pet Adoption',
    'Pet Sitting',
    'Pet Advice',
    'Dog Dates',
    'Lost Pets',
  ];
  for (let i = 0; i < feedArr.length; i++) {
    const feedName = feedArr[i];
    feedData.push({ feedName });
  }

  const createdFeeds = await Feed.collection.insertMany(feedData);

  // create posts
  let createdPosts = [];
  for (let i = 0; i < 100; i += 1) {
    const postTitle = faker.lorem.words(Math.round(Math.random() * 10) + 1);
    const postText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const randomFeedIndex = Math.floor(Math.random() * createdFeeds.ops.length);
    const { feedName, _id: feedId } = createdFeeds.ops[randomFeedIndex];

    const createdPost = await Post.create({
      postTitle,
      postText,
      username,
      feedName,
    });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { posts: createdPost._id } }
    );

    const updatedFeed = await Feed.updateOne(
      { _id: feedId },
      { $push: { posts: createdPost._id } }
    );

    createdPosts.push(createdPost);
  }

  // create replies
  for (let i = 0; i < 100; i += 1) {
    const replyText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
    const { _id: postId } = createdPosts[randomPostIndex];

    await Post.updateOne(
      { _id: postId },
      { $push: { replies: { replyText, username } } },
      { runValidators: true }
    );
  }

  // create donations
  let createdDonations = [];
  const donationRecipientArr = [
    'Austin Pets Alive!',
    'Austin Animal Center',
    'Friends of Austin Animal Center',
    'ASPCA',
  ];
  for (let i = 0; i < 20; i += 1) {
    const donationAmount =
      5 *
      faker.datatype.number({
        min: 1,
        max: 20,
      });

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const randomRecipientIndex = Math.floor(
      Math.random() * donationRecipientArr.length
    );
    const donationRecipient = donationRecipientArr[randomRecipientIndex];

    const createdDonation = await Donation.create({
      donationAmount,
      username,
      donationRecipient,
    });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { donations: createdDonation._id } }
    );

    createdDonations.push(createdDonation);
  }

  // create categories
  let createdCategories = [];
  const name = 'donation';

  const createdCategory = await Category.create({
    name,
  });

  // create products
  let createdProducts = [];
  const category = createdCategories[0]._id;
  const productOne = {
    category: category,
    price: 20,
    quantity: 1,
    name: '$20 Donation',
    id: 20,
  };
  const productTwo = {
    category: category,
    price: 50,
    quantity: 1,
    name: '$50 Donation',
    id: 50,
  };
  const productThree = {
    category: category,
    price: 100,
    quantity: 1,
    name: '$100 Donation',
    id: 100,
  };

  createdProducts.push(productOne, productTwo, productThree);

  const createdProducts = await Product.create(
    productOne,
    productTwo,
    productThree
  );

  // create orders
  let createdOrders = [];

  for (let i = 0; i < 20; i += 1) {
    const randomProductIndex = Math.floor(
      Math.random() * createdProducts.ops.length
    );
    const { product } = createdProducts.ops[randomProductIndex];

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdOrder = await Order.create(
      { $push: { products: product } },
      username
    );

    createdOrders.push(createdOrder);
  }

  console.log('all done!');
  process.exit(0);
});
