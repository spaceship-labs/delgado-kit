<script context="module">
	export const prerender = true;
</script>

<script>
	import CategoryNav from '$lib/CategoryNav.svelte';
	import AnnouncementsNav from '$lib/AnnouncementsNav.svelte';
	import OffersBanner from '$lib/OffersBanner.svelte';
	import ProductRibbon from '$lib/ProductRibbon.svelte';
	import ProductListing from '$lib/ProductListing.svelte';
	import SubscriptionForm from '$lib/SubscriptionForm.svelte';
	import ProductSlider from '$lib/ProductSlider.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

	<CategoryNav />
	<AnnouncementsNav />
	<OffersBanner />
	<ProductRibbon />
	<ProductListing title='Best Buys' />
	<SubscriptionForm />
	<ProductSlider />
	<ContactRibbon />

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
