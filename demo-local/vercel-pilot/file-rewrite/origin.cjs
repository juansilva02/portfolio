const https=require('node:https'),fs=require('node:fs'),crypto=require('node:crypto');
const certs='F:/Proyectos/portfolio/portfolio/demo-production/certs/';
https.createServer({key:fs.readFileSync(certs+'local.key'),cert:fs.readFileSync(certs+'local.crt')},(req,res)=>{
 const hash=crypto.createHash('sha256');let size=0;
 req.on('data',chunk=>{size+=chunk.length;hash.update(chunk)});
 req.on('end',()=>{res.setHeader('content-type','application/json');res.end(JSON.stringify({size,hash:hash.digest('hex'),tenant:req.headers['x-demo-host'],authenticated:req.headers['x-demo-gateway']==='s'.repeat(40)}))});
}).listen(19445,'127.0.0.1');
