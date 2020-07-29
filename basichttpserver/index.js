const http=require('http');
const port=8000;
const fs=require('fs');

function requestHandler(req,res){
   console.log(req.url);
   res.writeHead(200,{'content-type': 'text/html'});
   
   let filePath;

   switch(req.url){
       case '/':
           filePath= './Portfolio Website/index.html';
           console.log("1");
           break;
       case '/profile':
            filepath= './profile.html';
            console.log("2");
            break;
       default:
        console.log("3");
            filePath='./404.html';
   }

   

   fs.readFile(filePath,function(err,data){
       if(err){
           console.log('error ',err);
           return res.end('<h1>Error</h1>');
       }
       if(filePath=='./profile.html'){
        return res.send(data);
       }
       return res.end(data);
   });

}


const server= http.createServer(requestHandler);

server.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }

    console.log("Server is running on port : " ,port);
});