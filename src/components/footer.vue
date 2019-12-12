<template>
	<div class="footer">
       <div v-for="(item,index) of fotNav" class="footer-item" :class="{active:index === idx}" @click="$router.push(item.push)">
           <img :src="index===idx?item.iconActive:item.icon"/>
           <span class="item-text" :class="{active:index === idx}">{{item.name}}</span>
       </div>
	</div>
</template>

<script>
	export default{
		name:'footers',
		props:['idx'],
		data(){
			return{
				fotNav:[{
					'icon':require('../assets/img/shop.png'),
					'iconActive':require('../assets/img/shop-on.png'),
					'name':'礼品兑换',
					'push':'./gift'
				},{
					'icon':require('../assets/img/person.png'),
					'iconActive':require('../assets/img/person-on.png'),
					'name':'我的',
					'push':'./person'
				}]
			}
		}
	}
</script>

<style lang="less" scoped>
/*底部导航*/
.footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    display: flex;
    background: #fff;
    border-top: 1px solid #ddd;
    .footer-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        &.active{
            color: #e24b2e;
        }
            img{
                width: 0.64rem;
                height: 0.64rem;
                margin-bottom: 0.05rem;
            }
            .item-text{
                height: 0.4rem;
                line-height: 0.4rem;
            }
        }
}

	
</style>