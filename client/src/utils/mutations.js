import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      owner {
        _id
        username
      }
    }
  }
`;

export const CREATE_OWNER = gql`
  mutation createOwner($username: String!, $email: String!, $password: String!) {
    createOwner(username: $username, email: $email, password: $password) {
      token
      owner {
        _id
        username
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation Mutation($species: String!, $name: String, $breed: String, $age: Int) {
    addPet(species: $species, name: $name, breed: $breed, age: $age) {
      _id
      username
    }
  }
`;

export const REMOVE_PET = gql`
  mutation Mutation($petId: String!) {
    removePet(petId: $petId) {
      _id
      username
      petCount
    }
  }
`;

export const UPDATE_PET = gql`
  mutation updatePet($petId: String!, $species: String, $name: String, $pic: String, $bio: String, $breed: String, $age: Int) {
    updatePet(petId: $petId, species: $species, name: $name, pic: $pic, bio: $bio, breed: $breed, age: $age) {
      _id
      name
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($petId: String!, $friendId: String!) {
    addFriend(petId: $petId, friendId: $friendId) {
      _id
      name
      friends {
        _id
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemovePet($petId: String!, $friendId: String!) {
    removeFriend(petId: $petId, friendId: $friendId) {
      _id
      name
      friends {
        _id
      }
    }
  }
`;

export const UPDATE_BIO = gql`
  mutation Mutation($petId: String!, $bio: String) {
    updateBio(petId: $petId, bio: $bio) {
      _id
      name
      bio
    }
  }
`;

export const ADD_DIAG = gql`
  mutation Mutation($petId: String!, $issue: String!, $location: String, $endDate: String, $startDate: String) {
    addDiag(petId: $petId, issue: $issue, location: $location, endDate: $endDate, startDate: $startDate) {
      _id
      name
      health {
        diagnosis {
          issue
          location
        }
      }
    }
  }
`;

export const REMOVE_DIAG = gql`
  mutation RemoveDiag($petId: String!, $diagId: String!) {
    removeDiag(petId: $petId, diagId: $diagId) {
      _id
      name
      health {
        diagnosis {
          _id
          issue
          location
        }
      }
    }
  }
`;

export const SET_PIN = gql`
  mutation setPin($petId: String!, $diagId: String!, $pinPosition: String!) {
    setPin(petId: $petId, diagId: $diagId, pinPosition: $pinPosition) {
      _id
      name
      health {
        diagnosis {
          _id
          issue
          pinPosition
        }
      }
    }
  }
`;

export const REMOVE_PIN = gql`
  mutation removePin($petId: String!, $diagId: String!) {
    removePin(petId: $petId, diagId: $diagId) {
      _id
      name
      health {
        diagnosis {
          _id
          issue
          pinPosition
        }
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation Mutation($petId: ID!, $title: String!, $startTime: String, $location: String, $type: String) {
    addEvent(petId: $petId, title: $title, startTime: $startTime, location: $location, type: $type) {
      _id
      name
      events {
        _id
        title
      }
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation Mutation($petId: ID!, $eventId: ID!) {
    removeEvent(petId: $petId, eventId: $eventId) {
      _id
      name
      events {
        _id
        title
        type
        location
        startTime
        status
        notes
      }
    }
  }
`;