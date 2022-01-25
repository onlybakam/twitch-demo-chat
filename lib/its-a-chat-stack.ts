import * as cdk from '@aws-cdk/core'
import * as appsync from '@aws-cdk/aws-appsync'
import * as dynamodb from '@aws-cdk/aws-dynamodb'
import * as lambda from '@aws-cdk/aws-lambda-nodejs'

export class ItsAChatStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'ItsAChat',
      schema: appsync.Schema.fromAsset('./lib/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
      logConfig: {
        excludeVerboseContent: false,
        fieldLogLevel: appsync.FieldLogLevel.ALL,
      },
    })

    const table = new dynamodb.Table(this, 'ItsAChatTable', {
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
    })

    const chatDS = api.addDynamoDbDataSource('chatTableDS', table)

    chatDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'createChat',
      requestMappingTemplate: appsync.MappingTemplate.fromFile('./lib/resolvers/createChat.req.vtl'),
      responseMappingTemplate: appsync.MappingTemplate.fromFile('./lib/resolvers/createChat.res.vtl'),
    })

    chatDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'createMessage',
      requestMappingTemplate: appsync.MappingTemplate.fromFile('./lib/resolvers/createMessage.req.vtl'),
      responseMappingTemplate: appsync.MappingTemplate.fromFile('./lib/resolvers/createMessage.res.vtl'),
    })

    chatDS.createResolver({
      typeName: 'Query',
      fieldName: 'getChat',
      requestMappingTemplate: appsync.MappingTemplate.fromFile('./lib/resolvers/getChat.req.vtl'),
      responseMappingTemplate: appsync.MappingTemplate.fromFile('./lib/resolvers/getChat.res.vtl'),
    })

    chatDS.createResolver({
      typeName: 'Query',
      fieldName: 'getMoreMessages',
      requestMappingTemplate: appsync.MappingTemplate.fromFile('./lib/resolvers/getMoreMessages.req.vtl'),
      responseMappingTemplate: appsync.MappingTemplate.fromFile('./lib/resolvers/getMoreMessages.res.vtl'),
    })

    const dlr = new lambda.NodejsFunction(this, 'dlr-getChat', {
      environment: { TABLE_NAME: table.tableName },
    })
    table.grantReadData(dlr)
    const dlrDS = api.addLambdaDataSource('dlr', dlr)
    dlrDS.createResolver({
      typeName: 'Query',
      fieldName: 'getMoreMessagesWithDLR',
    })
  }
}
