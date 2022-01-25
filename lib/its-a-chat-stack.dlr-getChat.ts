import { AppSyncResolverHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
var docClient = new AWS.DynamoDB.DocumentClient()
export const handler: AppSyncResolverHandler<any, any> = async (event) => {
  console.log(event)
  const key = `chat#${event.arguments.chatId}`

  var params = {
    KeyConditionExpression: '#PK = :PK and begins_with(#SK, :SK)',
    ExpressionAttributeNames: { '#PK': 'PK', '#SK': 'SK' },
    ExpressionAttributeValues: { ':PK': key, ':SK': key },
    TableName: process.env.TABLE_NAME!,
    Limit: event.arguments.limit || 10,
    ExclusiveStartKey: event.arguments.nextToken,
  }

  try {
    const results = await docClient.query(params).promise()
    console.log('results: ', results)
    return { items: results.Items!.map((item) => ({ ...item, text: `⚡️⚡️ ${item.text} ⚡️⚡️` })) }
  } catch (err) {
    console.log('Error', err)
  }
  return []
}
