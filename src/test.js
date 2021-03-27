const axios=require("axios");
const fs=require('fs');
const writer = fs.createWriteStream("./kk");
axios({
    method:'get',
    url:"https://stream.wikimedia.org/v2/stream/recentchange",
    responseType:'stream',
    
    proxy: {
        protocol: 'http',
        host: 'localhost',
        port: 7890,
      },
}).then((res)=>{

    res.data.pipe(writer);
    writer.on('error', err => {
        console.log("writer"+err);
        writer.close();
      });
      writer.on('close', () => {
        console.log("writer close");
      });
      writer.on("pipe",(src)=>{
          console.log("piping");
          console.log(src);
      });
      writer.on("ready",()=>{
          console.log("ready");
      })
}).catch((err)=>{
    console.log(err);
});
