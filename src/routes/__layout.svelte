<link
  rel="stylesheet"
  href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
/>
<script>
	import '../app.css';
	import '../glyphter.css';
	import TopNav from '$lib/TopNav.svelte';
	import UserNav from '$lib/UserNav.svelte';
	import CategoryNav from '$lib/CategoryNav.svelte';
	import AnnouncementsNav from '$lib/AnnouncementsNav.svelte';
	import Footer from '$lib/Footer.svelte';

	// Import Swiper Svelte components

    
	

</script>

<TopNav />
<UserNav />
<CategoryNav />
<AnnouncementsNav />
<slot />
<Footer />