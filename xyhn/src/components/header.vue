<template>
	<div class="header">
		<div class="header-left" v-if="isShow" @click="goBack()">
			<img src="../assets/img/left.png"/>
		</div>
		{{title}}
	</div>
</template>

<script>
	export default{
		name:'headers',
		props:['title','showLeft'],
		data(){
			return{
				isShow:true
			}
		},
		mounted:function(options){
			if(this.$options.propsData.showLeft!=undefined) this.isShow=this.$options.propsData.showLeft
			console.log(this.$options);
		},
		methods:{
			goBack(){
				this.$router.back()
			}
		}
	}
</script>

<style lang="less" scoped>
   .header-left{
   	position: absolute;
   	left: 0.2rem;
   	top: 0.2rem;
   	height:0.6rem;
   	width: 0.6rem;
   	img{
   		width: 100%;
   		height: 100%;
   		display: block;
   	}
   }
</style>