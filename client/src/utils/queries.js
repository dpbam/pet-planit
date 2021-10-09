import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      firstName
      lastName
      zipcode
      interests
      petCount
      postCount
      donationCount
      pets {
        _id
        petName
        petType
        petBreed
        petAge
        about
        owner
      }
    }
  }
`;

// not sure how to do this one
export const QUERY_USERS = gql`
    query users($username: String!) {
        _id
      username
      email
      firstName
      lastName
      zipcode
      interests
      petCount
      postCount
      donationCount
      pets {
        _id
        petName
        petType
        petBreed
        petAge
        about
        owner
      }
      posts {
        _id
        postText
        feedName
        createdAt
        username
        replyCount
        replies
      }
      donations {
        _id
        donationAmount
        donationRecipient
        createdAt
        username
      }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      firstName
      lastName
      zipcode
      interests
      petCount
      postCount
      donationCount
      pets {
        _id
        petName
        petType
        petBreed
        petAge
        about
        owner
      }
      posts {
        _id
        postText
        feedName
        createdAt
        username
        replyCount
        replies
      }
      donations {
        _id
        donationAmount
        donationRecipient
        createdAt
        username
      }
    }
  }
`;

export const QUERY_PET = gql`
  query pet($owner: String!) {
    pet(owner: $owner) {
      _id
      petName
      petType
      petBreed
      petAge
      about
      owner
    }
  }
`;

// not sure how to do this one
// export const QUERY_PETS = gql`
//     query pets($petId: ID!) {
//         pets(petId: $petId) {

//         }
//   }
// `;

// not sure how to do this one
export const QUERY_FEEDS = gql`
  query feeds($feedName: String!) {
    feed(feedName: $feedName) {
      _id
      feedName
      posts
      postCount
    }
  }
`;

export const QUERY_FEED = gql`
  query feed($feedName: String!) {
    feed(feedName: $feedName) {
      _id
      feedName
      posts
      postCount
    }
  }
`;

// is this right?
export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postText
      feedName
      createdAt
      username
      replyCount
      replies {
        _id
        replyText
        createdAt
        username
      }
    }
  }
`;

// not sure how to do this one
// export const QUERY_POSTS_BY_FEED = gql`
//     query postsByFeed($feedName: String!) {
//         postsByFeed(feedName: $feedName) {
//         }
//     }
// `;

export const QUERY_POSTS_BY_USER = gql`
  query postsByUser($username: String!) {
    postsByUser(username: $username) {
      _id
      postText
      feedName
      createdAt
      username
      replyCount
      replies {
        _id
        replyText
        createdAt
        username
      }
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postText
      feedName
      createdAt
      username
      replyCount
      replies {
        _id
        replyText
        createdAt
        username
      }
    }
  }
`;