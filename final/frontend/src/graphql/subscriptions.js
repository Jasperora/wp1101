import { gql } from "@apollo/client";

export const EVENT_CREATED_SUBSCRIPTION = gql`
  subscription OnEventCreated($name: String!) {
    eventCreated(name: $name) {
      event {
        launcher
        startTime
        endTime
        name
        id
        attender
        content
      }
    }
  }
`;

export const EVENT_UPDATED_SUBSCRIPTION = gql`
  subscription OnEventUpdated($userName: String!) {
    eventUpdated(userName: $userName) {
      event {
        launcher
        startTime
        endTime
        name
        id
        attender
        content
      }
    }
  }
`;

export const EVENT_DELETED_SUBSCRIPTION = gql`
  subscription OnEventDeleted {
    eventDeleted
  }
`;

export const CHOOSETIME_UPDATED_SUBSCRIPTION = gql`
  subscription OnChooseTimeUpdated($userName: String!) {
    chooseTimeUpdated(userName: $userName)
  }
`;
