const express=require("express");
var router=express.Router();
var pool=require("../pool");
router.get("/banner",(req,res)=>{
  var sql="SELECT * FROM zz_index_banner";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.write(JSON.stringify(result));
    res.end();
  })
})


router.get("/",(req,res)=>{
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
   pageSize = 6;
  }
  var obj = {code:1};
  var progress = 0;
  var sql =" SELECT * FROM zz_index LIMIT ?,?";
  var offset = (pno-1)*pageSize; 
  var ps = parseInt(pageSize);
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err)throw err;
    progress+=50;
    obj.data = result;
    if(progress==100){
     res.send(obj);
    }
  })
  var sql =" SELECT count(pid) AS c FROM zz_index";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    progress+=50;
    var pc = Math.ceil(result[0].c/pageSize);
    obj.pageCount = pc;
    if(progress==100){
      res.send(obj)
    }
  });    
});
module.exports=router;