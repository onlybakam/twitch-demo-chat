/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChat = /* GraphQL */ `
  query GetChat($id: ID!, $limit: Int) {
    getChat(id: $id, limit: $limit) {
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
export const getMoreMessages = /* GraphQL */ `
  query GetMoreMessages($chatId: ID!, $limit: Int, $nextToken: String) {
    getMoreMessages(chatId: $chatId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chatId
        text
        createdAt
      }
      nextToken
    }
  }
`;
export const getMoreMessagesWithDLR = /* GraphQL */ `
  query GetMoreMessagesWithDLR($chatId: ID!, $limit: Int, $nextToken: String) {
    getMoreMessagesWithDLR(
      chatId: $chatId
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        chatId
        text
        createdAt
      }
      nextToken
    }
  }
`;
