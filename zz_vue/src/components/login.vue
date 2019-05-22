<template>
<div class="app-login">   
   <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">登录bilibili</h1>
	</header>   
    <div class="mui-content">
        <form id='login-form' class="mui-input-group">
            <div class="mui-input-row">
                <label>账号</label>
                <input v-model="name" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input v-model="pwd" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
            </div>
        </form>
        <div>
            <p>
              <a>忘记密码</a>
            </p>
        </div>
        <div>
            <button @click="jump">注册</button>
            <button @click="btnLogin">登陆</button>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            name:"",
            pwd:"",
        }
    },
    methods: {
        jump(){
            this.$router.push("/reg")
        },
        btnLogin(){
            var name=this.name
            var pwd=this.pwd
            var reg1=/^[a-z0-9_]{3,8}$/;
            var reg2=/\d{3,8}$/;
            if(!reg1.test(name)){
                this.$toast("用户名格式有误");
                return;
            }
            if(!reg2.test(pwd)){
                this.$toast("密码格式有误");
                return;
            }
            var params=new URLSearchParams();
            params.append("name",name);
            params.append("pwd",pwd);
            var url="http://127.0.0.1:3333/user/login";
            this.axios.post(url,params)
            .then(result=>{
                if(result.data.code==1){
                    this.$toast("登陆成功");
                    sessionStorage.setItem("name",name)
                    location.href="http://127.0.0.1:8765/#/space";
                }else{
                    this.$toast("用户名或密码失败")
                }
            })
        }
    },
    created() {
       
    },
}
</script>
<style scoped>
    .app-login>.mui-content{
        padding-top: 18%;
    }
    .app-login>.mui-content>div:nth-child(2){
        padding: 2%;
    }
    .app-login>.mui-content>div:nth-child(2)>p{
        text-align: right;
        line-height: .426667rem;
        font-family: PingFangSC-Regular;
        font-size: .346667rem;
        
    }
    .app-login>.mui-content>div:nth-child(2)>p>a{
        color: #fb7299;
    }
    .app-login>.mui-content>div:nth-child(3){
        display: flex;
    }
    .app-login>.mui-content>div:nth-child(3)>button:first-child{
        width: 50%;
        height: 3rem;
        margin:0 .5rem;
        color:#fb7299;
        border:#ff9db5 1px solid;
    }
    .app-login>.mui-content>div:nth-child(3)>button:last-child{
        width: 50%;
        margin-right: .5rem;
        background: #ff9db5;
        color:#fff;
    }
</style>