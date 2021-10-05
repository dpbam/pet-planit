// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        zipcode: String
        petCount: Int
        pets: [Pet]
        posts: [Thought]
    }
    type Pet {
        _id: ID
        petName: String
        petType: String
        dogBreed: String
        petAge: Int
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
        feeds: [Feed]
        feed(feedName: String!): Feed
        posts(feedName: String!): [Post]
        posts(username: String!): [Post]
        post(_id: ID!): Post
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, zipcode: String): Auth
        updateUser(userId: ID!, email: String!, password: String!, zipcode: String): Auth
        addPet(petName: String!, petType: String!, petAge: Int!, about: String): Pet
        editPet(petId: ID!, petName: String!, petType: String!, petAge: Int!, about: String): Pet
        deletePet(petId: ID!): Pet
        addPost(postText: String!): Post
        editPost(postId: ID!, postText: String!): Post
        deletePost(postId: ID!): Post
        addReply(postId: ID!, replyText: String!): Post
        editReply(replyId: ID!, replyText: String!): Post
        addDonation(donationAmount: Int!, donationRecipient: String!): Donation
    }
`;

// export the typeDefs
module.exports = typeDefs;