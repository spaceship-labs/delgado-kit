<script>
	export let quantity = 1;
</script>
<article>
	<h4>Cantidad</h4>
	<section>
		<button>-</button>
		<div>{quantity}</div>
		<button>+</button>
	</section>
</article>
<style>
	h4{
		text-transform: uppercase;
		color: #a2a2a2;
		font-weight: bold;
		font-size: 11.5px;
		margin: 12px 0 7px;
	}
	section{
		display: flex;
	}
	button{
		border: 2px solid #B7B7B7;
		width: 46px;
		text-align: center;
		font-size: 30px;
		line-height: 20px;
		margin: 0;
		padding: 0 12px;
		height: 43px;
		border-radius: 0;
	}
	section div{
		width: 66px;
		text-align: center;
		line-height: 39px;
		border-top: 2px solid #B7B7B7;
		border-bottom: 2px solid #B7B7B7;
		color: black;
		font-weight: bold;

	}
</style>