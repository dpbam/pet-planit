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
    query users {
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

export const QUERY_FEEDS = gql`
  query {
    feeds {
      _id
      feedName
      postCount
    }
  }
`;

// is this right?
export const QUERY_POSTS = gql`
  query posts {
    posts {
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