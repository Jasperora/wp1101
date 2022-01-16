import { gql } from "@apollo/client";

export const EVENTS_QUERY = gql`
  query getEvents($name: String) {
    event(name: $name) {
      launcher
      startTime
      endTime
      name
      id
      attender
      content
    }
  }
`;

export const CHOOSETIME_QUERY = gql`
  query getChooseTime($userName: String) {
    chooseTime(userName: $userName)
  }
`;
