import { AppSyncResolverHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import { GetMoreMessagesWithDLRQueryVariables } from './graphql/API'
var docClient = new AWS.DynamoDB.DocumentClient()
export const handler: AppSyncResolverHandler<GetMoreMessagesWithDLRQueryVariables, any> = async (event) => {
  console.log(event)
  const key = `chat#${event.arguments.chatId}`

  var params = {
    KeyConditionExpression: '#PK = :PK and begins_with(#SK, :SK)',
    ExpressionAttributeNames: { '#PK': 'PK', '#SK': 'SK' },
    ExpressionAttributeValues: { ':PK': key, ':SK': key + '#' },
    TableName: process.env.TABLE_NAME!,
    Limit: event.arguments.limit || 10,
    ExclusiveStartKey: event.arguments.nextToken
      ? JSON.parse(Buffer.from(event.arguments.nextToken, 'base64').toString())
      : null,
  }

  try {
    const queryResults = await docClient.query(params).promise()
    console.log('query results: ', queryResults)
    const results = {
      items: queryResults.Items!.map((item) => ({ ...item, text: `⚡️⚡️ ${item.text} ⚡️⚡️` })),
      nextToken: queryResults.LastEvaluatedKey
        ? Buffer.from(JSON.stringify(queryResults.LastEvaluatedKey)).toString('base64')
        : null,
    }
    console.log('final results', results)
    return results
  } catch (err) {
    console.log('Error', err)
  }
  return []
}
