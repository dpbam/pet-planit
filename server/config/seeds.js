const faker = require("faker");

const db = require("./connection");
const { User, Pet, Feed, Post, Donation } = require("../models");

db.once("open", async () => {
  console.log("seed start");
  await User.deleteMany({});
  await Pet.deleteMany({});
  await Feed.deleteMany({});
  await Post.deleteMany({});
  await Donation.deleteMany({});

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
  const petTypeArr = ["dog", "cat"];
  const dogBreedArr = [
    "golden retriever",
    "labrador",
    "pit bull terrier",
    "huskey",
    "french bulldog",
    "boston terrier",
  ];

  for (let i = 0; i < 50; i += 1) {
    const { username, _id: userId } = createdUsers.ops[i];
    const randomPetTypeIndex = Math.floor(Math.random() * petTypeArr.length);
    const randomDogBreedIndex = Math.floor(Math.random() * dogBreedArr.length);

    const owner = username;
    const petName = faker.name.firstName();
    const petType = petTypeArr[randomPetTypeIndex];
    let dogBreed = "N/A";
    const petAge = faker.datatype.number({
      min: 1,
      max: 15,
    });
    const about = faker.lorem.sentences();

    if (petType === "dog") {
      dogBreed = dogBreedArr[randomDogBreedIndex];
    }
    const createdPet = await Pet.create({
      owner,
      petName,
      petType,
      dogBreed,
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
    "General",
    "Pet Adoption",
    "Pet Sitting",
    "Pet Advice",
    "Dog Dates",
    "Lost Pets",
  ];
  for (let i = 0; i < feedArr.length; i++) {
    const feedName = feedArr[i];
    feedData.push({ feedName });
  }

  const createdFeeds = await Feed.collection.insertMany(feedData);

  // create posts
  let createdPosts = [];
  for (let i = 0; i < 100; i += 1) {
    const postText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const randomFeedIndex = Math.floor(Math.random() * createdFeeds.ops.length);
    const { feedName, _id: feedId } = createdFeeds.ops[randomFeedIndex];

    const createdPost = await Post.create({ postText, username, feedName });

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
    "Austin Pets Alive!",
    "Austin Animal Center",
    "Friends of Austin Animal Center",
    "ASPCA",
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

  console.log("all done!");
  process.exit(0);
});
