const Bundler = require('parcel-bundler');
const express = require('express');
const https = require('https');
const fs = require('fs');
var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
var options = {
    key: key,
    cert: cert
};
const bundler = new Bundler('src/index.html', {
    cache: false
});

const app = express();
const PORT = process.env.PORT || 1234;

app.post("/login", (request, response) => {
    response
        .cookie("__Secure-identity-token", "some-secret-token", { sameSite: "strict", httpOnly: true, secure: true })
        .redirect(302, "/")
})
app.use(bundler.middleware());

var server = https.createServer(options, app);

server.listen(PORT, () => {
    console.log(`dev server ready at https://localhost:${PORT}`);
})