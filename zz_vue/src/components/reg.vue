<template>
<div class="app-login">   
   <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">注册bilibili</h1>
	</header>   
    <div class="mui-content">
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>账号</label>
                <input v-model="name" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input v-model="pwd" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
            </div>
            <div class="mui-input-row">
                <label>确认</label>
                <input v-model="pwdc" type="password" class="mui-input-clear mui-input" placeholder="请确认密码">
            </div>
        </form>
        <div>
            <div>
                <p><a>注册协议</a></p>
            </div>
        </div>
        <div>
            <button @click="jump">登陆</button>
            <button @click="btnReg">同意注册协议并注册</button>
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
            pwdc:"",
        }
    },
    methods: {
        jump(){
            this.$router.push("/login")
        },
        btnReg(){
            var name=this.name;
            var pwd=this.pwd;
            var pwdc=this.pwdc;
            console.log(pwd,pwdc)
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
            if(pwd!=pwdc){
                this.$toast("两次密码不一致，请重新输入");
                return;
            }
            var params=new URLSearchParams();
            params.append("name",name);
            params.append("pwd",pwd);
            var url="http://127.0.0.1:3333/user/reg";
            this.axios.post(url,params)
            .then(result=>{
                this.$toast(result.data.msg);
            })
        },
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