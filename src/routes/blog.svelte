<!-- <script context="module">
	export const prerender = true;
</script> -->


<script>
	import BlogBanner from '$lib/BlogBanner.svelte';
	import ArticleListing from '$lib/ArticleListing.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';
	import SubscriptionForm from '$lib/SubscriptionForm.svelte';

</script>

<svelte:head>
	<title>Blog - Manuel Delgado</title>
</svelte:head>
<main>
	<BlogBanner  />
	<ArticleListing  />
</main>
<SubscriptionForm />
<section class="sep"></section>
<ContactRibbon />

<style>
	main{
		max-width: 1312px;
		margin: 20px auto;
	}
	.sep{
		height: 50px;
	}
</style>