<script>
	import ArticleCard from '$lib/ArticleCard.svelte';
    import {getBlog} from '../../store';

    export let blog = getBlog();


</script>

<div class='container'>

	<section class="layout-row orderS itemsS">
		{#await blog}
		{:then blog} 
		  {#each blog.blogs.edges[0].node.articles.edges as post}
		  	 <ArticleCard post={post.node} />
		  {/each}
		{/await}
	</section>

	
</div>
<style>
	.container{
		padding-top: 29px;
		max-width: 1312px;
		margin: 0 auto;
	}
	section{
		display: flex;
		flex-wrap: wrap;
	}
	@media only screen and (max-width: 1300px){
       .container{
       	padding-right: 20px;
       	padding-left: 20px;
       }
    }
	
</style>