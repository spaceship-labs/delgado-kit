<script>
	import '../app.css';
	import '../glyphter.css';
	import TopNav from '$lib/TopNav.svelte';
	import UserNav from '$lib/UserNav.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<TopNav />
<UserNav />
<slot />
<Footer />