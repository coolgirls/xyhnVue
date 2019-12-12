<template>
	<div class="person">
		<headers title="个人中心" :showLeft='false'></headers>
		<footers :idx="1"></footers>
	</div>
</template>

<script>
	import Headers from './header'
	import Footers from './footer'
	export default {
	  name: 'person',
	  components:{
	  	Headers,
	  	Footers
	  }
	}
</script>

<style>
</style>