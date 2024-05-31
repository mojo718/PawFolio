import { gql } from '@apollo/client';

export const QUERY_PROFILE = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;