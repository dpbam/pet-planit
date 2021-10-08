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
    addUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      zipcode: $zipcode
    ) {
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
    updateUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      zipcode: $zipcode
    ) {
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
        addPet(petName: $petName, petType: $petType, petAge: $petAge, petBreed: $petBreed, about: $about) {

        }
    }
`;

export const UPDATE_PET = gql`
  mutation updatePet(
    $petId: ID!
    $petName: String!
    $petType: String!
    $petAge: Int!
    $petBreed: String
    $about: String
  ) {
    updatePet(
      petId: $petId
      petName: $petName
      petType: $petType
      petAge: $petAge
      petBreed: $petBreed
      about: $about
    )
  }
`;

export const DELETE_PET = gql`
    mutation deletePet($petId: ID!) {
        deletePet(petId: $petId) {

        }
    }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!, $feedName: String!) {
    addPost(postText: $postText, feedName: $feedName) {
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
        updatePost(postId: $postId, postText: $postText) {

        }

    }
`;

export const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId) {

        }

    }
`;

// I think I'm doing this one right
export const ADD_REPLY = gql`
  mutation addReply($postId: ID!, $replyText: String!) {
    addReply(postId: $postId, replyText: $replyText) {
      _id
      replyText
      createdAt
      username
    }
  }
`;

export const UPDATE_REPLY = gql`
    mutation updateReply($postId: ID!, $replyId: ID!, $replyText: String!) {
        updateReply(postId: $postId, replyId: $replyId, replyText: $replyText) {
            
        }
    }
`;

export const DELETE_REPLY = gql`
    mutation deleteReply($postId: ID!, $replyId: ID!) {
        deleteReply(postId: $postId, replyId: $replyId) {

        }
    }
`;

export const ADD_DONATION = gql`
    mutation addDonation($donationAmount: Int!, $donationRecipient: String!) {
        addDonation(donationAmount: $donationAmount, donationRecipient: $donationRecipient) {
            
        }

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
