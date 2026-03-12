const fs = require("fs");

let data = JSON.parse(fs.readFileSync("Sakura fall.json","utf8"));

data.layers.forEach(layer=>{
  let p = layer?.ks?.p?.k;

  if(Array.isArray(p) && p.length>1){

    let end = p[p.length-1];
    let start = p[0];

    if(end.s){
      end.s[1] = 4100;   // vị trí rơi cuối
    }

    if(start.to){
      start.to[1] = 1500;  // lực rơi xuống
    }

    if(start.ti){
      start.ti[1] = -1200;
    }

  }
});

fs.writeFileSync("layers-fixed.json",JSON.stringify(data,null,2));