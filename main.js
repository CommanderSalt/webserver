const http = require("http")
const PORT = process.env.PORT || 80
const server = http.createServer()

server.on("request", async function(req, res){
    req.on("error", function(err){
        console.error(err)
    })
    res.statusCode = 200
    res.end(data)
})

server.listen(PORT, (err) => {
    if (err){
        console.error(`Server listening error: ${err}`)
        return
    }
    console.log(`Server started on port ${PORT}`)
})