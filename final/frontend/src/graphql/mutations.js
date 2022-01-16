import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!, $password: String!) {
    createUser(name: $name, password: $password) {
      status
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      status
      token
    }
  }
`;

export const CREATE_EVENT_MUTATION = gql`
  mutation createEvent(
    $name: String!
    $content: String!
    $launcher: String!
    $endTime: [Date]!
    $startTime: [Date]!
    $id: String!
  ) {
    createEvent(
      name: $name
      content: $content
      launcher: $launcher
      endTime: $endTime
      startTime: $startTime
      id: $id
    ) {
      id
      name
    }
  }
`;

export const ADD_EVENT_MUTATION = gql`
  mutation addEvent($userName: String!, $id: String!) {
    addEvent(userName: $userName, id: $id)
  }
`;

export const MODIFY_EVENT_ATTENDER_MUTATION = gql`
  mutation modifyEventAttender(
    $action: String!
    $eventID: String!
    $userName: String!
    $index: Int!
  ) {
    modifyEventAttender(
      action: $action
      eventID: $eventID
      userName: $userName
      index: $index
    )
  }
`;

export const INITIALIZATION_MUTATION = gql`
  mutation initialization {
    initialization {
      authName
      status
    }
  }
`;

export const DELETE_EVENT_MUTATION = gql`
  mutation deleteEvent($eventID: String!) {
    deleteEvent(eventID: $eventID)
  }
`;
