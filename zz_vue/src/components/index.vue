<template>
<div class="app-index">
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
    <div class="title">
        <mt-swipe class="index_banner" :auto="0" :show-indicators="false">
            <mt-swipe-item>
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media"><a href="#">
                        <div class="mui-media-body">首页</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">动画</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">番剧</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">国创</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">音乐</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">舞蹈</div></a>
                    </li>
                </ul>
            </mt-swipe-item>
            <mt-swipe-item>
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media"><a href="#">
                        <div class="mui-media-body">科技</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">数码</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">游戏</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">娱乐</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">鬼畜</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">电影</div></a>
                    </li>
                </ul>
            </mt-swipe-item>
            <mt-swipe-item>
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media"><a href="#">
                        <div class="mui-media-body">电视剧</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">纪录片</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">影视</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">时尚</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">生活</div></a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a><div class="mui-media-body">广告</div></a>
                    </li>
                </ul>
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <!-- 轮播 -->
    <div class="banner">
        <mt-swipe class="index_banner">
            <mt-swipe-item v-for="(item, i) in bannerLists" :key="i">
                <img :src="item.index_banner_url" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
        <div class="index-content">
            <router-link class="index-item" :to="`/details/${item.pid}`" v-for="(item, i) in Lists" :key="i">
                <div>
                    <img :src="item.index_url">
                    <div>
                        <span class="mui-icon-extra mui-icon-extra-arrowrightcricle"></span>
                        <span>{{item.counts}}</span>
                        <span class="mui-icon mui-icon-chatboxes"></span>
                        <span>{{item.pcounts}}</span>
                    </div>
                </div>
                <div><p>{{item.texts}}</p></div>
                <div></div>
            </router-link>
        </div>
    </mt-loadmore>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            bannerLists:[],
            Lists:[],
            //可以进行上拉
            allLoaded: false,
            //是否自动触发上拉函数
            isAutoFill: false,
            wrapperHeight: 0,
            pno: 0
        }
    },
    mounted() {
        this.wrapperHeight =document.documentElement.clientHeight -this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
        loadBanner(){
            var url="http://127.0.0.1:3333/index/banner";
            this.axios.get(url,{
                params:{
                    
                }
            }).then(result=>{
                
                this.bannerLists=result.data;
            })
        },
        jump1(){
            this.$router.push("/space")
        },
        loadFrist() {
            var url="http://127.0.0.1:3333/index";
            this.axios.get(url)
            .then(result => {
                this.pno = 0;
                this.allLoaded = false; // 可以进行上拉
                this.Lists = result.data.data;
                console.log(this.Lists)
                this.$refs.loadmore.onTopLoaded();
            })
            
        },
        loadMore() {
            this.pno++;
            var url="http://127.0.0.1:3333/index";
            this.axios.get(url,{
                params:{
                    pno:this.pno
                }
            })
            .then(result => {
                this.Lists = this.Lists.concat(result.data.data);
                if (this.pno >result.data.pageCount) {
                    this.allLoaded = true; // 若数据已全部获取完毕
                    this.$toast("已经没有更多的数据...");
                }
                this.$refs.loadmore.onBottomLoaded();
            })
            
        },
        loadTop() {
            this.loadFrist();
        },
        loadBottom() {
            this.loadMore();
        },
    },
    created() {
        this.loadBanner();
        this.loadFrist();
    },
}
</script>
<style scoped>
    .app-index{
        position: relative;
    }
    .app-index>header{
        position: fixed;
        z-index: 10;
        padding: 0.2rem;
        background-image: url(../img/home.png);
        height: 4rem;
    }
    .app-index>header>#my-header{
        display: flex;
    }
    .app-index #my-header>div:nth-child(2){
        width: 2rem;
        height: 2rem;
        background: #fff;
        border-radius: 50%;
        margin-top: 1rem;
        position: absolute;
        right: 7.7rem;
        line-height: 2.6rem;
    }
    .app-index #my-header>div:nth-child(2)>a span{
        padding: 0;
    }
    .app-index>header>div>div:nth-child(3){
        width: 2rem;
        height: 2rem;
        background: #fff;
        margin-top: 1rem;
        position: absolute;
        right: 5.2rem;
        line-height: 2.4rem;
        border-radius: 50%;
    }
    .app-index>header>div>div:nth-child(3)>img{
        border-radius: 50%;
        width: 100%;
    }
    .app-index>header>div>div:nth-child(4){
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
    .app-index>header>div>div:nth-child(4)>p{
        font-size: .55467rem;
        text-align: center;
        color: #fff;
    }
    .app-index #my-header>a>img{
        width: 7rem;
        margin-top:0.2rem; 
    }
    .app-index>header>div>img{
        width: 2rem;
    }
    .app-index>div:nth-child(2){
        position: relative;
        height: 4rem;
    }
    
    .app-index>.title{
        height:1.6rem;
        width: 100%;
        top:4rem;
    }
    .app-index>.title li{
        padding: 0
    }
    .app-index>.title .mui-table-view-cell > a:not(.mui-btn){
        padding: 0
    }
    .app-index>.title .mui-table-view-cell{
        width: 16.666%
    }
    .app-index>.banner{
        height:7.5rem;
        padding:0.5rem;
    }
    .app-index>.banner>.index_banner{
        border-radius: 0.34133rem;
    }
    .app-index>.banner>.index_banner img{
        width: 100%;
        border-radius: 0.34133rem;
    }
    .app-index .index-content{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0.5rem;
        padding-top:0;
    }
    .app-index .index-item{
        display: block;
        width: 49%;
        border-radius: 1rem;

    }
    .app-index .index-item>div:first-child{
        position: relative;
        font-size: .55467rem;
        color: #212121;
    }
    .app-index .index-item>div:first-child>div:last-child{
        position: absolute;
        top:5.2rem;
        left:2rem;
    }
    .app-index .index-item>div:nth-child(2){
        width: 90%;
        position: relative;
        margin: auto;
        margin-top: 0rem;
        height: 1.6rem;
        overflow: hidden;
    }
    .app-index .index-item>div:nth-child(3){
        height: .6rem;
    }
    .app-index .index-item>div:nth-child(2) p{
        font-size: .55467rem;
        color: #212121;
        line-height: 0.9rem;
        text-align: left;
    }
    .app-index .index-item img{
        width: 100%;
        border-radius: 0.5rem;
    }
    .app-index .main-body {
        overflow: scroll;
    }
</style>