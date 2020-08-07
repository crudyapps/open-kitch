import * as AWS from "aws-sdk";

enum RouteKeys {
    GET_MENUITEMS = "GET /kitchens/{kitchenId}/menuItems",
    PUT_MENUITEM = "PUT /kitchens/{kitchenId}/menuItems/{menuItemId}",
    DELETE_MENUITEM = "DELETE /kitchens/{kitchenId}/menuItems/{menuItemId}"
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
    const webClientOrigin = process.env.WEB_CLIENT_ORIGIN;
    const headers = {
        "Access-Control-Allow-Origin": webClientOrigin,
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
    };
    try {
        const routeKey = `${event.httpMethod} ${event.resource}`;
        switch (routeKey) {
            case RouteKeys.GET_MENUITEMS: {
                const { kitchenId } = event.pathParameters;
                var docClient = createDocClient();
                const result = await docClient.query({
                    IndexName: "ix-kitchen",
                    TableName: "menuItems",
                    KeyConditionExpression: "#kitchenId= :v_kid",
                    ExpressionAttributeNames: {
                        "#kitchenId": "kitchenId"
                    },
                    ExpressionAttributeValues: {
                        ":v_kid": Number(kitchenId)
                    },
                }).promise();
                if (!result.Items) {
                    return {
                        headers,
                        'statusCode': 404
                    }
                }
                return {
                    headers,
                    'statusCode': 200,
                    'body': JSON.stringify({
                        menuItems: result.Items
                    })
                };
            }
            case RouteKeys.PUT_MENUITEM: {
                const { kitchenId, menuItemId } = event.pathParameters;
                const menuItem = JSON.parse(event.body);
                var docClient = createDocClient();
                await docClient
                    .put({ TableName: "menuItems", Item: { id: menuItemId, kitchenId: Number(kitchenId), ...menuItem } })
                    .promise();
                return {
                    headers,
                    statusCode: 201,
                };
            }
            case RouteKeys.DELETE_MENUITEM: {
                const { menuItemId } = event.pathParameters;
                var docClient = createDocClient();
                await docClient
                    .delete({ TableName: "menuItems", Key: { id: menuItemId } })
                    .promise();
                return {
                    headers,
                    statusCode: 200,
                };
            }
            default:
                return {
                    headers,
                    'statusCode': 404
                }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
