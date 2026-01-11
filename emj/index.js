const http = require("http");
const fs = require('fs');

const PORT = 8080;

const handleRequest = (req, res) => {

    let fileName = '';

    switch(req.url){
        case '/':
            fileName = 'index.html';
            break;

        case '/feature':
            fileName = 'feature.html';
            break;

        default : 
            fileName = '404.html'
        }
        
    fs.readFile(fileName, (err,result)=>{
        if(!err){
            res.end(result);
        }
    })
};

const server = http.createServer(handleRequest);

server.listen(PORT, (err) => {
    if (!err) {
        console.log("Server Starting .");
        console.log("http://localhost:" + PORT);

    }
});
