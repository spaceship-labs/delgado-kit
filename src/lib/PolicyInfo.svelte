<script>
	let policies = [
		{ icon: 'icon-envios-01', label: 'ENVÍOS GRATIS', title:'Politicas de envio'},
		{ icon: 'icon-devolu-01', label: 'DEVOLUCIÓN SIN COSTO', title:'Politicas de devolución'},
		{ icon: 'icon-garantia-01', label: 'GARANTÍA DE UN AÑO', title:'Nuestra garantía'},
	]
</script>
<section>
	{#each policies as policy}
		<article>
			<div>
				<i class='{policy.icon}'></i>
				<span class='label'>{policy.label}</span>
			</div>
			<div>
				<span class='title'>{policy.title}</span>
				<button>+</button>
			</div>
		</article>
	{/each}
</section>

<style>
	section{
		margin-top: 26px;
	}
	article{
		display: flex;
		justify-content: space-between;
		color: #757575;
		font-size: 14px;
		border-top: 2px solid #e4e4e4;
		padding-top: 8px;
	}
	article:last-child{
		border-bottom: 2px solid #e4e4e4;
	}
	i{
		font-size: 30px;
		float:  left;
		color:  #a2a2a2;
		margin-right: 8px;
		height: 50px;
		position: relative;
		top: 12px;
	}
	i.icon-envios-01{
		font-size: 57px;
		float: left;
		top: -5px;
		height: 50px;
	}
	.label{
		text-transform: uppercase;
		color: #a2a2a2;
		font-size: 11.5px;
		font-weight: bold;
		top: 17px;
		position: relative;
	}
	.title{
		font-weight: bold;
	}
	button{
		border: none;
		font-size: 22px;
		background-color: transparent;
		margin-bottom: 10px;
	}

</style>