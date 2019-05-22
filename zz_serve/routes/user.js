const express=require("express");
var router=express.Router();
var pool=require("../pool");

router.post("/login",(req,res)=>{
  var {name,pwd} = req.body;
  var sql = "SELECT uid FROM zz_user WHERE name = ? AND pwd=md5(?)";
  pool.query(sql,[name,pwd],(err,result)=>{
     if(err)throw err;
     if(result.length==0){
       res.send({code:-1,msg:"用户名或密码有误"});
     }else{
       var uid=result[0].uid;
       req.session.uid=uid;
       req.session.name=name;
       res.send({code:1,msg:"登录成功"})
     }
  });
}); 
router.post('/reg',(req,res)=>{
	var {name,pwd}=req.body;
	var sql='insert into zz_user set name=?,pwd=md5(?)';
	pool.query(sql,[name,pwd],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'注册成功'});
		}
	});
});

module.exports=router;