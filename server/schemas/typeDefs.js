// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        firstName: String
        lastName: String
        zipcode: String
        interests: String
        petCount: Int
        postCount: Int
        donationCount: Int
        pets: [Pet]
        posts: [Post]
        donations: [Donation]
    }
    type Pet {
        _id: ID
        petName: String
        petType: String
        petBreed: String
        petAge: Int
        playDate: Boolean
        about: String
        owner: String
    }
    type Feed {
        _id: ID
        feedName: String
        posts: [Post]
        postCount: Int
    }
    type Post {
        _id: ID
        postText: String
        feedName: String
        createdAt: String
        username: String
        replyCount: Int
        replies: [Reply]
    }
    type Reply {
        _id: ID
        replyText: String
        createdAt: String
        username: String
    }
    type Donation {
        _id: ID
        donationAmount: Int
        donationRecipient: String
        createdAt: String
        username: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        pet(owner: String!): [Pet]
        pets: [Pet]
        feeds: [Feed]
        feed(feedName: String!): [Feed]
        posts: [Post]
        postsByFeed(feedName: String!): [Post]
        postsByUser(username: String!): [Post]
        post(_id: ID!): Post
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!, zipcode: String): Auth
        updateUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!, zipcode: String): Auth
        addPet(petName: String!, petType: String!, petAge: Int!, petBreed: String, playDate: Boolean, about: String): Pet
        updatePet(petId: ID!, petName: String!, petType: String!, petAge: Int!, petBreed: String, playDate: Boolean, about: String): Pet
        deletePet(petId: ID!): Pet
        addPost(postText: String!, feedName: String!): Post
        updatePost(postId: ID!, postText: String!): Post
        deletePost(postId: ID!): Post
        addReply(postId: ID!, replyText: String!): Post
        updateReply(postId: ID!, replyId: ID!, replyText: String!): Post
        deleteReply(postId: ID!, replyId: ID!): Post
        addDonation(donationAmount: Int!, donationRecipient: String!): Donation
    }
`;

// export the typeDefs
module.exports = typeDefs;