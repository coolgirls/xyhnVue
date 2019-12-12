<template>
  <div class="gift">
     <headers title="礼品兑换" :showLeft='false'></headers>
	   <div class="gift-list">
				<div class="list-item" v-for="(item,index) of giftList">
					<router-link :to="{name:'detail',params:{id:item.id}}">
							<div class="item-pic">
								<img :src="item.productImages" class="pics"/>
							</div>
							<div class="item-text">
								<span class="text-name">{{item.productName}}</span>
								<span class="text-price">{{item.praiseCount}}个赞</span>
							</div>
				  </router-link>
				</div>
		 </div>
     <footers :idx="0"></footers>
  </div>
</template>

<script>
import Headers from './header'
import Footers from './footer'
export default {
  name: 'gift',
  data(){
  	return{
  		giftList:[]
  	}
  },
  components:{
  	Headers,
  	Footers
  },
  created(){
  	this.loadGift(); 
  },
  methods:{
  	
  	/*获取礼品列表*/
  	loadGift:function(){
  		this.axios.post('api/a/xcx/findGiftList').then((response)=>{
  			console.log(response);
  			var giftList=[];
        giftList=response.data;
        for(var i=0;i<giftList.length;i++){
        	giftList[i].productImages=this.$store.state.picUrl+giftList[i].productImages
        }
        this.giftList=giftList;
        //console.log(giftList);
        //console.log(this.$store.state.picUrl);
        
      }).catch((response)=>{
        console.log(response);
      })
  	},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.gift-list{
    display: flex;
    flex-wrap: wrap;
    .list-item{
        width:48%;
        margin-right: 2%;
        box-shadow: 0 0.1rem 0.1rem #F0F0F0;
        background: #fff;
        margin-bottom: 0.4rem;
        display: flex;
        flex-direction: column;
        color: #000;
        .item-pic{
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            .pics{
                position:  absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }
        .item-text{
            display: flex;
            flex-direction: column;
            justify-content: center;
            height:1.5rem;
            font-size: 0.35rem;
            padding-left: 0.25rem;
            .text-name{
                margin-bottom: 0.15rem;
                overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
            }
            .text-price{
                color:#e24b2e;
            }
        }
        &:nth-child(2n+2){
            margin-right: 0;
            margin-left: 2%;
        }
    }
}

</style>
