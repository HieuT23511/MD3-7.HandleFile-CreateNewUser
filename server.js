const http = require('http')
const fs = require ('fs')
const qs = require('qs');
const port = 8080;
const server = http.createServer((req, res)=>{
   if(req.method === "GET"){
       fs.readFile('./template/create.html',"utf-8",(err, dataHTML)=>{
       res.writeHead(200,{'Content-Type':'text/html'});
       res.write(dataHTML);
       return res.end()
       })
   } else {
       let data = '';
       req.on("data",chunk => {
           data += chunk
       })
       req.on("end",()=>{
           let dataName = `${qs.parse(data).name} , `
           fs.appendFile('./data/data.txt',dataName,err => {
               if(err){
                   console.log(err.message)
               }
               res.end('Write Data in File successfully!')
           })
       })
       req.on("error",()=>{
           console.log("error")
       })
   }
})
server.listen(port,"localhost",()=>{
    console.log(`Server is running at http://localhost:${port}`);
})