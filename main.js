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

    const chunks = []
    req.on('data', chunk => chunks.push(chunk))

    req.on("end", async function() {

        const data = Buffer.concat(chunks).toString()
        let parsed = JSON.parse(data)
        let url = req.url

        console.log(url)
        console.log(parsed)
      
        /*let response = await axios.request({
            url: "https://discord.com/api/webhooks" + url,
            method: "POST",
            data: parsed
        })
    
        if (response.status == 200){
            console.log("Message created")
        }
            sendresponse(res, response.status, JSON.stringify(response.data))
        */

         sendresponse(res, 200)
        
    })
})

server.listen(PORT, (err) => {
    if (err) {
        console.error(`Server listening error: ${err}`)
        return
    }
    console.log(`Server started on port ${PORT}`)
})