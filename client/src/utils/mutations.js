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
    $image: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      zipcode: $zipcode
      image: $image
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
    $username: String
    $email: String
    $password: String
    $firstName: String
    $lastName: String
    $zipcode: String
    $image: String
  ) {
    updateUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      zipcode: $zipcode
      image: $image
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
      image
      pets {
        _id
        petName
        petType
        petBreed
        petAge
        playDate
        about
        owner
        image
      }
      posts {
        _id
        postText
        feedName
        username
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation addPet(
    $petName: String!
    $petType: String!
    $petAge: Int!
    $petBreed: String
    $about: String
    $playDate: Boolean
    $image: String
  ) {
    addPet(
      petName: $petName
      petType: $petType
      petAge: $petAge
      playDate: $playDate
      petBreed: $petBreed
      about: $about
      image: $image
    ) {
      _id
      petName
      petType
      petBreed
      petAge
      playDate
      about
      owner
      image
    }
  }
`;

export const UPDATE_PET = gql`
  mutation updatePet(
    $petId: ID!
    $petName: String
    $petType: String
    $petAge: Int
    $petBreed: String
    $about: String
    $playDate: Boolean
    $image: String
  ) {
    updatePet(
      petId: $petId
      petName: $petName
      petType: $petType
      petAge: $petAge
      playDate: $playDate
      petBreed: $petBreed
      about: $about
      image: $image
    ) {
      _id
      petName
      petType
      petBreed
      petAge
      playDate
      about
      owner
      image
    }
  }
`;

export const DELETE_PET = gql`
  mutation deletePet($petId: ID!) {
    deletePet(petId: $petId) {
      _id
      petName
      petType
      petBreed
      petAge
      playDate
      about
      owner
      image
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postTitle: String!, $postText: String!, $feedName: String!) {
    addPost(postTitle: $postTitle, postText: $postText, feedName: $feedName) {
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

export const UPDATE_POST = gql`
  mutation updatePost($postId: ID!, $postText: String!) {
    updatePost(postId: $postId, postText: $postText) {
      _id
      postTitle
      postText
      feedName
      createdAt
      username
      replyCount
      replies
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
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

export const ADD_REPLY = gql`
  mutation addReply($postId: ID!, $replyText: String!) {
    addReply(postId: $postId, replyText: $replyText) {
      _id
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

export const UPDATE_REPLY = gql`
  mutation updateReply($postId: ID!, $replyId: ID!, $replyText: String!) {
    updateReply(postId: $postId, replyId: $replyId, replyText: $replyText) {
      _id
      replyText
      createdAt
      username
    }
  }
`;

export const DELETE_REPLY = gql`
  mutation deleteReply($postId: ID!, $replyId: ID!) {
    deleteReply(postId: $postId, replyId: $replyId) {
      _id
      replyText
      createdAt
      username
    }
  }
`;

export const ADD_DONATION = gql`
  mutation addDonation($donationAmount: Int!, $donationRecipient: String!) {
    addDonation(
      donationAmount: $donationAmount
      donationRecipient: $donationRecipient
    ) {
      _id
      donationAmount
      donationRecipient
      createdAt
      username
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
