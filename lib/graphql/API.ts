/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Chat = {
  __typename: "Chat",
  id: string,
  name?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  messages?: MessageConnection | null,
};

export type MessageConnection = {
  __typename: "MessageConnection",
  items?:  Array<Message > | null,
  nextToken?: string | null,
};

export type Message = {
  __typename: "Message",
  id: string,
  chatId: string,
  text: string,
  createdAt?: string | null,
};

export type CreateChatMutationVariables = {
  name: string,
};

export type CreateChatMutation = {
  createChat?:  {
    __typename: "Chat",
    id: string,
    name?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    messages?:  {
      __typename: "MessageConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateMessageMutationVariables = {
  chatId: string,
  text: string,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    id: string,
    chatId: string,
    text: string,
    createdAt?: string | null,
  } | null,
};

export type GetChatQueryVariables = {
  id: string,
  limit?: number | null,
};

export type GetChatQuery = {
  getChat?:  {
    __typename: "Chat",
    id: string,
    name?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    messages?:  {
      __typename: "MessageConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetMoreMessagesQueryVariables = {
  chatId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetMoreMessagesQuery = {
  getMoreMessages?:  {
    __typename: "MessageConnection",
    items?:  Array< {
      __typename: "Message",
      id: string,
      chatId: string,
      text: string,
      createdAt?: string | null,
    } > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMoreMessagesWithDLRQueryVariables = {
  chatId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetMoreMessagesWithDLRQuery = {
  getMoreMessagesWithDLR?:  {
    __typename: "MessageConnection",
    items?:  Array< {
      __typename: "Message",
      id: string,
      chatId: string,
      text: string,
      createdAt?: string | null,
    } > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  chatId: string,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    id: string,
    chatId: string,
    text: string,
    createdAt?: string | null,
  } | null,
};
