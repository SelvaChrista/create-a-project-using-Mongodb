const http = require("http");
const fs = require("fs");
const { error } = require("console");

const MongoClient = require("mongodb").MongoClient;
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology:true})


const server = http.createServer((req, res)=>{
   if(req.method == "GET" && req.url == "/"){
   fs.readFile("index.html", (error, data)=>{
    if(error) throw error
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(data);
});
}

if(req.method == "POST" && req.url == "/addemp"){
   
    let body ="" ;
    req.on("data" , (chunk)=>{
        body += chunk+toString();
    } );

      req.on("end", ()=>{
       
        const keyValuepairs = body.split("&");
        const formData = {};
        keyValuepairs.forEach((pairs) => {
            const [keyName, keyValue] = pairs.split("=");
            formData[keyName] = decodeURIComponent(keyValue);
           
            
        });

        run(formData);
        res.end();

      });
}


});

async function run (document) {
    client.connect();
    const database = client.db("db1");
    const collection = database.collection("emp");


    const result = await collection.insertOne(document);
    console.log(result);

}




server.listen(8080);