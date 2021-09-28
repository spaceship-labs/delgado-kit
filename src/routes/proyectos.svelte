<!-- <script context="module">
	export const prerender = true;
</script> -->


<script>
	import ProyectosListing from '$lib/ProyectosListing.svelte';
	import ContactRibbon from '$lib/ContactRibbon.svelte';
	import SubscriptionForm from '$lib/SubscriptionForm.svelte';

</script>

<svelte:head>
	<title>Proyectos - Manuel Delgado</title>
</svelte:head>
<main>
	<h3 class='strike-header'><span>nuestros proyectos</span></h3>
	<ProyectosListing  />
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