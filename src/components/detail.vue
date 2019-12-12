<template>
	<div class="detail">
		<headers title="商品详情" :showLeft='true'></headers>
		<div class="wrapper">
			<swiper :options="swiperOption" ref="mySwiper" class="swiper-container" v-if="giftDetail.productImages">
			    <swiper-slide class="swiper-wrapper" v-for="(item,index) of giftDetail.productImages">
			    	<img :src="item"/>
			    </swiper-slide>
			    <div class="swiper-pagination"  slot="pagination"></div>
			</swiper>
		</div>
		<div class="detail-info">
        	<span class="info-left">{{giftDetail.productName}}</span>
        	<span class="info-right">{{giftDetail.praiseCount}}个赞</span>
        </div>
        <div class="navtabs">
        	<div class="tab-top" @click="toggleTab(true)">商品详情</div>
        	<div class="tab-top" @click="toggleTab(false)">兑换记录</div>
        </div>
         <div class="tabDetail">
         	<div class="detial-info details" v-if="show">
			    {{giftDetail.productDetail}}
			</div>
        	<div class="detial-record details" v-if="!show">
			    <div class="record-top">
			    	<span class="top-left">兑换记录（{{praiseGiftCount}}件）</span>
			    	<span class="top-right">只展示最新的10条</span>
			    </div>
			    <div class="record-list">
			    	<div class="list-item" v-for="item of recordList">
			    		<div class="item-left">
			    		    <img :src="item.headPortrait"/>
			    		</div>
			    		<div class="item-name">{{item.nickName}}</div>
			    		<div class="item-time">{{item.updateDate}}</div>
			    	</div>
			    </div>
			</div>
        </div>
        <div class="foot-bot">
        	<div class="bot-left">
        		<span class="left-zan">{{giftDetail.praiseCount}}个赞</span>
        		<span class="left-total">我有701个赞</span>
        	</div>
        	<div class="bot-right" @click="goChange()">立即兑换</div>
        </div>
	</div>
</template>

<script>
	import Headers from './header'
	import '../../node_modules/swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{
		data(){
			return{
				swiperOption: {  
                //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
                notNextTick: true, 
                //循环
                loop:true,
                //设定初始化时slide的索引
                initialSlide:0,
                pagination: '.swiper-pagination',  
                slidesPerView: 'auto',  
                centeredSlides: true,  
                paginationClickable: true,  
                spaceBetween: 0,  
                onSlideChangeEnd: swiper => {  
                    //这个位置放swiper的回调方法  
                    this.page = swiper.realIndex+1;  
                    this.index = swiper.realIndex;  
                },
               },
                giftDetail:{},  //商品详情
                id:'', //传递过来的id
                show:true,
                praiseGiftCount:'',  //兑换总数
                recordList:[],        //兑换记录
			}
		},
		components:{
		  	Headers,
		  	swiper,
            swiperSlide
		},
		computed: {
		    mySwiper () {
		      return this.$ref.mySwiper.swiper
		    }
		},
		created(){
			this.id=this.$route.params.id;  //获取传递过来的id
		  	this.loadGiftDetail(); 
		  	this.loadGiftTotal();           //兑换数量
		  	this.loadGiftRecord();          //兑换记录
		},
		methods:{
		  	/*获取礼品详情*/
		  	loadGiftDetail:function(){
		  		var id=this.id;
		  		this.axios.post('api/a/xcx/getGiftInfoById?giftId='+id).then((response)=>{		  			
                    var giftDetails = []
                    var giftDetail = response.data;
                    var productImages = giftDetail.productImages;
                    var pics=productImages.split('|');
                    for(var i=0;i<pics.length;i++){
                    	console.log('pic'+i,pics[i]);
                    	giftDetails.push(this.$store.state.picUrl+pics[i]);
                    }
                    giftDetail['productImages'] = giftDetails;   //把数组存到json对象中
                    this.giftDetail=giftDetail
                    console.log('giftDetail',giftDetail);
			    }).catch((response)=>{
			        console.log(response);
			    })
		  	},
		  	/*tab切换*/
		  	toggleTab: function (tab) {
		  		console.log('tab',tab);
			    this.show = tab // tab 为当前触发标签页的组件名
			},
			
		  	
		  	/*兑换总数*/
		  	loadGiftTotal(){
		  		var id=this.id;
		  		this.axios.post('api/a/xcx/getProductCountByGiftId?giftId='+id).then((response)=>{
		  			console.log('total',response.data);
                    this.praiseGiftCount = response.data.praiseGiftCount; 
			    }).catch((response)=>{
			        console.log(response);
			    })
		  	},
		  	
		  	/*兑换记录*/
		  	loadGiftRecord(){
		  		var id=this.id;
		  		this.axios.post('api/a/xcx/findPraiseDetailList?giftId='+id).then((response)=>{
		  			console.log('records',response.data);
                    this.recordList = response.data; 
			    }).catch((response)=>{
			        console.log(response);
			    })
		  	}
		}
	}
</script>

<style scoped lang="less">
.detail{  
	position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: #f1f1f1;
}
.wrapper{
	overflow: hidden;
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	.swiper-container{
	    .swiper-slide{
	        position: relative;
	        width: 100%;
	        height: 0;
	        padding-bottom: 100%;
	        img{
	            position:absolute;
	            top: 0;
	            left: 0;
	            width: 100%;
	            height: 100%;
	        }
	    }
	}
}

.detail-info{
    background: #fff;
    height: 1.2rem;
    line-height: 1.2rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.25rem;
    font-size: 0.35rem;
    .info-right{
        color: #e24b2e;
    }
}

.navtabs{
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    margin: 0.3rem 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.35rem;
    color: #171E28;
    .tab-top{
        width: 50%;
        display:flex;
        &:first-child{
            justify-content: flex-end;
            padding-right: 0.3rem;
        }
        &:last-child{
            padding-left: 0.3rem;
        }
        &.active{
            font-size: 0.4rem;
            font-weight: bold;
            color: #000;
        }
    }
}
.tabDetail{
    margin: 0.3rem 0;
    width: 100%;
    background: #fff;
    .details{
        &.detial-info{
            padding: 0.25rem;
        }
        &.detial-record{
            .record-top{
               display: flex;
                justify-content: space-between;
                height: 1rem;
                align-items: center;
                width: 100%;
                padding: 0 0.25rem;
            }
            .record-list{
                .list-item{
                    display: flex;
                    margin-bottom: 0.25rem;
                    padding: 0 2%;
                    .item-left{
                        width:25%;
                        img{
                            width: 0.6rem;
                            height: 0.6rem;
                            border-radius: 100%;
                        }
                    }
                    .item-name{
                        width: 35%;
                        height: 0.6rem;
                        line-height: 0.6rem;
                    }
                    .item-time{
                        width:40%;
                        display: flex;
                        justify-content: flex-end;
                        color: #646363;
                        height: 0.6rem;
                        line-height: 0.6rem;
                    }
                }
            }
        }
    }    
}
.foot-bot{
    height: 1.2rem;
    line-height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #ddd;
    padding: 0 0.35rem 0 0.25rem; 
    .bot-left{
        .left-zan{
            color: #e24b2e;
            margin-right: 0.2rem;
            font-size: 0.4rem;
        }
    }
    .bot-right{
        background: #FF5653;
        color: #fff;
        width: 2rem;
        height: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.1rem;
    }
}

</style>