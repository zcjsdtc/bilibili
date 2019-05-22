<template>
<div class="app-details">
    <header id="header" class="mui-bar mui-bar-tansparent">
        <div id="my-header">
            <router-link to="/index"><img src="../img/logo.png" alt=""></router-link>
            <div>
                <a><span class="mui-icon mui-icon-search"></span></a>
            </div>
            <div>
                <img @click="jump1" src="../img/akari.jpg" alt="">
            </div>
            <div><p>下载 App</p></div>
        </div> 
    </header>
    <div></div>
    <div class="index">
        <div class="play">
            <img src="../img/ic_player.png">
            <span>立即播放</span>
        </div> 
        <div>
            <p v-text="list[0].texts"></p>
        </div>
        <div>
            <span>点滴菌</span>
            <span v-text="list[0].counts"></span>
            <span v-text="`${list[0].pcounts}弹幕`"></span>
            <span>4-15</span>
        </div>
    </div>
    <div class="xxx">
        <div>
            <span class="mui-icon mui-icon-star"></span>
            <span>收藏</span>
        </div>
        <div>
            <span class="mui-icon mui-icon-download"></span>
            <span>收藏</span>
        </div>
        <div>
            <span class="mui-icon mui-icon-redo"></span>
            <span @click="collect">收藏</span>
        </div>
        <div>
            <span class="mui-icon mui-icon-chatbubble"></span>
            <span>评论</span>
        </div>
    </div>
    <div class="comments">
        <h3>评论 <span>( 69947 )</span></h3>
        <div class="comments_put">
            <img src="../img/noface.gif">
            <input type="text" v-model="texts">
            <button @click="comment">评论</button>
        </div>
        <div class="comments_item">
            <div v-for="(item, i) in commentsList" :key="i">
                <a href=""><img src="../img/noface.gif"></a>
                <a href="">{{item.name}}</a>
                <span>4-20</span>
                <p>{{item.texts}}</p>
            </div>
            <!-- <div>
                <a href=""><img src="../img/noface.gif"></a>
                <a href="">残月·千桜</a>
                <span>4-20</span>
                <p>看完了lorre的视频
                    =看完了21部漫威电影
                    =看完了整个漫威宇宙
                    =看完了复联4[蛆音娘_滑稽]
                    那么，接下来我就要开始剧透了[阴险]</p>
            </div> -->
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:["uid"],
    data() {
        return {
            list:[{
                texts:0
            }],
            commentsList:[],
            texts:"",
        }
    },
    methods: {
        comment(){
            var texts=this.texts;
            var url="http://127.0.0.1:3333/details/comments";
            this.axios.get(url,{params:{
                texts
            }})
            .then(result=>{
                if(result.data.code<0){
                    this.$toast(result.data.msg)
                }else{
                    this.$toast(result.data.data);
                    this.load();
                }
            })
            this.texts="";
        },
        jump1(){
            this.$router.push("/space")
        },
        load(){
            var url="http://127.0.0.1:3333/details";
            this.axios.get(url,{
                params:{uid:this.uid}
            }).then(result=>{
                this.list=result.data.data;
                this.commentsList=result.data.data2;
            })
        },
        collect(){
             var url="http://127.0.0.1:3333/details/collect";
            this.axios.get(url).then(result=>{
                this.$toast(result.data.data);
            })
        },
    },
    created() {
        this.load();
    },
}
</script>
<style scoped>
    .app-details{
        position: relative;
    }
    .app-details>header{
        position: fixed;
        z-index: 10;
        padding: 0.2rem;
        background-image: url(../img/home.png);
        height: 4rem;
    }
    .app-details>header>#my-header{
        display: flex;
    }
    .app-details #my-header>div:nth-child(2){
        width: 2rem;
        height: 2rem;
        background: #fff;
        border-radius: 50%;
        margin-top: 1rem;
        position: absolute;
        right: 7.7rem;
        line-height: 2.6rem;
    }
    .app-details #my-header>div:nth-child(2)>a span{
        padding: 0;
    }
    .app-details>header>div>div:nth-child(3){
        width: 2rem;
        height: 2rem;
        background: #fff;
        margin-top: 1rem;
        position: absolute;
        right: 5.2rem;
        line-height: 2.4rem;
        border-radius: 50%;
    }
    .app-details>header>div>div:nth-child(3)>img{
        border-radius: 50%;
        width: 100%;
    }
    .app-details>header>div>div:nth-child(4){
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
    .app-details>header>div>div:nth-child(4)>p{
        font-size: .55467rem;
        text-align: center;
        color: #fff;
    }
    .app-details #my-header>a>img{
        width: 7rem;
        margin-top:0.2rem; 
    }
    .app-details>header>div>img{
        width: 2rem;
    }
    .app-details>div:nth-child(2){
        position: relative;
        height: 4rem;
    }
    .app-details .play{
        height: 2.5rem;
        line-height: 2.5rem;
        background: #fb7299;
        text-align: center;
        color: #fff;
        font-size: 1rem;
    }
    .app-details .index .play img{
        height: 2.5rem;
        line-height: 2.5rem;
    }
    .app-details .index .play span{
        position: relative;
        top: -34%;
        height: 2.5rem;
        line-height: 2.5rem;
    }
    .app-details .index>div:nth-child(2){
        height: 2rem;
        overflow: hidden;
        padding: 0.5rem;
    }
    .app-details .index p{
        height: 2rem;
        color:#000;
    }
    .app-details .index>div:nth-child(3){
        font-size: 0.5rem;
        display: flex;
    }
    .app-details .index>div:nth-child(3) span{
        padding-left: 1.2rem;
    }
    .app-details>.xxx{
        display: flex;
        padding: .46933rem .8rem;
        font-size: 0.5rem;
    }
    .app-details>.xxx>div{
        padding-right: 2rem;
    }
    .comments{
        padding-top: 1.024rem;
    }
    .comments h3{
        margin-bottom: 1rem;
        margin-left: 1rem;
        font-size: 0.8rem;
        font-weight: 400;
        text-align: left;
    }
    .comments h3 span{
        color: #999;
    }
    .comments .comments_put{
        display: flex;
        margin: 0.8rem;
        margin-bottom: 0;
    }
    .comments .comments_put img{
        width: 1.6rem;
        height: 1.6rem;
        margin-right: .64rem;
        border-radius: 50%;
    }
    .comments .comments_put button{
        height: 2rem;
        background: #fb7299;
        color: #fff;
    }
    .comments .comments_put input{
        height: 2rem;
        margin-bottom: 0;
    }
    .comments .comments_item>div{
        position: relative;
        padding: .768rem 0 .66133rem 3.13333rem;
        min-height: 1.70667rem;
    }
    
    .comments .comments_item>div>a:first-child{
        position: absolute;
        width: 2rem;
        height: 2rem;
        top: .3rem;
        left: 0.7rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .comments .comments_item>div>a:first-child img{
        width: 100%;
    }
    .comments .comments_item>div>a:nth-child(2){
        display: block;
        text-align: left;
        margin-bottom: .512rem;
        color: #757575;
        font-size: .55467rem;
    }
    .comments .comments_item>div>span{
        position: absolute;
        top: .6rem;
        right: 1rem;
        font-size: .46933rem;
        color: #999;
    }
    .comments .comments_item>div>p{
        white-space: pre-line;
        color: #212121;
        line-height: 1rem;
        font-size: 1rem;
        text-align: left;
    }
</style>