<template>
<div class="app-space">
    <header id="header" class="mui-bar mui-bar-tansparent">
        <div id="my-header">
            <router-link to="/index"><img src="../img/logo.png" alt=""></router-link>
            <div>
                <a><span class="mui-icon mui-icon-search"></span></a>
            </div>
            <div class="touxiang">
                <div v-if="!name">
                    <img src="../img/akari.jpg">
                </div>
                <div @click="actionSheet" v-else>
                    <img :src="uppic" @click="actionSheet">
                    <mt-actionsheet :actions= "actions" v-model="sheetVisible">
                    </mt-actionsheet>
                    <input id="upload_file" @change="getfile" type="file" name="file" style="display: none">
                </div>
            </div>
            <div class="app"><p>下载 App</p></div>
        </div> 
    </header> 
    <div></div> 
    <div class="space">
        <img src="../img/bannerTop.png">
        <div id="login-before" v-if="!name">
            <div>
                <button @click='jump1' type='button' class='mui-btn'>注册</button>
            </div>
            <div>
                <button @click='jump2' type='button' class='mui-btn mui-btn-pink'>登陆</button>
            </div>
        </div>
        <div id="login-after" v-else>
            <span class="">{{name}}</span>
            <span><button @click="cancell">注销</button></span>
            <!-- <div class="upload">
                <div class="page-actionsheet-wrapper">
                  <button class="mint-button mint-button--default mint-button--large" @click="actionSheet">
                    <label class="mint-button-text">投稿</label>
                  </button>
                </div>
                 <mt-actionsheet :actions= "actions" v-model="sheetVisible">
                    
                </mt-actionsheet>
                <input id="upload_file" @change="getfile" type="file" name="file" style="display: none">
            </div> -->
        </div>
    </div> 
    <div>
        <div class="navlist">
            <ul>
                <li class="navli"  v-for="(item,index) in navList" :class="{'activeT':nowIndex===index}" @click="tabClick(index)"><i>{{item.name}}</i>
                </li>
            </ul>
        </div>
        <div class="swiper-container swiper_con" >
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="index-content">
                        <ul class="mui-table-view">
                            <li class="mui-table-view-cell" v-for="(item, i) in lists" :key="i">
                                <a>
                                    <img class="mui-media-object mui-pull-left" :src="item.index_url">
                                    <div class="mui-media-body">
                                        <span>{{item.counts}}</span>
                                        <p class="mui-ellipsis">{{item.texts}}</p>
                                    </div>
                                </a> 
                                <a @click="remove" :data-pid="item.pid" class="mui-btn">删除</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="swiper-slide">
                    
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Swiper from 'swiper-4.5.0'
export default {
    data() {
        return {
            lists:[],
            name:"",
            navList:[
                {name:'我的收藏'},
                {name:'我的投稿'},
            ],
            nowIndex:0,
            actions:[{
                name: '摄影',
                method : this.getCamera	// 调用methods中的函数
                }, {
                    name: '选择', 
                    method : this.getLibrary	
            }],
            sheetVisible: false,
            uppic:""
        }
    },
    
    methods: {
        getfile:function(e){
            var file=e.target.files[0];
            var param = new FormData();
            param.append('file',file);
            var config = {
                headers:{'Content-Type':'multipart/form-data'}
            }; 
            var url="http://127.0.0.1:3333/user_person/upload";
            this.axios.post(url,param,config)
            .then(result=>{
                console.log(result)
                this.load()
            })
        },
        actionSheet: function(){
          this.sheetVisible = true;
        },
        getCamera: function(){
          console.log("打开照相机")
        },
        getLibrary: function(){
            document.getElementById('upload_file').click();
        },

        cancell(){
            sessionStorage.removeItem("name");
            this.load();
        },
        remove(e){
            this.$messagebox.confirm("确认执行此操作")
            .then(result=>{
                var url="http://127.0.0.1:3333/user_person/remove";
                var pid=e.target.dataset.pid;
                this.axios.get(url,{
                    params:{pid}
                }).then(result=>{
                    this.load()
                })
            })
            .catch(result=>{
                console.log("取消"+result)
            })
        },
        jump1(){
            this.$router.push("/reg")
        }, 
        jump2(){
            this.$router.push("/login")
        },
        load(){
            var url="http://127.0.0.1:3333/user_person";
            this.axios.get(url).then(result=>{
                if(result.data.code<1){
                    this.$toast("请登陆");
                    return;
                }
                var rows=result.data.data1;
                this.lists=rows;
                var name=sessionStorage.getItem("name");
                this.name=name;
                this.uppic=result.data.data2[0].uppic_url
            })
        },
        tabClick(index){
            this.nowIndex = index
            this.mySwiper.slideTo(index,1000,false)
        },
        upload(e){
            var file=e.target.files
            console.log(file) 
        }
    },
    created() {
        this.load();
    },
    mounted() {
        this.mySwiper = new Swiper('.swiper-container',{
            initialSlide:0,
            autoplay:false,
            keyboardControl:true,
            autoHeight:true,
            observer:true,
            observeParents:true,
            onSlideChangeStart:function(){
                // console.log(that.mySwiper.activeIndex)
                that.nowIndex=that.mySwiper.activeIndex
            }
       })
    },
}
</script>
<style scoped>
    .app-space{
        position: relative;
    }
    .app-space>header{
        position: fixed;
        z-index: 10;
        padding: 0.2rem;
        background-image: url(../img/home.png);
        height: 4rem;
    }
    .app-space>header>#my-header{
        display: flex;
    }
    .app-space #my-header>div:nth-child(2){
        width: 2rem;
        height: 2rem;
        background: #fff;
        border-radius: 50%;
        margin-top: 1rem;
        position: absolute;
        right: 7.7rem;
        line-height: 2.6rem;
    }
    .app-space #my-header>div:nth-child(2)>a span{
        padding: 0;
    }
    .app-space .touxiang>div{
        width: 2rem;
        height: 2rem;
        background: #fff;
        margin-top: 1rem;
        position: absolute;
        right: 5.2rem;
        line-height: 2.4rem;
        border-radius: 50%;
    }
    .app-space>header .touxiang>div>img{
        border-radius: 50%;
        width: 100%;
    }
    
    .app-space>header .app{
        display: block;
        position: absolute;
        right: 0.5rem;
        margin-top: 1rem;
        width: 4rem;
        height: 2rem;
        border: .02133rem solid #fb7299;
        border-radius: .17067rem;
        background-color: #fb7299;
        line-height: 2rem;
    }
    .app-space>header .app>p{
        font-size: .55467rem;
        text-align: center;
        color: #fff;
    }
    .app-space #my-header>a>img{
        width: 7rem;
        margin-top:0.2rem; 
    }
    .app-space>header>div>img{
        width: 2rem;
    }
    .app-space>div:nth-child(2){
        position: relative;
        height: 4rem;
    }
    .app-space>.space>img{
        width: 100%;
    }
    .app-space>.space{
        position: relative;
    }
    .app-space>.space>div>div{
        position: absolute;
        top:55%;
    }
    .app-space>.space>div>div:nth-child(1){
        left:22%;
    }
    .app-space>.space>div>div:nth-child(2){
        right:22%;
    }
    .app-space>.space .mui-btn-pink{
        color: #fff;
        border: 1px solid #fb7299;
        background-color: #fb7299;
    }
    .app-space>.space #login-after{
        position: relative;
        height: 3rem;
    }
    .app-space>.space #login-after>span:first-child{
        position: absolute;
        top: 0.7rem;
        left: 4rem;
    }
    .app-space>.space #login-after>span:last-child{
        position: absolute;
        top: 0.5rem;
        right: 4rem;
        
    }
    .app-space>.space #login-after button{
        background-color: #fb7299;
        color: #fff;
    }
    .app-space>.index-content{
        max-width: 100%;
    }
    
    .app-space>.index-content .mui-media-body>span{
        position: relative;
        left: -7rem;
    }
    .app-space .index-content .mui-btn{
        color: #fff;
        background-color: #fb7299;
        right: 0;
        height:100%;
        line-height: 50px;
    }
    .app-space .swiper-slide{
        height:50rem;
    }
    .app-space .navlist ul{
        display: flex;
        list-style: none;
    }
    .app-space .navlist ul>li{
        width: 50%;
        height: 2rem;
        line-height: 2rem;
        border: 1px solid #fb7299;
        background: #fb7299;
        color: #fff;
    }
    .app-space .upload{
        position: relative;
    }
    .app-space .upload .page-actionsheet-wrapper{
        position: absolute;
        top:-6rem;
        left: 10rem;
    }
</style>