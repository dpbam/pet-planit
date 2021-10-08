import { gql } from '@apollo/client';

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
