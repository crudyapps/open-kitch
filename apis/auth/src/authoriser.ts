import * as jwt from 'jsonwebtoken';

var generatePolicy = function (principalId, effect, resource) {
    var authResponse: any = {};

    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument: any = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        var statementOne: any = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }

    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = {
        "stringKey": "stringval",
        "numberKey": 123,
        "booleanKey": true
    };
    return authResponse;
}

function getPublicKey() {
    const publicKeyRaw = process.env.ACCESS_TOKEN_PUBLIC_KEY;
    if (!publicKeyRaw) {
        console.log("ACCESS_TOKEN_PUBLIC_KEY environment variable is not set");
        throw new Error("ACCESS_TOKEN_PUBLIC_KEY environment variable is not set");
    }
    const publicKey = ['-----BEGIN PUBLIC KEY-----', ...publicKeyRaw.match(/.{1,64}/g) as string[], '-----END PUBLIC KEY-----'].join("\n");
    return publicKey;
}
exports.handler = async (event, context) => {
    const publicKey = getPublicKey();
    try {
        var authHeader = event.authorizationToken;
        if (authHeader.indexOf("Bearer") >= 0) {
            const token = authHeader.replace("Bearer ", "");
            const decodedToken: any = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
            console.log(decodedToken);
            if (decodedToken.userId !== 'anon') {
                return generatePolicy('user', 'Deny', event.methodArn);
            }
            return generatePolicy('user', 'Allow', event.methodArn);
        }
    }
    catch (err) {
        return generatePolicy('user', 'Deny', event.methodArn);
    }
};
