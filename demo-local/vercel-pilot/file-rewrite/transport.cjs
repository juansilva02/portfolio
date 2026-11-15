const https=require('node:https'),fs=require('node:fs');
const original=https.request;
https.request=function(...args){
 const opts=args[0];
 if(opts && typeof opts==='object' && (opts.hostname==='api-demos.zuzudev.pro'||opts.host==='api-demos.zuzudev.pro')){
  args[0]={...opts,hostname:'127.0.0.1',host:'127.0.0.1',port:19445,servername:'demo.zuzudev.pro',ca:fs.readFileSync('F:/Proyectos/portfolio/portfolio/demo-production/certs/ca.crt')};
 }
 return original.apply(this,args);
};
