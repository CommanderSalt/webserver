const http = require("http")
const PORT = process.env.PORT || 80
const server = http.createServer()
const cache = {[1]: 0, [2]: 0}

server.on("request", async function(req, res){
    req.on("error", function(err){
        console.error(err)
    })

    if (req.method !== "GET"){
        res.statusCode = 405
        res.end()
        return
    }

    let url = req.url
    if (url == "/"){
        res.statusCode = 200
        res.end()
        return
    }
    
    let s = url.split("/")

    if (s[1] == "likes"){
        if (Date.now() - cache[1] > 0) {
            let response = await request({
                ["url"]: `https://games.roblox.com/v1/games/votes?universeIds=5085238610`,
                ["method"]: "GET",
            })

            let result = null
            if (response.status == 200){
                console.log(response)
                result = response.data.data.upVotes  
                cached[2] = result
            } else {    
                console.log("Error " + response.status + ": " + response.statusText + " while getting likes")
            }

            res.statusCode = 200
            res.end(JSON.stringify({
                ["likes"]: cached[2]
        }))

            cached[1] = Date.now()
        } else {
            res.statusCode = 200
            res.end(JSON.stringify({
                ["likes"]: cache[2]
        }))
        }

        return
    }

    res.statusCode = 404
    res.end()
})

server.listen(PORT, (err) => {
    if (err){
        console.error(`Server listening error: ${err}`)
        return
    }
    console.log(`Server started on port ${PORT}`)
})
