const axios=require("axios");
const fs=require('fs');
const Agent = require('https-proxy-agent');
const writer = fs.createWriteStream("./kk");
!async function() {
    try{
        const { data } = await axios({
            method:'get',
            url:"https://stream.wikimedia.org/v2/stream/recentchange",
            responseType:'stream',
            httpAgent: new Agent("http://localhost:8889"),
            httpsAgent: new Agent("http://localhost:8889"),
        })
        data.pipe(writer);
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
    }catch(e) {
        console.error(e);
    }
}()
