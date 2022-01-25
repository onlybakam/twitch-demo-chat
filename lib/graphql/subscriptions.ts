/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($chatId: ID!) {
    onCreateMessage(chatId: $chatId) {
      id
      chatId
      text
      createdAt
    }
  }
`;
