<script>
    
  export let post;
  console.log(post);

</script>
<main >
	{#if post != null}
	<section class="article">
		<h1>{post.title}</h1>
		<p>{post.publishedAt.split(':')[0].split('T')[0]}</p>

		<img src="{post.image.src}" alt="{post.title}">

		<div class="contentHolder">{post.contentHtml}</div>
	</section>

	
  {/if}
</main>

<style>

main{
	width: 100%;
}

.article img{
	max-height: 500px;
	width: 100%;
	height: auto;
	object-fit: cover;
	margin: 20px 0;
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
	color: #757575;
	padding-top: 10px;
	padding-bottom: 10px;
}
h4{
	color: #757575;
	text-transform: uppercase;
}

</style>