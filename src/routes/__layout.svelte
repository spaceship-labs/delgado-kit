<script>
	import '../app.css';
	import '../glyphter.css';
	import TopNav from '$lib/TopNav.svelte';
	import UserNav from '$lib/UserNav.svelte';
	import CategoryNav from '$lib/CategoryNav.svelte';
	import AnnouncementsNav from '$lib/AnnouncementsNav.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<TopNav />
<UserNav />
<CategoryNav />
<AnnouncementsNav />
<slot />
<Footer />