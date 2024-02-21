const { stat } = require("fs");
const http = require("http")
const axios = require("axios").default;
const PORT = process.env.PORT || 80
const server = http.createServer()


function sendresponse(res, status, body){
    res.statusCode = status
    res.end(body)
}

server.on("request", async function(req, res) {
    req.on("error", function(err) {
        console.error(err)
    })

    if (req.url == "/ping"){
        sendresponse(res, 200)
        return
    }

    if (req.method !== "POST") {
        sendresponse(res, 405)
        return
    }

    let url = req.url

    let response = await http.request({
        url: "https://discord.com/api/webhooks" + url,
        method: "POST",
        data: req.data
    })

    if (response.status == 200){
        console.log("Message created")
    }

    sendresponse(req, response.status, JSON.stringify(response.data))
})

server.listen(PORT, (err) => {
    if (err) {
        console.error(`Server listening error: ${err}`)
        return
    }
    console.log(`Server started on port ${PORT}`)
})