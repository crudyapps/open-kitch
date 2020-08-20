exports.handler = async (event, context) => {
    console.log(event);
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