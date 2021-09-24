<script context="module">
	export const prerender = true;
    
    
   
</script>

<script>
	import OffersBanner from '$lib/OffersBanner.svelte';
	import ProductRibbon from '$lib/ProductRibbon.svelte';
	import ProductListing from '$lib/ProductListing.svelte';
	import SubscriptionForm from '$lib/SubscriptionForm.svelte';
	import ProductSlider from '$lib/ProductSlider.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';

	

</script>

<svelte:head>
	<title>Início - Manuel Delgado</title>
</svelte:head>

<OffersBanner />
<ProductRibbon />

<ProductListing title='Best Buys'  collection="Best Buys"/>

<SubscriptionForm />
<ProductSlider title="Nuevos Diseños" collection="Nuevos Diseños" />
<ContactRibbon />

