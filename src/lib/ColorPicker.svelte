<script>
	export let options = ['#DA9458','#282828', '#634E41','#552A1A','#C9C3C3'];
	export let selected = 1;
</script>
<article>
	<h4>Color</h4>
	<ul>
		{#each options as option,i}
			<li><button style="background: {option};" class:selected={i === selected}></button></li>	
		{/each}
	</ul>
</article>

<style>
	article{
		margin-left: 40px;
	}
	ul{
		list-style-type: none;
		display: flex;
		margin: 0;
		padding: 0;
	}
	li button{
		width: 44px;
		height: 43px;
		border: 2px solid #b6b6b6;
		margin: 0 12px 0 0;
		border-radius: 0;
	}
	h4{
		text-transform: uppercase;
		color: #a2a2a2;
		font-weight: bold;
		font-size: 11.5px;
		margin: 12px 0 7px;
	}
	li button.selected{
		border: 6px solid #b6b6b6;
		width: 57px;
		height: 55px;
		margin-top: -6px;
		margin-left: -8px;
		margin-right: 4px;
	}
</style>