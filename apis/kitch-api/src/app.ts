import * as AWS from "aws-sdk";
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

enum RouteKeys {
    GET_MENUITEMS = "GET /kitchens/{kitchenId}/menuItems",
    PUT_MENUITEMS = "PUT /kitchens/{kitchenId}/menuItems/{menuItemId}"
}
function createDocClient() {
    console.log(`dynamodb endpoint = ${process.env.DYNAMODB_ENDPOINT}`);
    if (process.env.DYNAMODB_ENDPOINT) {
        return new AWS.DynamoDB.DocumentClient({
            endpoint: process.env.DYNAMODB_ENDPOINT
        });
    }
    return new AWS.DynamoDB.DocumentClient();
}

exports.lambdaHandler = async (event, context) => {

    try {
        const routeKey = `${event.httpMethod} ${event.resource}`;
        switch (routeKey) {
            case RouteKeys.GET_MENUITEMS: {
                const { kitchenId } = event.pathParameters;
                var docClient = createDocClient();
                const result = await docClient.scan({
                    TableName: "menuItems",
                    FilterExpression: "kitchenId= :k_id",
                    ExpressionAttributeValues: {
                        ':k_id': kitchenId
                    },
                }).promise();
                if (!result.Items) {
                    return {
                        'statusCode': 404
                    }
                }
                return {
                    'statusCode': 200,
                    'body': JSON.stringify({
                        menuItems: result.Items
                    })
                };
            }
            case RouteKeys.PUT_MENUITEMS: {
                const { kitchenId, menuItemId } = event.pathParameters;
                const menuItem = JSON.parse(event.body);
                var docClient = createDocClient();
                await docClient
                    .put({ TableName: "menuItems", Item: { id: menuItemId, kitchenId, ...menuItem } })
                    .promise();
                return {
                    statusCode: 201,
                };
            }

            default:
                return {
                    'statusCode': 404
                }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
