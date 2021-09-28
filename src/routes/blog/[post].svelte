<script context="module">
	// export const prerender = true;

	export let post;
    export async function load(ctx) {
        post = ctx.page.params.post;
        return { props: { post } };
    }

</script>

<script>
	import ArticleDetails from '$lib/ArticleDetails.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';
	import SubscriptionForm from '$lib/SubscriptionForm.svelte';
	import ArticleBox from '$lib/ArticleBox.svelte';

    import {getPostDetails, getBlog} from '../../../store';
    
	export let postDetails = getPostDetails(post);
    export let blog = getBlog(3);


</script>

<svelte:head>
	{#await postDetails}
	  {:then postDetails} 
	   <title>Articulo {postDetails.seo.title} - Manuel Delgado</title>
	{/await}
</svelte:head>
<main class="layout-row">
	<div class="postHolder">
	{#await postDetails}
		{:then postDetails} 
	      <ArticleDetails post={postDetails} />
	{/await}
    </div>
    <div class="listHolder">
      <h3>MÁS NOTAS</h3>
	  {#await blog}
		{:then blog} 
	      {#each blog.blogs.edges[0].node.articles.edges as postS}
	        {#if postS.node.handle == post }
	         
		  	 <ArticleBox post={postS.node} />
	          
	        {/if}
		  {/each}
	  {/await}
    </div>
</main>
<SubscriptionForm />
<section class="sep"></section>
<ContactRibbon />

<style>
	main{
		max-width: 1084px;
		margin: 38px auto;
		margin-bottom: 60px;
		padding-left: 20px;
		padding-right: 20px;
	}
	.sep{
		height: 50px;
	}
	.postHolder{
		width:  70%;
		padding-right: 40px;
	}
	.listHolder{
		width: 30%;
		padding-top: 46px;
	}
	h3{
		font-size: 18px;
		font-weight: bold;
		color: #757575;
		line-height: 20px;
		margin-bottom: 0;
		text-align: center;
	}
	@media only screen and (max-width: 762px){
       .postHolder{
	   	 width:  100%;
	   	 padding-right: 0px;
	   }
	   .listHolder{
	   	 width: 100%;
	   	 padding-top: 46px;
	   } 
	}
</style>