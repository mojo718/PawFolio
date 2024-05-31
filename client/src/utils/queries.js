import { gql } from '@apollo/client';

export const QUERY_PET = gql`
  query pet($petId: String!) {
    pet(petId: $petId) {
      _id
      name
      species
      breed
      age
      bio
      pic
      owner {
        _id
        username
      }
      events {
        _id
        title
      }
    }
  }
;`

// Currently unused
// export const QUERY_PROFILE = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//     }
//   }
// `;

