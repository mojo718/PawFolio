import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      petCount
      pets {
        _id
        name
      }
    }
  }
`

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
      friends {
        _id
        name
      }
    }
  }
`;

export const QUERY_PET_HEALTH = gql`
  query Query($petId: String!) {
    pet(petId: $petId) {
      _id
      name
      species
      breed
      age
      bio
      pic
      adoptionDate
      health {
        allergies {
          name
        }
        vet {
          name
          location
          speciality
        }
        diagnosis {
          _id
          issue
          location
          startDate
          endDate
          pinPosition
        }
        notes {
          description
          createdAt
        }
      }
      owner {
        _id
        username
      }
    }
  }
`;

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

