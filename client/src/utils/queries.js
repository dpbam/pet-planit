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
export const QUERY_PETS = gql`
    query pets($petId: ID!) {

    }
`;

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
