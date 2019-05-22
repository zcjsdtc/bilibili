const express=require("express");
var router=express.Router();
var pool=require("../pool");

router.get("/",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请登陆",data:[]})
    return;
  }
  var obj={code:1}
  var sql1="select pid,counts,pcounts,texts,index_url from zz_user_person where uid=?";
  pool.query(sql1,[uid],(err,result)=>{
    if(err)throw err;
    obj.data1=result;
    var sql2="SELECT * FROM zz_user where uid=?";
    pool.query(sql2,[uid],(err,result)=>{
      if(err)throw err;
      obj.data2=result;
      res.send(obj);
    })
  })
}); 
router.get("/remove",(req,res)=>{
  var pid=req.query.pid;
  var sql="delete from zz_user_person where pid=?";
  pool.query(sql,[pid],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0)
      res.send({code:1,msg:"删除成功"});
    else 
      res.send({code:-1,msg:"删除失败"});
  })
}); 
const fs = require("fs");
const multer = require("multer");
var upload=multer({dest:"public/upload/"});
router.post("/upload",upload.single("file"),(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
      res.send({code:-1,msg:"请登陆",data:[]})
      return;
    }
    var src=req.file.originalname;
    //创建新文件名
    var ft=new Date().getTime();
    var tn=Math.floor(Math.random()*9999);
    var i3=src.lastIndexOf(".") //查找后缀.下标
    var suff=src.substring(i3) //从i3位置开始截取
    var d1=__dirname;
    var d2=d1.slice(0,-7)
    var des=d2+"/public/upload/"+ft+tn+suff;
    //将临时文件移动upload目录下
    //返回成功信息
    
    var uppic_url="http://127.0.0.1:3333/upload/"+ft+tn+suff;

    var sql="UPDATE zz_user SET uppic_url=? WHERE uid=?"
    pool.query(sql,[uppic_url,uid],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
        fs.renameSync(req.file.path,des);
        res.send({code:200,msg:'上传成功'});
      }
    });
    
})


module.exports=router;