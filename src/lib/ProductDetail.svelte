<script>
	import QuantityPicker from '$lib/QuantityPicker.svelte';
	import ColorPicker from '$lib/ColorPicker.svelte';
</script>
<main>
	<section>
		<h1>Mesa Multiusos</h1>
		<h3>SKU: AL-2627</h3>		
        <p class='tag'>50% de desc.</p>
        <p class='price'>
	        <strong>$6,128.44 mx</strong>
	        <span class='original-price'>$8,128.44 mx</span>
   		</p>
   		<div class='options'>
	        <QuantityPicker />
	        <ColorPicker />
    	</div>
	</section>
	<section>
		col3
	</section>
</main>

<style>
main{
	display: flex;
	flex-wrap: wrap;
	flex-direction: row-reverse;
}
section:first-child{
	width: 477px;
}	
h1{
	text-transform: uppercase;
	font-size: 31px;
	margin: 4px 0 0;
	color: #757575;
}
h3{
	font-size: 13px;
	font-weight: bold;
	margin: 0;
	line-height: 13px;
}
.tag{
	margin-top: 16px;
}
.price{
	margin: 3px 0;
}

</style>