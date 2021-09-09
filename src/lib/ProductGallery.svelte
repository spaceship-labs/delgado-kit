<script>
	export let images;
	console.log(images);
	// let images = [
	// 	{thumb: '/img/temp/product0-thumb.png'},
	// 	{thumb: '/img/temp/product0-thumb.png'},
	// 	{thumb: '/img/temp/product0-thumb.png'},
	// 	{thumb: '/img/temp/product0-thumb.png'},
	// ]

	let selected = 0;

</script>

<section>
	<img src='{images[0].node.src}' alt='product 0' />
	<div class='thumbs'>
		{#each images as image, i}
			<a href='/' class:selected={i === selected}><img src='{image.node.src}' alt='thumbnail-{i}' /></a>
		{/each}
	</div>
</section>

<style>
	section{
		margin: 11px 0;
	}
	section img{
		max-width: 553px;
		width: 100%;
		height: auto;
	}
	.thumbs{
		display: flex;
		margin: 17px 0;
	}
	.thumbs a{
		display: block;
		margin-right: 15px;
	}
	.thumbs a.selected{
		border: 3px solid #b7b7b7;
		margin: -3px 9px 0 -5px;
	}
	.thumbs a img{
		display: block;
		height: 83px;
		width:  83px;
		object-fit: cover;
	}

</style>