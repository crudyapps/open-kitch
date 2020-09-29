import * as AWS from "aws-sdk";
import axios from "axios";

function createDocClient() {
    console.log(`dynamodb endpoint = ${process.env.DYNAMODB_ENDPOINT}`);
    if (process.env.DYNAMODB_ENDPOINT !== 'notset') {
        return new AWS.DynamoDB.DocumentClient({
            endpoint: process.env.DYNAMODB_ENDPOINT
        });
    }
    return new AWS.DynamoDB.DocumentClient();
}

exports.handler = async (event, context) => {
    var docClient = createDocClient();
    await Promise.all(event.Records.map(async (record) => {
        const kitchenId = record.kinesis.partitionKey;
        var payload = Buffer.from(record.kinesis.data, 'base64').toString();
        const json = payload.slice(6);
        console.log(json);
        const kitchenEvent = JSON.parse(json);
        const { name, clientId } = kitchenEvent.headers
        switch (name) {
            case "menuItemSaveRequested": {
                const { menuItem } = kitchenEvent;
                console.log("saving menu item...");
                await docClient
                    .put({ TableName: "menuItems", Item: { kitchenId: Number(kitchenId), ...menuItem } })
                    .promise();
                console.log("saving menu item completed");
                await axios.put(`https://apps.kahgeh.com/sse/clients/${clientId}/events`,
                    { event: "savedMenuItem", id: menuItem.id, kitchenId: Number(kitchenId) }
                );
                break;
            }
            default:
                console.log(`unknown event ${name}`);
        }
    }));
    console.log("completed");
    // case RouteKeys.PUT_MENUITEM: {
    //     const { kitchenId, menuItemId } = event.pathParameters;
    //     const menuItem = JSON.parse(event.body);
    //     var docClient = createDocClient();
    //     await docClient
    //         .put({ TableName: "menuItems", Item: { id: menuItemId, kitchenId: Number(kitchenId), ...menuItem } })
    //         .promise();
    //     return {
    //         headers,
    //         statusCode: 201,
    //     };
    // }
    // case RouteKeys.DELETE_MENUITEM: {
    //     const { menuItemId } = event.pathParameters;
    //     var docClient = createDocClient();
    //     await docClient
    //         .delete({ TableName: "menuItems", Key: { id: menuItemId } })
    //         .promise();
    //     return {
    //         headers,
    //         statusCode: 200,
    //     };
    // }
}