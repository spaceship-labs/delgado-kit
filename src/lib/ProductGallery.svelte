<script>
	let images = [
		{thumb: '/img/temp/product0-thumb.png'},
		{thumb: '/img/temp/product0-thumb.png'},
		{thumb: '/img/temp/product0-thumb.png'},
		{thumb: '/img/temp/product0-thumb.png'},
	]

	let selected = 2;

</script>

<section>
	<img src='/img/temp/product0.png' alt='product 0' />
	<div class='thumbs'>
		{#each images as image, i}
			<a href='#' class:selected={i === selected}><img src='{image.thumb}' alt='thumbnail' /></a>
		{/each}
	</div>
</section>

<style>
	section{
		margin: 11px 0;
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
	}

</style>