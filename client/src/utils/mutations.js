import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $zipcode: String
  ) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $zipcode: String
  ) {
    updateUser(id: $id) {
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
        username
        replies
      }
    }
  }
`;

export const ADD_PET = gql`
    mutation addPet($petName: String!, $petType: String!, $petAge: Int!, $petBreed: String, $about: String) {

    }
`;

export const UPDATE_PET = gql`
    mutation updatePet($petId: ID!, $petName: String!, $petType: String!, $petAge: Int!, $petBreed: String, $about: String) {

    }
`;

export const DELETE_PET = gql`
    mutation deletePet($petId: ID!) {

    }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText, feedName: String!) {
      _id
      postText
      feedName
      createdAt
      username
      replyCount
      replies
    }
  }
`;

export const UPDATE_POST = gql`
    mutation updatePost($postId: ID!, $postText: String!) {

    }
`;

export const DELETE_POST = gql`
    mutation deletePost(postId: ID!) {

    }
`;

// I think I'm doing this one right
export const ADD_REPLY = gql`
    mutation addReply($postId: ID!, $replyText: String!) {
        addReply(postId: $postId, replyText: $replyText) {
            $_id
            replyText
            createdAt
            username
        }
    }
`;

export const UPDATE_REPLY = gql`
    mutation updateReply($postId: ID!, $replyId: ID!, $replyText: String!) {

    }
`;

export const DELETE_REPLY = gql`
    mutation deleteReply($postId: ID!, $replyId: ID!) {

    }
`;

export const ADD_DONATION = gql`
    mutation addDonation($donationAmount: Int!, $donationRecipient: String!) {

    }
`;

// export const ADD_FRIEND = gql`
//   mutation addFriend($id: ID!) {
//     addFriend(friendId: $id) {
//       _id
//       username
//       friendCount
//       friends {
//         _id
//         username
//       }
//     }
//   }
// `;

// export const REMOVE_FRIEND = gql`
//   mutation removeFriend($id: ID!) {
//     removeFriend(id: $id) {
//       _id
//       username
//       friends {
//         _id
//         username
//       }
//     }
//   }
// `;
