import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
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
      playDate
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
      playDate
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
        playDate
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
      playDate
    }
  }
`;

// export const QUERY_PETS = gql`
//   query pets($_Id: ID!) {
//     pets(_Id: $_Id) {
//       _id
//       petName
//       petType
//       petBreed
//       petAge
//       about
//       owner
//     }
//   }
// `;

export const QUERY_FEEDS = gql`
  {
    feeds {
      _id
      feedName
      postCount
      posts {
        _id
      }
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postTitle
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

export const QUERY_POSTS = gql`
  query posts {
    posts {
      _id
      postTitle
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
export const QUERY_POSTS_BY_FEED = gql`
    query postsByFeed($feedName: String!) {
        postsByFeed(feedName: $feedName) {
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