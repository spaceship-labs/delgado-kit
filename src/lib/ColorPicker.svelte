<script>
	export let options = ['#DA9458','#282828', '#634E41','#552A1A','#C9C3C3'];
	export let selected = 1;
</script>

<h4>Color</h4>
<ul>
	{#each options as option,i}
		<li><button style="background: {option};" class:selected={i === selected}></button></li>	
	{/each}
</ul>

<style>
	ul{
		list-style-type: none;
		display: flex;
	}
	li button{
		width: 40px;
		height: 40px;
		border: 2px solid #B7B7B7;
		margin: 0 0 4px 0;
	}
	li.selected{

	}
</style>