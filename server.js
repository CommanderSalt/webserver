// Dependencies
const proxy = require('http-proxy');
const https = require('https');
const http = require('http');
const crypto = require('crypto');
const assert = require('assert');
const zlib = require('zlib');
const { URL } = require('url');

const PORT = process.env.PORT || 80
const returndata = {
    ["test"]: 0,
    ["xd"]: 1,
    ["lol"]: 2,
}

const writeErr = (res, code, message) => {
    res.statusCode = code
    if (message){res.statusMessage = message}
    res.end()
};

const server = http.createServer()
server.on('request', (req, res) => {
    const { headers, method, url } = req;
    let body = []
    req.on("error", (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
    body = Buffer.concat(body).toString();
    res.on('error', (err) => {
        console.error(err);
    });
    
    if (req.method == "GET"){
        res.statusCode = 200
        res.write(JSON.stringify(returndata))
        res.end()
    } else {
        writeErr(res, 400, "This Endpoint only supports the method GET")
        return
    }
    })
})

server.listen(PORT, (err) => {
  if (err) {
    console.error(`Server listening error: ${err}`);
    return;
  }
  console.log(`Server started on port ${PORT}`);
});
