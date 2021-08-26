<script>
	let routes = [
		{label: 'Inicio', link: '/'},
		{label: 'Escritorios', link: '/products'},
	]
</script>
<p>
{#each routes as route, i }
	<a href="{route.link}">{route.label}</a>
	{#if i !== routes.length - 1}
		&nbsp;/&nbsp;&nbsp;
	{/if}
{/each}
</p>

<style>
	p{
		font-size: 13px;
		font-weight: bold;
		color: #757575;
	}
	a{
		color: #757575;
	}
</style>