const express=require("express")
const router=express.Router();
const pool=require("../pool")


router.get("/",(req,res)=>{
  var uid=req.query.uid;
  var name=req.query.name;
  var obj={code:1};
  var sql1="SELECT * FROM zz_index where pid=?";
  pool.query(sql1,[uid],(err,result)=>{
    if(err)throw err;
    obj.data=result;
    req.session.result=result;
    var pid=req.session.result[0].pid;
    var sql2="SELECT * FROM zz_comments where pid=?";
    pool.query(sql2,[pid],(err,result)=>{
      if(err)throw err;
      obj.data2=result;
      obj.data2.name=name;
      res.send(obj);
    })
  })
})
//收藏
router.get("/collect",(req,res)=>{
  var uid=req.session.uid;
  var result=req.session.result[0];
  if(!uid){
    res.send({code:-1,msg:"请登陆",data:[]})
    return;
  }
  var sql='insert into zz_user_person set counts=?,pcounts=?,texts=?,index_url=?,uid=?';
  pool.query(sql,[result.counts,result.pcounts,result.texts,result.index_url,uid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:"收藏成功"});
  })
})
//评论
router.get("/comments",(req,res)=>{
  var uid=req.session.uid;
  var name=req.session.name;
  var pid=req.session.result[0].pid;
  var texts=req.query.texts
  console.log(uid)
  if(!uid){
    res.send({code:-1,msg:"请登陆",data:[]})
    return;
  }
  var sql='insert into zz_comments set texts=?,uid=?,name=?,pid=?';
  pool.query(sql,[texts,uid,name,pid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:"评论成功"});
  })
})
module.exports=router;