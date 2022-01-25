/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChat = /* GraphQL */ `
  mutation CreateChat($name: String!) {
    createChat(name: $name) {
      id
      name
      createdAt
      updatedAt
      messages {
        nextToken
      }
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage($chatId: ID!, $text: String!) {
    createMessage(chatId: $chatId, text: $text) {
      id
      chatId
      text
      createdAt
    }
  }
`;
