const faker = require('faker');
const fetch = require('node-fetch');

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

function randomNumber(num) {
  return Math.floor(Math.random() * num);
}

const fetchImages = async (query) => {
  const showViral = 'true';
  const showMature = 'false';
  const albumPreviews = true;
  const section = 'hot';
  const sort = 'viral';
  const page = 0;
  const window = 'day';

  //let apiUrl = `https://api.imgur.com/3/gallery/${section}/${sort}/${window}/${page}?showViral=${showViral}&mature=${showMature}&album_previews=${albumPreviews}`;
  let apiUrl = `https://api.imgur.com/3/gallery/search/${sort}/${window}/${page}?q=${query}`;
  let apiKey = 'dc0e01b32f67816'; // client id via the imgur application registration

  let settings = {
    async: true,
    crossDomain: true,
    processData: false,
    contentType: false,
    type: 'GET',
    url: apiUrl,
    headers: {
      Authorization: 'Client-ID ' + apiKey,
      Accept: 'application/json',
    },
    error: function (req, err) {
      console.log(req, err);
    },
  };

  const response = await fetch(apiUrl, settings);
  const images = await response.json();
  return images.data;
};

const getRandomImage = (imageUrls) => {
  let gotImage = false;
  let randomGalleryNum;
  let randomImageNum;
  let randomImage;

  while (gotImage == false) {
    randomGalleryNum = randomNumber(imageUrls.length);

    if (imageUrls[randomGalleryNum].images != undefined) {
      randomImageNum = randomNumber(imageUrls[randomGalleryNum].images.length);
      randomImage = imageUrls[randomGalleryNum].images[randomImageNum];
      if (randomImage.type == 'image/jpeg') {
        gotImage = true;
      }
    }
  }
  return randomImage.link;
};

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

  const profileImageUrls = await fetchImages('animals');
  const dogImageUrls = await fetchImages('dogs');
  const catImageUrls = await fetchImages('cats');

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const username = faker.internet.userName(firstName, lastName);
    const email = faker.internet.email(firstName, lastName);
    const password = faker.internet.password();
    const zipcode = faker.address.zipCode();
    const image = getRandomImage(profileImageUrls);
    userData.push({
      username,
      firstName,
      lastName,
      email,
      password,
      zipcode,
      image,
    });
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

    let image =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png'; // default image
    if (petType == 'dog') {
      image = getRandomImage(dogImageUrls);
    } else if (petType == 'cat') {
      image = getRandomImage(catImageUrls);
    }

    const createdPet = await Pet.create({
      owner,
      petName,
      petType,
      petBreed,
      petAge,
      about,
      image,
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
    const postTitle = faker.lorem.words(Math.round(Math.random() * 9) + 1);
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

  const createdCategoryData = await Category.create({
    name,
  });

  // create products
  let createdProducts = [];
  const { _id: category } = createdCategoryData._id;
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

  const productData = await Product.collection.insertMany(createdProducts);

  // create orders
  let createdOrders = [];

  for (let i = 0; i < 20; i += 1) {
    const randomProductIndex = Math.floor(
      Math.random() * productData.ops.length
    );
    const { product } = productData.ops[randomProductIndex];

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];
    const order = { username: username, $push: { products: product } };

    const createdOrder = await Order.create(order);

    createdOrders.push(createdOrder);
  }

  console.log('all done!');
  process.exit(0);
});
